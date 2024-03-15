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

const createModelValidation = celebrate({
  body: Joi.object()
    .keys({
      title: Joi.string().required().min(2),
      subtitle: Joi.string().required().min(2),
      premium: Joi.string().required(),
      nameModel: Joi.string().required().min(2),
      nameProduct: Joi.string().required().min(2),
      preview: Joi.string()
        .required()
        .pattern(/https*:\/\/[w{3}.]?[\S]+#?\.[\S]+/i),
      newPrice: Joi.number().required(),
      oldPrice: Joi.number().required(),
    })
    .unknown(true),
});

const modelValidation = celebrate({
  params: Joi.object().keys({
    modelId: Joi.string().hex().required(),
  }),
});

const updateModelValidation = celebrate({
  params: Joi.object().keys({
    groupId: Joi.string().hex().required(),
  }),
  body: Joi.object()
    .keys({
      newPrice: Joi.number().required(),
      oldPrice: Joi.number().required(),
    })
    .unknown(true),
});

const createGroupValidation = celebrate({
  body: Joi.object()
    .keys({
      title: Joi.string().required().min(2),
      preview: Joi.string()
        .required()
        .pattern(/https*:\/\/[w{3}.]?[\S]+#?\.[\S]+/i),
      route: Joi.string().required().min(2),
      order: Joi.number().required(),
    })
    .unknown(true),
});

const groupValidation = celebrate({
  params: Joi.object().keys({
    groupId: Joi.string().hex().required(),
  }),
});

module.exports = {
  signinValidation,
  signupValidation,
  createModelValidation,
  modelValidation,
  updateModelValidation,
  createGroupValidation,
  groupValidation,
};
