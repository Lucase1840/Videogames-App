const { Router } = require('express');
// Importar todos los routers;
const videogames = require('./videogames.js');
const videogame = require('./videogame.js');
const genres = require('./genres.js');

const router = Router();

// Configurar los routers
router.use('/videogames', videogames);

router.use('/videogame', videogame);

router.use('/genres', genres);

router.get('/', function (req, res) {
    res.send('Hello, you are in the landing page');
});

module.exports = router;
