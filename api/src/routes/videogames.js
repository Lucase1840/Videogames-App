const { Router } = require('express');
const router = Router();
const { mainGamesAndSearch } = require('../Controllers/mainGames.js');

router.get('/', mainGamesAndSearch);

module.exports = router;

