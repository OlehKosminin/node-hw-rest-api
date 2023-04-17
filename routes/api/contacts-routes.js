const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts-controllers");

const { validateBody, isValidId, autheticate } = require("../../decorators");

const { schemas } = require("../../models/contact");

router.get("/", autheticate, ctrl.getAllContacts);

router.get("/:contactId", autheticate, isValidId, ctrl.getContactById);

router.post("/", autheticate, validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", autheticate, isValidId, ctrl.deleteContactByID);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContactsByID
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateContactsByID
);

module.exports = router;
