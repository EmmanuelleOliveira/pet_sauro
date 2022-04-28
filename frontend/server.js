const express = require('express');
const app = express();
const port =  Number(process.env.SERVER_PORT);

app.use('/cadastropets', express.static('source/views/cadastro-pets'));
app.use('/', express.static('source'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
