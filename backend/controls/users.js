const express = require('express');
const {getClient} = require('../utils/client_pg');
const authorization = require('../middlewares/authorization_users.js');
const router = express.Router();
//http://localhost:3333
router.get('/', authorization, async (req, res) => {
    const client = await getClient();
    const users = await client.query('SELECT users.username, users.password FROM public.users');
    await client.end();
    res.json(users.rows); 
});

router.post('/', authorization, async (req, res) => {
    const client = await getClient(); 
    const verifyUsername = await client.query('SELECT users.username FROM public.users WHERE username = $1', [req.body.username]);
    if(verifyUsername.rows.length === 0) {
        const users = await client.query('INSERT INTO public.users (username, password, created_at, created_by) VALUES ($1, $2, CURRENT_TIMESTAMP, 1) RETURNING*', [req.body.username, req.body.password]);
        await client.end();
        res.json(users.rows[0]);
    } else {
        res.send("O username já está sendo utilizado por outro usuário");
    }
});

router.put('/:id', authorization, async (req, res) => {
    const client = await getClient(); 
    const verifyDeleted = await client.query('SELECT clients.delete_at FROM public.clients WHERE id = $1', [Number(req.params.id)]);
    if(verifyDeleted.rows[0]["delete_at"] === null) { 
        const users = await client.query('UPDATE public.users SET username = $1, password = $2, update_at = CURRENT_TIMESTAMP WHERE id = $3) RETURNING*', [req.body.username, req.body.password, Number(req.params.id)]);
        await client.end();
        res.json(users.rows[0]);
    } else {
        res.send("Usuário deletado do banco de dados");
    }
});

router.delete('/:id', authorization, async (req, res) => {
    const client = await getClient(); 
    const verifyUser = await client.query('SELECT users.username FROM public.users WHERE username = $1', [req.body.username]);
    if(verifyUser.rows.length === 0){
        const users = await client.query('UPDATE public.users SET delete_at = CURRENT_TIMESTAMP WHERE id = $1) RETURNING*', [Number(req.params.id)]);
        await client.end();
        res.json(users.rows[0]);
    } else {
        res.send("O usuário não está cadastrado no banco de dados");
    }
});

module.exports = router;
