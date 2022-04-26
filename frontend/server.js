const express = require('express');
const app = express();
const port =  Number(process.env.SERVER_PORT);


app.use('/login', express.static('login'));
app.use('/cadastro', express.static('cadastro'));
app.use('/', express.static('assets'));
app.use('/inicial', express.static('inicial'));
app.use('/detalhe', express.static('detalhe'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
