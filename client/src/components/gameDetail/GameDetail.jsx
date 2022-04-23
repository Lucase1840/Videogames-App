import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchById } from '../../redux/actions';
import style from './GameDetail.module.css'

function GameDetail(props) {
    const dispatch = useDispatch();
    const game = useSelector(state => state.gameDetails);
    const {id} = props.match.params;

    useEffect( () => {
        dispatch(searchById(id));
    }, [dispatch, id]);
    return (
        <div className={style.background}>
            <div className={style.container}>
                <div className={style.imageContainer}>
                    <img 
                            src={game.img} 
                            alt={game.name}
                            className={style.detailImage}
                    />
                </div>
                   
                <div className={style.detailsContainer}>
                    <h1>{game.name}</h1>
                    <p>Generos: {game.genres}</p>
                    <p>Release Date: {game.releaseDate}</p>
                    <p>Raiting: {game.rating}</p>
                    <p>Plataformas: {game.platforms}</p>
                    <p>Game description: </p>
                    <div dangerouslySetInnerHTML={{ __html: game.description }}/>
                </div>
            </div>

        </div>
    )
}

export default GameDetail;