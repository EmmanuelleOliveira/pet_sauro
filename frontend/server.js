const express = require('express');
const app = express();
const port =  Number(process.env.SERVER_PORT);

app.use('/', express.static('login'));
//app.use('/cadastro', express.static('cadastro'));
//app.use('/', express.static('cadastro_pets'));
//app.use('/', express.static('.'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
