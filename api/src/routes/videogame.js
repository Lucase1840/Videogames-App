const { Router } = require('express');
const router = Router();
const { searchById } = require('../Controllers/videogameById.js');


router.get('/:idVideogame', searchById);


module.exports = router;
