const { Router } = require('express');
const router = Router();
const { mainGamesAndSearch } = require('../Controllers/videogamesController.js');

router.get('/', mainGamesAndSearch);

module.exports = router;

