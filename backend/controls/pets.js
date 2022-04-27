const express = require('express');
const { getClient } = require('../utils/client_pg');
const authorization = require('../middlewares/authorization_users');
const router = express.Router();
//http://localhost:3333
router.get('/', authorization, async (req, res) => {
    console.log("Chegou na rota de pets")
    const client = await getClient();
    const users = await client.query('SELECT * FROM public.pets');
    await client.end();
    console.log(users.rows)
    res.json(users.rows);
});

router.post('/', authorization, async (req, res) => {
    console.log("Entrou na rota de cadastro de pets");
    const client = await getClient();
    const verifyPet = await client.query('SELECT pets.name FROM public.pets WHERE name = $1', [req.body.name]);
    if (verifyPet.rows.length === 0) {
        const userId = req.userId;
        const users = await client.query('INSERT INTO public.pets (name, weight, price, height, created_by, created_at, category_id, url_image, description, price_promo, promo_verify, quantity) VALUES ($1, $2, $3, $4, $11, CURRENT_TIMESTAMP, $5, $6, $7, $8, $9, $10) RETURNING*', [req.body.name, req.body.weight, req.body.price, req.body.height, req.body.category_id, req.body.url_image, req.body.description, req.body.price_promo, req.body.promo_verify, req.body.quantity, userId]);
        await client.end();
        res.json(users.rows[0]);
    } else {
        res.status(400).send("O pet já está cadastrado no banco de dados");
    }
});

router.put('/:id', authorization, async (req, res) => {
    const client = await getClient();
    const verifyDeleted = await client.query('SELECT pets.delete_at FROM public.pets WHERE id = $1', [Number(req.params.id)]);
    if (verifyDeleted.rows[0]["delete_at"] === null) {
        const users = await client.query('UPDATE public.pets SET name = $1, weight = $2, price=$3, height=$4, update_at = CURRENT_TIMESTAMP, category_id=$5, url_image=$6 WHERE id = $7) RETURNING*', [req.body.name, req.body.weight, req.body.price, req.body.height, req.body.category_id, req.body.url_image, Number(req.params.id)]);
        await client.end();
        res.json(users.rows[0]);
    } else {
        res.send("O pet foi deletado do banco de dados");
    }
});

router.delete('/:id', authorization, async (req, res) => {
    const client = await getClient();
    const verifyPet = await client.query('SELECT pets.name FROM public.pets WHERE name = $1', [req.body.name]);
    if (verifyPet.rows.length === 0) {
        const users = await client.query('UPDATE public.pets SET delete_at = CURRENT_TIMESTAMP WHERE id = $1) RETURNING*', [Number(req.params.id)]);
        await client.end();
        res.json(users.rows[0]);
    } else {
        res.send("O pet não está cadastrado no banco de dados");
    }
});

module.exports = router;