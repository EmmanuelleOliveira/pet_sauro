const express = require('express');
const {getClient} = require('../utils/client_pg');
const authorization = require('../middlewares/authorization_users.js');
const router = express.Router();
//http://localhost:3333
router.get('/', authorization, async (req, res) => {
    const client = await getClient();
    const users = await client.query('SELECT * FROM public.users');
    await client.end();
    res.json(users.rows); 
});

router.post('/', authorization, async (req, res) => {
    const client = await getClient(); 
    const users = await client.query('INSERT INTO public.users (username, password, created_at, created_by) VALUES ($1, $2, CURRENT_TIMESTAMP, 1) RETURNING*', [req.body.username, req.body.password]);
    await client.end();
    res.json(users.rows[0]);
});

router.put('/:id', authorization, async (req, res) => {
    const client = await getClient(); 
    const users = await client.query('UPDATE public.users SET username = $1, password = $2, update_at = CURRENT_TIMESTAMP WHERE id = $3) RETURNING*', [req.body.username, req.body.password, Number(req.params.id)]);
    await client.end();
    res.json(users.rows[0]);
});

router.delete('/:id', authorization, async (req, res) => {
    const client = await getClient(); 
    const users = await client.query('UPDATE public.users SET delete_at = CURRENT_TIMESTAMP WHERE id = $1) RETURNING*', [Number(req.params.id)]);
    await client.end();
    res.json(users.rows[0]);
});

module.exports = router;
