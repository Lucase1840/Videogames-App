import React from 'react';
import { Link } from 'react-router-dom';

function GameCard(props) {
    return (
        <div>
            <div>
                <h1>{props.name}</h1>
                <img src={props.img} alt={props.name} width="200px"/>
                <p>{props.genres}</p>
                <Link to={`/videogame/${props.id}`}>More Details</Link>
            </div>
        </div>
    );
};

export default GameCard;
