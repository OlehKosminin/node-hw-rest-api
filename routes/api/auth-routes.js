const express = require("express");
const router = express.Router();
const { validateBody, autheticate } = require("../../decorators");
const { schemas } = require("../../models/users");
const ctrl = require("../../controllers/auth-controllers");
// singup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
// singin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", autheticate, ctrl.getCurrent);

router.post("/logout", autheticate, ctrl.logout);

module.exports = router;
