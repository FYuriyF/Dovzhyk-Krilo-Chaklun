const express = require("express");
const { saveStep1Data } = require("../controllers/step1Controller");

const router = express.Router();

router.post("/submit-step1", saveStep1Data);

module.exports = router;
