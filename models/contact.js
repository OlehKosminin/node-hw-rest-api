const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timeseries: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
    "string.empry": "name cannot be empry",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
    "string.empry": "email cannot be empry",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
    "string.empry": "phone cannot be empry",
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

module.exports = {
  Contact,
  schemas,
};
