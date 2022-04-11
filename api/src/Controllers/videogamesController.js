const axios = require('axios');
const { URL, API_KEY } = process.env;

module.exports = {
    mainGamesAndSearch: async function (req, res) {
        try {
            let { name } = req.query;
            if(name) {
                let results = [];
                let i = 1;
                do {
                    let games = await axios.get(`${URL}games?search=${name}&key=${API_KEY}&page=${i}`);
                    results = results.concat(games.data.results);
                    i++;
                } while(i <= 2);
                let gamesFound = results.filter(g => {return g.name.toLowerCase().includes(name.toLowerCase())});
                if(gamesFound.length < 1) return res.status(404).send({message: 'No games found'});
                if (gamesFound.length > 15) gamesFound = gamesFound.slice(0, 15);
                res.send(gamesFound);
            } else {
                let results = [];
                let i = 1;
                do {
                    let games = await axios.get(`${URL}games?key=${API_KEY}&page=${i}`);
                    let gamesToDisplay = games.data.results.map(g => {
                        let genres = g.genres.map(g => g.name).join(', ');
                        let game = {
                                    name: g.name,
                                    genres: genres,
                                    img: g.background_image
                                    };
                        return game;
                        });
                    results = results.concat(gamesToDisplay);
                    i++;
            } while(i <= 5);
            res.send(results);
            }  
        } catch(error) {
            console.log(error);
        };
    },

    // SearchById: async function (req, res) {
    //     try {
    //         let { idVideogame } = req.params;
    //         let videogame = await axios.get(`${URL}games/${idVideogame}?key=${API_KEY}`);
    //         let genres = videogame.data.genres.map(g => g.name).join(', ');
    //         let platforms = videogame.data.platforms.map(g => g.platform.name).join(', ');
    //         let videogameDetails =  {
    //                                  name: videogame.data.name,
    //                                  genres: genres,
    //                                  img: videogame.data.background_image,
    //                                  description: videogame.data.description,
    //                                  releaseDate: videogame.data.released,
    //                                  rating: videogame.data.rating,
    //                                  platforms: platforms
    //                                 };
    //         res.send(videogameDetails);
    //         } catch(error) {
    //         console.log(error);
    //     };
    // }
};