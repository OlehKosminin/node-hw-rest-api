const express = require("express");
const router = express.Router();
const Joi = require("joi");

const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");

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
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const oneContact = await contacts.getContactById(contactId);
    if (!oneContact) {
      throw HttpError(404, `Contacts with ${contactId} not found`);
    }

    res.json(oneContact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Not found`);
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    console.log("req.params", req.params);
    const { contactId } = req.params;

    const result = await contacts.updateById(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contacts with ${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
