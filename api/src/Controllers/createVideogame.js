const { Videogame, Genre } = require('../db');
const axios = require('axios');

module.exports = {
    createVideogame: async function (req, res) {
        try {
            let { rows } = await Genre.findAndCountAll();
            if(rows.length === 0) {await axios.get('http://localhost:3001/genres')};
            let { name, description, releaseDate, raiting, genres, platforms } = req.body;
            if(!name, !description, !genres, !platforms) return res.status(404).send('Falta enviar datos obligatorios');
            let groupedPlatforms = platforms.join(', ');
            await Videogame.create({
                name,
                description,
                releaseDate,
                raiting,
                platforms: groupedPlatforms
            })
            const createdGame = await Videogame.findOne({
                where: {
                    name: name
                }
            });
            // PARA QUE LA ASOCIACION FUNCIONE LOS GENRES DEBEN ESTAR YA CARGADOS EN LA DB.
            const addGenres = await genres.map( g => createdGame.addGenre(g.id));
            await Promise.all(addGenres);
            res.status(201).send('OK');
            } catch(error) {
            console.log(error.message);
        };
    }
};