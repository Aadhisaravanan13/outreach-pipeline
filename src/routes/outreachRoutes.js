const express = require("express");
const router = express.Router();

const {
    startOutreach,
} = require("../controllers/outreachController");

router.post("/", startOutreach);

module.exports = router;