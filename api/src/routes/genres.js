const { Router } = require('express');
const router = Router();
const { getAllGenres } = require('../Controllers/getAllGenres.js');


router.get('/', getAllGenres);

module.exports = router;

