const joi = require('joi');

const registerSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
});

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
});

module.exports = { registerSchema, loginSchema };