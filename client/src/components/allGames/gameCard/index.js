import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames } from '../../../redux/actions';
// import { Link } from 'react-router-dom';

function GameDetail() {
    const dispatch = useDispatch();
    const games = useSelector(state => state.mainGames);

    useEffect( () => {
        dispatch(getAllGames());
    }, [dispatch]);


    return (
        <div>
            {games.map(g => { return (
                    <div key={g.id}>
                        <h1>{g.name}</h1>
                        <img src={g.img} alt={g.name} width="200px"/>
                        <p>{g.description}</p>
                    </div>
                )})}
        </div>
    )
}

export default GameDetail;
