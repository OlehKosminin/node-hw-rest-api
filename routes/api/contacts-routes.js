const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts-controllers");

const { validateBody, isValidId } = require("../../decorators");

const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.deleteContactByID);

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
