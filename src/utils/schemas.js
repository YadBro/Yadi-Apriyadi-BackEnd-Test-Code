const Joi = require('joi');

const credentialFields = {
  username: Joi.string().min(2).required(),
  password: Joi.string().min(5).required(),
};

exports.singupSchema = Joi.object({
  fullname: Joi.string().required(),
  ...credentialFields,
});

exports.loginSchema = Joi.object(credentialFields);
