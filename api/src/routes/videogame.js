const { Router } = require('express');
const router = Router();
const { searchById } = require('../Controllers/searchById.js');
const { createVideogame } = require('../Controllers/createVideogame.js')


router.get('/:idVideogame', searchById);

router.post('/', createVideogame);

module.exports = router;

