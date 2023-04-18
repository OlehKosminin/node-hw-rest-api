const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find(owner);
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const oneContact = await Contact.findById(contactId);
  if (!oneContact) {
    throw HttpError(404, `Contacts with ${contactId} not found`);
  }
  res.json(oneContact);
};

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteContactByID = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.status(200).json({ message: "contact deleted" });
};

const updateContactsByID = async (req, res, next) => {
  console.log("req.params", req.params);
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contacts with ${contactId} not found`);
  }
  res.json(result);
};
const updatefavoriteByID = async (req, res, next) => {
  console.log("req.params", req.params);
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contacts with ${contactId} not found`);
  }
  res.json(result);
};
module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContactByID: ctrlWrapper(deleteContactByID),
  updateContactsByID: ctrlWrapper(updateContactsByID),
  updatefavoriteByID: ctrlWrapper(updatefavoriteByID),
};
