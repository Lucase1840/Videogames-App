const { Router } = require('express');
const videogames = require('./videogames.js');
const videogame = require('./videogame.js');
const genres = require('./genres.js');

const router = Router();

router.use('/videogames', videogames);

router.use('/videogame', videogame);

router.use('/genres', genres);

router.get('/', function (req, res) {
    res.status(200);
});

module.exports = router;
