const express = require('express');
const {getClient} = require('../utils/client_pg');
const authorization = require('../middlewares/authorization_users');
const router = express.Router();
//http://localhost:3333
router.get('/', authorization, async (req, res) => {
    const client = await getClient();
    const users = await client.query('SELECT * FROM public.pets');
    await client.end();
    res.json(users.rows); 
});

router.post('/', authorization, async (req, res) => {
    const client = await getClient(); 
    const users = await client.query('INSERT INTO public.pets (name, weight, price, height, created_by, created_at, category_id, url_image) VALUES ($1, $2, $3, $4, 1, CURRENT_TIMESTAMP, $5, $6) RETURNING*', [req.body.name, req.body.weight, req.body.price, req.body.height, req.body.category_id, req.body.url_image]);
    await client.end();
    res.json(users.rows[0]);
});

router.put('/:id', authorization, async (req, res) => {
    const client = await getClient(); 
    const users = await client.query('UPDATE public.pets SET name = $1, weight = $2, price=$3, height=$4, update_at = CURRENT_TIMESTAMP, category_id=$5, url_image=$6 WHERE id = $7) RETURNING*', [req.body.name, req.body.weight, req.body.price, req.body.height, req.body.category_id, req.body.url_image, Number(req.params.id)]);
    await client.end();
    res.json(users.rows[0]);
});

router.delete('/:id', authorization, async (req, res) => {
    const client = await getClient(); 
    const users = await client.query('UPDATE public.pets SET delete_at = CURRENT_TIMESTAMP WHERE id = $1) RETURNING*', [Number(req.params.id)]);
    await client.end();
    res.json(users.rows[0]);
});

module.exports = router;