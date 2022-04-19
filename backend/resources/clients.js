const express = require('express');
const {getClient} = require('../utils/client_pg');
const authorization = require('../middlewares/authorization_client.js');
const validateBodyClient = require('../middlewares/validate_body_clients');
const router = express.Router();

//http://localhost:3000/clients/
router.get('/', async (req, res) => {
    const client = await getClient();
    const users = await client.query('SELECT * FROM public.clients');
    await client.end();
    res.json(users.rows); 
});

router.post('/', validateBodyClient, async (req, res) => {
    const client = await getClient();
    const users = await client.query('INSERT INTO public.clients (name, email, cpf, password, created_at, created_by) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, 1) RETURNING*', [req.body.name, req.body.email, req.body.cpf, req.body.password]);
    await client.end();
    res.json(users.rows[0]);
});

router.put('/:id', authorization, validateBodyClient, async (req, res) => {
    if (Number(req.clientId) === Number(req.params.id)){
        console.log("clients: chegou aqui")
        const client = await getClient(); 
        console.log("clients: chegou aqui 2")
        const users = await client.query('UPDATE public.clients SET name = $1, cpf = $2, email=$3, password=$4, update_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING*', [req.body.name, req.body.cpf, req.body.email, req.body.password, Number(req.params.id)]);
        console.log("clients: chegou aqui 3")
        await client.end();
        console.log("clients: chegou aqui 4")
        res.json(users.rows[0]);
        console.log("clients: chegou aqui 5")
    } else {
        res.status(400).send("Cliente não autorizado a mudar dados de outro cliente");
    }
});

router.delete('/:id', authorization, async (req, res) => {
    if (Number(req.clientId) === Number(req.params.id)){
        const client = await getClient(); 
        const users = await client.query('UPDATE public.clients SET delete_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING*', [Number(req.params.id)]);
        await client.end();
        res.json(users.rows[0]);
    } else {
        res.status(400).send("Cliente não autorizado a mudar dados de outro cliente");
    }
});

module.exports = router;