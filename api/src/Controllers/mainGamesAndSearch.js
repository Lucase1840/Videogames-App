const axios = require('axios');
const { URL, API_KEY } = process.env;
const { Videogame, Genre } = require('../db');

module.exports = {
    mainGamesAndSearch: async function (req, res) {
        try {
            let { name } = req.query;
            if (name) {
                let results = [];
                let dataBaseGames = await Videogame.findAll({
                    include: [
                        {
                            model: Genre,
                            as: 'genres'
                        }
                    ]
                });
                results = dataBaseGames;
                let i = 1;
                do {
                    let games = await axios.get(`${URL}games?search=${name}&key=${API_KEY}&page=${i}`);
                    results = results.concat(games.data.results);
                    i++;
                } while (i <= 2);
                let gamesFound = results.filter(g => { return g.name.toLowerCase().includes(name.toLowerCase()) });
                if (!gamesFound.length) return res.send(['No games found']);
                if (gamesFound.length > 15) gamesFound = gamesFound.slice(0, (15 + dataBaseGames.length));
                let gamesToDisplay = gamesFound.map(g => {
                    let genres = g.genres.map(g => g.name).join(', ');
                    let game = {
                        id: g.id,
                        name: g.name,
                        genres: genres,
                        img: g.background_image
                    };
                    return game;
                });
                res.send(gamesToDisplay);
            } else {
                let results = await Videogame.findAll({
                    include: [
                        {
                            model: Genre,
                            as: 'genres'
                        }
                    ]
                });
                let i = 1;
                do {
                    let games = await axios.get(`${URL}games?key=${API_KEY}&page=${i}`);
                    let gamesToDisplay = games.data.results.map(g => {
                        let genres = g.genres.map(g => g.name).join(', ');
                        let game = {
                            id: g.id,
                            name: g.name,
                            genres: genres,
                            img: g.background_image,
                            rating: g.rating
                        };
                        return game;
                    });
                    let finalGames = gamesToDisplay.filter(g => g.id !== 58134);
                    results = results.concat(finalGames);
                    i++;
                } while (i <= 5);
                res.status(200).send(results);
            }
        } catch (error) {
            console.log(error);
        };
    },
};