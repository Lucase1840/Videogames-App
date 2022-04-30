const axios = require('axios');
const { URL, API_KEY } = process.env;

module.exports = {
    searchById: async function (req, res) {
        try {
            let { idVideogame } = req.params;
            let videogame = await axios.get(`${URL}games/${idVideogame}?key=${API_KEY}`);
            let genres = videogame.data.genres.map(g => g.name).join(', ');
            let platforms = videogame.data.platforms.map(g => g.platform.name).join(', ');
            let videogameDetails =  {
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
            } catch(error) {
            console.log(error);
        };
    }
};