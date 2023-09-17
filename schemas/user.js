const Joi = require("joi");

const userSchema = Joi.object({
    email: Joi.string().email().required().messages({ "any.required": "Missing fields: {{#label}} is required!" }),
    password: Joi.string().min(6).required().messages({ "any.required": "Missing fields: {{#label}} is required!" }),
    subscription: Joi.string().valid('starter', 'pro', 'business'),
    avatarUrl: Joi.string().uri()
});

const userSchemaGlobal = Joi.object().keys({
  body: userSchema
});

const emailSchemaGlobal = Joi.object().keys({
  body: Joi.object({
    email: Joi.string().email().required().messages({ "any.required": "Missing fields: {{#label}} is required!" }),
  })
})

module.exports = { userSchemaGlobal, emailSchemaGlobal };
