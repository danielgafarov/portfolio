const express = require('express');
const router = express.Router();
const {getExec} = require("../controllers/executionController")

router.get("/exec/:id",getExec)

module.exports = router