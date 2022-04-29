const express = require('express');
const {getClient} = require('../utils/client_pg');
const authorization_client = require('../middlewares/authorization_client');
const authorization_users = require('../middlewares/authorization_users');
const router = express.Router();

router.get('/admin', authorization_users, async (req, res) => {
    const client = await getClient();

    const queryResponse = await client.query("SELECT sales.created_at, sales.value, name, email, description FROM sales JOIN clients ON sales.client_id = clients.id JOIN debts ON sales.id = debts.sale_id JOIN payment_types ON debts.payment_type_id = payment_types.id");
    await client.end();

    res.json(queryResponse.rows);
})

router.get('/', async (req, res) => {
    const newSale = [];
    const client = await getClient();
    const usersItens = await client.query('SELECT s.id AS id_vendas, s.value AS valor, s.client_id AS id_cliente, i.price AS preco_item, i.quantity AS quantidade_itens, i.pet_id AS id_pet FROM public.sales AS s INNER JOIN public.itens AS i ON s.id = i.sale_id'); 
    const usersDebts = await client.query('SELECT s.id AS id_vendas, s.value AS valor, s.client_id AS id_cliente, d.value AS valor_parcela, d.status AS situacao, d.due_date AS data_vencimento, d.payment_type_id AS forma_pagamento FROM public.sales AS s INNER JOIN public.debts AS d ON s.id = d.sale_id');
    await client.end(); 
    console.log("Itens", usersItens.rows)
    console.log("Parcelas", usersDebts.rows)
    for (let i = 0; i < usersItens.rows.length; i++){
        console.log("Info", usersItens.rows[i])
        const index = getIndexSale(usersItens.rows[i].id_vendas, newSale); //Retorna o índice -1 se não existir a venda no vetor newSale ou o índice se existir
        if (index < 0) {
            newSale.push(
                {
                    "id_vendas": usersItens.rows[i].id_vendas,
                    "valor": usersItens.rows[i].valor,
                    "id_client": usersItens.rows[i].id_client,
                    "itens": [
                        {
                            "preco_item": usersItens.rows[i].preco_item,
                            "quantidade_itens": usersItens.rows[i].quantidade_itens,
                            "id_pet": usersItens.rows[i].id_pet
                        }
                    ],
                    "debts":[]
                }
            )
        } else {
            newSale[index].itens.push(
                {
                    "preco_item": usersItens.rows[i].preco_item,
                    "quantidade_itens": usersItens.rows[i].quantidade_itens,
                    "id_pet": usersItens.rows[i].id_pet
                }
            )
        }
    }
    for (let i = 0; i < usersDebts.rows.length; i++){
        const index = getIndexSale(usersDebts.rows[i].id_vendas, newSale); //Retorna o índice -1 se não existir a venda no vetor newSale ou o índice se existir
        newSale[index].debts.push(
            {
                "valor_parcela": usersDebts.rows[i].valor_parcela,
                "situacao": usersDebts.rows[i].situacao,
                "forma_pagamento": writePaymentType(usersDebts.rows[i].forma_pagamento)
            }
        )
    }
    res.json(newSale); 
});

function writePaymentType(value) {
    switch (value) {
        case 1: 
            return 'Pix';
        case 2:
            return 'Boleto';
        case 3: 
            return 'Credito';
        default:
            return '';
    }
}

function getIndexSale(id, vector) {
    for (let i = 0; i < vector.length; i++) {
        if(vector[i].id_vendas === id) {
            return i;
        }
    }
    return -1;
}

router.post('/', authorization_client, async (req, res) => {
    const {itens, debts} = req.body;
    const client_id = req.clientId;
    let value = 0;
    for(let i = 0; i < itens.length; i++){
        value += (itens[i].price * itens[i].quantity);
    }
    let valueDebts = 0;
    for (let i = 0; i < debts.length; i++){
        valueDebts += debts[i].value;
    }
    if (value === valueDebts) {
        let client; 
        try {
            client = await getClient();
            await client.query('BEGIN');
            const itenSale = [];
            const debtSale = [];
            const {rows: [sale]} = await client.query('INSERT INTO public.sales (value, client_id, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING*', [value, client_id]);
            for (let i = 0; i < itens.length; i++) {
                const {rows: [item]} = await client.query('INSERT INTO public.itens (price, quantity, sale_id, pet_id, created_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING*', [itens[i].price, itens[i].quantity, sale.id, itens[i].pet_id]);
                itenSale.push(item);
            };
            for (let i = 0; i < debts.length; i++) {
                const {rows: [debt]} = await client.query('INSERT INTO public.debts (value, status, due_date, sale_id, payment_type_id, created_at) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING*', [debts[i].value, debts[i].status, debts[i].due_date, sale.id, debts[i].payment_type_id]);
                debtSale.push(debt);
            } 
            res.json({...sale, itens: itenSale, debts: debtSale});
            await client.query('COMMIT');
            await client.end();
        } catch (e) {
            await client.query('ROLLBACK')
            res.status(400).send(e);
            await client.end();
        }
    } else {
        res.status(400).send("O valor da soma das parcelas difere do valor total da venda");
    }
});

module.exports = router;