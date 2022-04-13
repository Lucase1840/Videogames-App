const axios = require('axios');
const { URL, API_KEY } = process.env;
const { Genre } = require('../db');

module.exports = {
    getAllGenres: async function (req, res) {
        try {
            let genresApi = await axios.get(`${URL}genres?key=${API_KEY}`);
            let genresNames = genresApi.data.results.map(g => {
                return { name: g.name };
            });
            Genre.bulkCreate(genresNames);
            let genresDb = await Genre.findAll();
            res.status(200).send(genresDb);
            } catch(error) {
            console.log(error);
        };
    }
};