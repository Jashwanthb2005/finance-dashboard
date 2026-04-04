const Joi = require("joi");
exports.validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),

    email: Joi.string().email().required(),

    role: Joi.string()
      .valid("viewer", "analyst", "admin")
      .required(), 

    status: Joi.string()
      .valid("active", "inactive")
      .optional()
  });

  return schema.validate(data);
};

exports.validateRecord = (data) => {
  const schema = Joi.object({
    
    userId: Joi.string()
      .length(24)
      .required(),

    amount: Joi.number()
      .positive()
      .required(),

    type: Joi.string()
      .valid("income", "expense")
      .required(),

    category: Joi.string()
      .min(2)
      .max(50)
      .required(),

    date: Joi.date().required(),

    notes: Joi.string()
      .max(200)
      .allow("")
  });

  return schema.validate(data);
};