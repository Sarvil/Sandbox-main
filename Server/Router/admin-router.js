const express = require("express");
const { getAllUsers, getAllContacts, getAllServices } = require("../Contollers/admin-controllers");
const router = express.Router();

router.route("/users").get(getAllUsers);
router.route("/contacts").get(getAllContacts);
router.route("/services").get(getAllServices);

module.exports = router;