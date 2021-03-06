const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {getClient} = require('./utils/client_pg');
const routerClients = require('./controls/clients');
const routerPets = require('./controls/pets');
const routerSales = require('./controls/sales');
const routerUsers = require('./controls/users');
const port = Number(process.env.SERVER_PORT);
const app = express();
const tokenPassword = "veryhardpassword123";

const configCors = {
    origin: ["http://localhost:8080"],
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(configCors));
app.use(cookieParser());

app.use('/clients', routerClients);
app.use('/pets', routerPets);
app.use('/sales', routerSales);
app.use('/users', routerUsers);

app.post('/login', async (req,res) => {
    console.log("chegou aqui")
    const {email, password} = req.body;
    console.log(email, password)
    const checkRegex = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/;
    const verify = checkRegex.test(email);
    if(verify === true) {
        const client = await getClient(); 
        const users = await client.query('SELECT * FROM public.clients WHERE email=$1 AND password=$2', [email, password]);
        await client.end();
        if(users.rows.length === 0) {
            res.status(400).send("Cliente não cadastrado");
        } else {
            console.log(users.rows)
            const token = await jwt.sign({clientId: users.rows[0].id, clientEmail: users.rows[0].email},tokenPassword);
            console.log(token)
            res.cookie("token", token); //como se fosse uma propriedade do objeto passa o nome e o valor
            res.json({
                admin: false,
                name: users.rows[0].name
            });
        }
    } else {
        const client = await getClient(); 
        const users = await client.query('SELECT * FROM public.users WHERE username=$1 AND password=$2', [email, password]);
        await client.end();
        console.log(users.rows);
        if(users.rows.length === 0) {
            res.status(400).send("Usuário não cadastrado");
        } else {
            const token = await jwt.sign({userId: users.rows[0].id, username: users.rows[0].username},tokenPassword);
            res.cookie("token", token); //como se fosse uma propriedade do objeto passa o nome e o valor
            res.json({
                admin: true,
                name: users.rows[0].username
            });
        }
    }
}); 

app.listen(port, () => console.log(`Example app listening on port 3000`));