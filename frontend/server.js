const express = require('express');
const app = express();
const port =  Number(process.env.SERVER_PORT);

app.use('/', express.static('login'));



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
