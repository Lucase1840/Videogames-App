const { Router } = require('express');
// Importar todos los routers;
const videogames = require('./videogames.js');
const videogameById = require('./videogame.js');

const router = Router();

// Configurar los routers
router.use('/videogames', videogames);

router.use('/videogame', videogameById);

router.get('/', function (req, res) {
    res.send('Hello, you are in the landing page');
});



module.exports = router;
