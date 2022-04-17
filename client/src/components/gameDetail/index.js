import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchById } from '../../redux/actions';

function GameDetail(props) {
    const dispatch = useDispatch();
    const game = useSelector(state => state.gameDetails);
    const {id} = props.match.params;

    useEffect( () => {
        dispatch(searchById(id));
    }, [dispatch, id]);
    
    return (
        <div>
            <h1>{game.name}</h1>
            <img src={game.img} alt={game.name} width="200px" />
            <p>{game.gameenres}</p>
            <p>Release Date: {game.releaseDate}</p>
            <p>Raiting: {game.rating}</p>
            <p>Plataformas: {game.platforms}</p>
            <div dangerouslySetInnerHTML={{ __html: game.description }}/>
        </div>
    )
}

export default GameDetail;