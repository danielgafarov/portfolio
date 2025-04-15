const express = require('express');
const router = express.Router();
const {getIconMap} = require("../controllers/configController")

router.get("/iconMap",getIconMap)

module.exports = router