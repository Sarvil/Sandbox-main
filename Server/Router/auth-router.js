// * -------------
'use strict'
const express = require("express");
const router = express.Router();
const authcontrollers = require("../Contollers/auth-controllers");
const schemas = require("../Validators/auth-validator");
const validate = require("../Middlewares/validate-middleware");
const authMiddleware = require("../Middlewares/auth-middleware");

router.route("/").get(authcontrollers.home);
router.route("/user/:id/verify/:token").get(authcontrollers.verifyEmail);
router.route("/register").post(validate(schemas.singupSchema), authcontrollers.register);
router.route("/login").post(validate(schemas.loginSchema), authcontrollers.login);
router.route("/user").get(authMiddleware, authcontrollers.user);
module.exports = router;