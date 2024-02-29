const { celebrate, Joi } = require("celebrate");

const signinValidation = celebrate({
  body: Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

const updateProductValidation = celebrate({
  body: Joi.object()
    .keys({
      title: Joi.string().required().min(2),
      description: Joi.string().required().min(2),
      subtitle: Joi.string().required().min(2),
      premium: Joi.boolean().required(),
      nameModel: Joi.string().required().min(2),
      nameProduct: Joi.string().required().min(2),
      preview: Joi.string()
        .required()
        .pattern(/https*:\/\/[w{3}.]?[\S]+#?\.[\S]+/i),
    })
    .unknown(true),
});

const createProductValidation = celebrate({
  body: Joi.object()
    .keys({
      title: Joi.string().required().min(2),
      description: Joi.string().required().min(2),
      subtitle: Joi.string().required().min(2),
      premium: Joi.boolean().required(),
      nameModel: Joi.string().required().min(2),
      nameProduct: Joi.string().required().min(2),
      preview: Joi.string()
        .required()
        .pattern(/https*:\/\/[w{3}.]?[\S]+#?\.[\S]+/i),
    })
    .unknown(true),
});

const productValidation = celebrate({
  params: Joi.object().keys({
    productId: Joi.string().hex().required(),
  }),
});

module.exports = {
  signinValidation,
  signupValidation,
  createProductValidation,
  productValidation,
  updateProductValidation,
  // getUserByIdValidation,
};
