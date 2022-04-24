const yup = require('yup');
const schema = yup.object().shape({
    name: yup.string().required().matches(/^(?![ ])(?!.*[ ]{2})((?:e|da|do|das|dos|de|d'|D'|la|las|el|los)\s*?|(?:[A-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'][^\s]*\s*?)(?!.*[ ]$))+$/).min(3).max(150),
    email: yup.string().required().matches(/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/).max(150),
    cpf: yup.string().required().matches(/\d{11}/),
    password: yup.string().trim().required().matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,20}$/), //Deve ter de 6 a 20 caracteres (formado por letras e números) com no mínimo 1 maiúscula, 1 minúscula e 1 número
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

