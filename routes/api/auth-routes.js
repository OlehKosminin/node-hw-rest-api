const express = require("express");
const router = express.Router();
const { validateBody, autheticate, upload } = require("../../decorators");
const { schemas } = require("../../models/users");
const ctrl = require("../../controllers/auth-controllers");
// singup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get("/verify/:{verificationCode}", ctrl.verify);

router.get(
  "resend-verify-email",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

// singin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", autheticate, ctrl.getCurrent);

router.post("/logout", autheticate, ctrl.logout);

router.patch(
  "/avatars",
  autheticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
