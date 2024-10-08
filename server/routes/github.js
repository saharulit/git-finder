const express = require('express');
const { searchGitHubUsers } = require('../controllers/githubController');

const router = express.Router();

router.get('/search_github_users', searchGitHubUsers);

module.exports = router;
