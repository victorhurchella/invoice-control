import joi from "joi";

export const registerSchema = joi.object().keys({
  firstname: joi.string().min(3).required(),
  lastname: joi.string().min(3).required(),
  email: joi.string().trim().email().required(),
  password: joi.string().min(6).required(),
  tel: joi
    .string()
    .required()
    .pattern(/^(\d{2})\D(\d{5}|\d{4})\D(\d{4})$/),
});

export const loginSchema = joi.object().keys({
  login: joi.string().required(),
  password: joi.string().required(),
});
