import Joi from "joi";

export const VUpdatePaymentStatus = Joi.object({
  orderid: Joi.number().required(),
  status: Joi.string()
    .required()
    .valid("PENDING", "PAID", "FAILED", "REFUNDED"),
});
