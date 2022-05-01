const { Videogame, Genre } = require('../db');
const axios = require('axios');

module.exports = {
    createVideogame: async function (req, res) {
        try {
            let genres = await Genre.findAll();
            if(genres.length === 0) {await axios.get('http://localhost:3001/genres')};
            let { name, description, releaseDate, rating, gGenres, platforms } = req.body;
            if(!name, !description, !gGenres, !platforms) return res.status(404).send('Falta enviar datos obligatorios');
            let groupedPlatforms = platforms.join(', ');
            await Videogame.create({
                name,
                description,
                releaseDate,
                rating,
                platforms: groupedPlatforms
            });
            const createdGame = await Videogame.findOne({
                where: {
                    name: name
                }
            });
            // PARA QUE LA ASOCIACION FUNCIONE LOS GENRES DEBEN ESTAR YA CARGADOS EN LA DB.
            let genresParsed = gGenres.map(g => JSON.parse(g));
            const addedGenre = await genresParsed.map( g => createdGame.addGenre(g.id));
            await Promise.all(addedGenre);
            res.status(201).send('OK');
            } catch(error) {
            console.log(error.message);
        };
    }
};