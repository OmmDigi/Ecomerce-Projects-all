import Joi from "joi";

export const VSignUp = Joi.object({
  name: Joi.string().required().label("Full name"),
  email: Joi.string().required().label("Email"),
  phone_no: Joi.string().required().label("Phone number"),
  password: Joi.string().required().label("Password"),
});

export const VLogin = Joi.object({
  email: Joi.string().required().label("Email"),
  password: Joi.string().required().label("Password"),
});

export const VValidateOtp = Joi.object({
  otp : Joi.string().required(),
  email : Joi.string().required(),
  password : Joi.string().optional()
})

export const VResendOtp = Joi.object({
  email : Joi.string().email().required().label("Email id")
})