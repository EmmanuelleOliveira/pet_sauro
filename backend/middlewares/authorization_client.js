const jwt = require("jsonwebtoken");
const tokenPassword = "veryhardpassword123";
module.exports = async (req,res,next) => {
    const token = req.cookies.token; 
    try {
        const payload = await jwt.verify(token, tokenPassword); //função para decodificar um jwt
        req.clientId = payload.clientId;
        next();
    } catch(e){
        res.status(403).send("Deu erro na autorização do cliente");
    }
}