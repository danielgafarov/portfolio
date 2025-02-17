const express = require('express');
const router = express.Router();
const {getRepos, getRepo} = require('../controllers/repoController')

router.get("/repos",getRepos)
router.get("/repo/:id",getRepo)

module.exports = router