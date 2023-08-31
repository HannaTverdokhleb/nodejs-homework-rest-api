const Joi = require("joi");

const contactSchema = Joi.object({
    name: Joi.string().required().messages({ "any.required": "Missing fields: {{#label}} is required!" }),
    email: Joi.string().email().required().messages({ "any.required": "Missing fields: {{#label}} is required!" }),
    phone: Joi.string().pattern(/^[0-9]{8,12}$/).required().messages({
        "any.required": "Missing fields: {{#label}} is required!",
        "string.pattern.base": "{{#label}} must contain only digits"
    }),
})

module.exports = contactSchema;