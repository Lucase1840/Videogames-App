import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './gameCard.module.css';

function GameCard(props) {
    let genreToRender;
    let dbGenres;
    
    if(props.id.length > 16) {
        dbGenres = props.genres.map((g, i) => {
            return g.name;
    })
        genreToRender = dbGenres.map(g => g).join(', ')
    };

    if (props.loading) return <p>Loading...</p>;

    return (
        <div className={style.container}>
            {props.loading ? <p>Loading...</p> : ''}
            <div className={style.cardContainer}>
                <div className={style.imgContainer}>
                    <img src={props.img} alt={props.name} className={style.image} />
                </div>
                <div className={style.info}>
                    <h1>{props.name}</h1>
                    <h3>{genreToRender ? genreToRender : props.genres}</h3>
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
