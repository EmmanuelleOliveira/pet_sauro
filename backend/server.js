const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const routerClients = require('./resources/clients.js');
const routerPets = require('./resources/pets.js');
const routerSales = require('./resources/sales.js');
const routerUsers = require('./resources/users.js');
const port = Number(process.env.SERVER_PORT);
const app = express();
const tokenPassword = "veryhardpassword123";

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());

app.use('/clients', routerClients);
app.use('/pets', routerPets);
app.use('/sales', routerSales);
app.use('/users', routerUsers);

app.post('/loginclients', async (req,res) => {
    const {email, password} = req.body;
    const client = await getClient(); 
    const users = await client.query('SELECT * FROM public.clients WHERE email=$1 AND password=$2 RETURNING*', [email, password]);
    await client.end();
    if(users.rows.lenght === 0) {
        res.status(400).send("Cliente não cadastrado");
    } else {
        const token = await jwt.sign({clientId: users.rows[0].id, clientEmail: users.rows[0].email},tokenPassword);
        res.cookie("token", token); 
        res.json({});
    }
});

app.post('/loginusers', async (req,res) => {
    const {username, password} = req.body;
    const client = await getClient(); 
    const users = await client.query('SELECT * FROM public.users WHERE username=$1 AND password=$2 RETURNING*', [username, password]);
    await client.end();
    if(users.rows.lenght === 0) {
        res.status(400).send("Usuário não cadastrado");
    } else {
        const token = await jwt.sign({userId: users.rows[0].id, username: users.rows[0].username},tokenPassword);
        res.cookie("token", token); 
        res.json({});
    }
});


app.listen(port, () => console.log('Example app listening on port 3000!'));