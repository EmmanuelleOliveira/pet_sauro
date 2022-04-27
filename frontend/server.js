const express = require('express');
const app = express();
const port =  Number(process.env.SERVER_PORT);


app.use('/login', express.static('login'));
app.use('/cadastro', express.static('cadastro'));
app.use('/', express.static('source'));


app.use('/inicial', express.static('inicial'));
app.use('/detalhe', express.static('detalhe'));
app.use('/carrinho', express.static('carrinho'));
app.use('/carnivoro', express.static('carnivoro'));
app.use('/herbivoro', express.static('herbivoro'));
app.use('/onivoro', express.static('onivoro'));
app.use('/promocao', express.static('promocao'));



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
