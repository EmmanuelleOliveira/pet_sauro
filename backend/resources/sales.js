const express = require('express');
const {getClient} = require('../utils/client_pg');
const authorization = require('../middlewares/authorizacion_client.js');
const router = express.Router();
//http://localhost:3000
router.get('/', authorization, async (req, res) => {
    const client = await getClient();
    const users = await client.query('SELECT * FROM public.sales AS s LEFT JOIN public.debts AS d ON s.id = d.sale_id');
    await client.end();
    res.json(users.rows); 
});

router.post('/', authorization, async (req, res) => {
    const {client_id, itens, debts} = req.body;
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
            console.log(sale);
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

router.put('/:id', authorization, async (req, res) => {

});

router.delete('/:id', authorization, async (req, res) => {

});

module.exports = router;