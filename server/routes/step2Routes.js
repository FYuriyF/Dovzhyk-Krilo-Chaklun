const express = require("express");
const { saveStep2Data } = require("../controllers/step2Controller");

const router = express.Router();

router.post("/submit-step2", saveStep2Data);

module.exports = router;
