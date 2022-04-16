const {Client} = require('pg');

async function getClient() { 
    const client = new Client({
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        user: process.env.DATABASE_USER
    });
    await client.connect();
    return client;
}

module.exports = {getClient};