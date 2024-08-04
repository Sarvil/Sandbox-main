const express = require("express");
const { services, questions } = require("../Contollers/data-controllers");

const router = express.Router();

router.route("/service").get(services);
router.route("/questions").get(questions);

module.exports = router;