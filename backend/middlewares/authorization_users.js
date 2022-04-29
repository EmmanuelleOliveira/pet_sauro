const jwt = require("jsonwebtoken");
const tokenPassword = "veryhardpassword123";
module.exports = async (req,res,next) => {
    const token = req.cookies.token; 
    try {
        const payload = await jwt.verify(token, tokenPassword); //função para decodificar um jwt
        req.userId = payload.userId;
        if (!req.userId) {
            throw new Error("User is not admin");
        }
        next();
    } catch(e){
        res.status(403).send("Deu erro na autorização do usuário");
    }
}