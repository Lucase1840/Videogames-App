import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './gameCard.module.css';

function GameCard(props) {
    let genreToRenderDb;
    let dbGenres;
    let imgDb

    if (props.id.length === 36) {
        if (typeof props.genres !== 'string') {
            dbGenres = props.genres.map((g) => {
                return g.name;
            })
            genreToRenderDb = dbGenres.join(', ');
        }
        imgDb = 'https://browsecat.net/sites/default/files/anime-mashup-hd-wallpapers-61372-837727-3623304.png'
    };

    if (props.loading) return <p>Loading...</p>;

    return (
        <div className={style.container}>
            {props.loading ? <p>Loading...</p> : ''}
            <div className={style.cardContainer}>
                <div className={style.imgContainer}>
                    <img src={imgDb ? imgDb : props.img} alt={props.name} className={style.image} />
                </div>
                <div className={style.info}>
                    <h1>{props.name}</h1>
                    <h3>{genreToRenderDb ? genreToRenderDb : props.genres}</h3>
                    <NavLink
                        to={`/videogame/${props.id}`}
                        className={style.detailLink}
                    >More Details
                    </NavLink>
                </div>
            </div>
        </div>

    );
};

export default GameCard;
