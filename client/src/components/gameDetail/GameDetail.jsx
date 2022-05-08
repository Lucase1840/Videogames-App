import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchById } from '../../redux/actions';
import style from './GameDetail.module.css'
import NavBar from '../navBar/navBar.jsx';
import Loading from '../loading/loading.jsx';

function GameDetail(props) {
    const dispatch = useDispatch();
    const game = useSelector(state => state.gameDetails);
    const name = useSelector(state => state.searchName);
    const [loading, setLoading] = useState(true);
    const {id} = props.match.params;
    let gamePropsLength = Object.keys(game);
    
    useEffect( () => {
        if(game.id?.length === 36 && game.id === id) {
            setLoading(false);
        } else if(gamePropsLength.legth || game.id !== parseInt(id)) {
            setLoading(true);
            dispatch(searchById(id));
        } else {
            setLoading(false);
        }
    }, [game.id, name]);

    return (
        <>
        {loading === false ? (
        <div className={style.background}>
            <NavBar id={id}/>
            <div className={style.container}>
             
                <div className={style.imageContainer} id='card'>
                    <img 
                            src={game.img} 
                            alt={game.name}
                            className={style.detailImage}
                    />
                </div>
                <div className={style.detailsContainer}>
                    <h1>{game.name}</h1>
                    <p>Genres: {game.genres}</p>
                    <p>Release Date: {game.releaseDate}</p>
                    <p>Rating: {game.rating}</p>
                    <p>Platforms: {game.platforms}</p>
                    <p>Game description: </p>
                    <div dangerouslySetInnerHTML={{ __html: game.description }}/>
                </div>
                
            </div>
        </div>) : (
            <div>
                <NavBar id={id}/>
                <Loading />
            </div>)}
        </>
    )
}

export default GameDetail;