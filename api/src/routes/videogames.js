const { Router } = require('express');
const router = Router();
const { mainGames, searchByName } = require('../Controllers/videogamesController.js');


router.get('/name', searchByName);

router.get('/', mainGames);
// router.get('/:id', xx);


module.exports = router;

