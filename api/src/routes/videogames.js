const { Router } = require('express');
const router = Router();
const { mainGamesAndSearch } = require('../Controllers/mainGamesAndSearch.js');

router.get('/', mainGamesAndSearch);

module.exports = router;

