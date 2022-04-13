const axios = require('axios');
const { URL, API_KEY } = process.env;
const { Videogame, Genre } = require('../db');

module.exports = {
    createVideogame: async function (req, res) {
        try {
            let { name, description, releaseDate, raiting, genres, platforms } = req.body;
            if(name, description, genres, platforms) return res.status(404).send('Falta enviar datos obligatorios');
            let groupedPlatforms = platforms.join(', ');
            await Videogame.create({
                name,
                description,
                releaseDate,
                raiting,
                platforms: groupedPlatforms
            })
            const createdGame = await Videogame.findOne({
                order: [['createdAt', DESC]]
            });
            const addGenres = await genres.map( g => createdGame.setGenre(g));
            await Promise.all(addGenres);

            // Movie.belongsToMany(Actor, { through: 'ActorMovies' });
            
            res.status(201).send('OK');
            } catch(error) {
            console.log(error);
        };
    }
};