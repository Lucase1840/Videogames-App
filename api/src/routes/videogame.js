const { Router } = require('express');
const router = Router();
const { searchById } = require('../Controllers/videogameById.js');
const { createVideogame } = require('../Controllers/createVideogame.js')


router.get('/:idVideogame', searchById);

router.post('/', createVideogame);

module.exports = router;

