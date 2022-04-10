const axios = require('axios');
const { URL, API_KEY } = process.env;

module.exports = {
    mainGames: async function (req, res) {
        try {
            // AGREGAR LA FUNCIONALIDAD DE QUE TRAIGA LOS PRIMEROS 100
            let games = await axios.get(`${URL}games?key=${API_KEY}`);
            gamesToDisplay = games.data.results.map(g => {
                let genres = g.genres.map(g => g.name).join(', ');
                let game = {
                    name: g.name,
                    genres: genres,
                    img: g.background_image
                };
                return game;
            });
            res.send(gamesToDisplay);
        } catch(error) {
            console.log(error);
        };
    },

    searchByName: async function (req, res) {
        try {
            let { name } = req.query;
            if(!name) return res.send('Please, enter a valid name');
            let games = await axios.get('https://api.rawg.io/api/games?key=acc8bc5666c74e57a94abf9e4dc32365');
            filteredGame = games.data.results.filter(g => {
                return g.name.toLowerCase().includes(name.toLowerCase())
            });
            res.send(filteredGame);
        } catch(error) {
            console.log(error);
        }
    }

};