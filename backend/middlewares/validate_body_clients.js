const yup = require('yup');
const schema = yup.object().shape({
    name: yup.string().required().matches(/^[A-Z][a-z]* [A-Z][a-z]*$/).min(3).max(150),
    email: yup.string().required().matches(/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/).max(150),
    cpf: yup.string().required().matches(/\d{11}/),
    password: yup.string().trim().required().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}$/)
  });
module.exports = async (req,res,next) => {
    try{
        const bodyValidate = await schema.validate(req.body);
        req.body = bodyValidate;
        next();
    } catch (e) {
        res.status(400).send(e.errors.join(','));
    }
}

