import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames } from '../../redux/actions';
import GameCard from '../gameCard';

function Games() {
    const dispatch = useDispatch();
    const games = useSelector(state => state.mainGames);

    useEffect( () => {
        dispatch(getAllGames());
    }, [dispatch]);

    return (
        <div>
            {games ? games.map(g => {
                return (
                    <GameCard 
                        key={g.id}
                        id={g.id}
                        name={g.name}
                        img={g.img}
                        genres={g.genres}
                    />
            )}): 'No funca'}
        </div>
    )
}

export default Games;
