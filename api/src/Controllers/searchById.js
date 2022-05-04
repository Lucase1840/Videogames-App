const axios = require('axios');
const { URL, API_KEY } = process.env;
const { Videogame, Genre } = require('../db');

module.exports = {
    searchById: async function (req, res) {
        try {
            let { idVideogame } = req.params;
            if (idVideogame.length === 36) {
                let rawVideogame = await Videogame.findAll({
                    where: {
                        id: idVideogame
                    },
                    include: [
                        {
                            model: Genre,
                            as: 'genres'
                        }
                    ]
                });
                let videogame = rawVideogame[0];
                let rawGenres = videogame.genres.map(g => g.name);
                let genres = rawGenres.join(', ');
                let videogameDetails = {
                    id: videogame.id,
                    name: videogame.name,
                    genres: genres,
                    img: 'https://browsecat.net/sites/default/files/anime-mashup-hd-wallpapers-61372-837727-3623304.png',
                    description: videogame.description,
                    releaseDate: videogame.releaseDate,
                    rating: videogame.rating,
                    platforms: videogame.platforms
                };
                res.send(videogameDetails);
            } else {
                let videogame = await axios.get(`${URL}games/${idVideogame}?key=${API_KEY}`);
                let genres = videogame.data.genres.map(g => g.name).join(', ');
                let platforms = videogame.data.platforms.map(g => g.platform.name).join(', ');
                let videogameDetails = {
                    id: videogame.data.id,
                    name: videogame.data.name,
                    genres: genres,
                    img: videogame.data.background_image,
                    description: videogame.data.description,
                    releaseDate: videogame.data.released,
                    rating: videogame.data.rating,
                    platforms: platforms
                };
                res.send(videogameDetails);
            }
        } catch (error) {
            console.log(error);
        };
    }
};