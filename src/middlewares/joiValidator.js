const Joi = require("joi");
const { ValidationError, AuthorizationError } = require("../../customErrors");

const validateRequest = (schema, property) => {
  try {
    if (!property) property = body;
    return (req, res, next) => {
      const { error, value } = schema.validate(req[property]);

      if (error) {
        let data = {
          original: error._object,
          details: error.details.map((e) => ({
            message: e.message.replace(/['"]/g, ""),
            type: e.type,
          })),
        };
        throw new ValidationError("invalid request", data);
      } else {
        next();
      }
    };
  } catch (error) {
    next(error);
  }
};

module.exports = validateRequest;
