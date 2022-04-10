const { Router } = require('express');
// Importar todos los routers;
const videogames = require('./videogames.js');
const router = Router();

// Configurar los routers
router.use('/videogames', videogames);

router.get('/', function (req, res) {
    res.send('Hello, you are in the landing page');
});



module.exports = router;
