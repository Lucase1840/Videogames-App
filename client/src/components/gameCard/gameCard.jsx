import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './gameCard.module.css';

function GameCard(props) {
    if(props.loading) return <p>Loading...</p>;
    return (
        <div className={style.container}>
            <div className={style.cardContainer}>
                <div className={style.imgContainer}>
                    <img src={props.img} alt={props.name} className={style.image} />
                </div>
                <div className={style.info}>
                    <h1>{props.name}</h1>
                    <h3>{props.genres}</h3>
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
