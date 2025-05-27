const express = require('express');
const router = express.Router();
const {getExec} = require("../controllers/executionController")

router.get("/exec",getExec)

module.exports = router