import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameCard from '../gameCard/gameCard';
import Pagination from '../pagination/Pagination.jsx';
import style from './GamesSearched.module.css';

function GamesSearched() {
    // STATES & DISPATCHS
    const gamesSearched = useSelector(state => state.gamesByName);
    // const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        
    }, []);
            
    
    const [gamesPerPage] = useState(15);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = gamesSearched.slice(indexOfFirstGame, indexOfLastGame);
    

    const paginate = function(pageNumber) {
        setCurrentPage(pageNumber);
    };

    return (
        <div id='top' className={style.mainContainer}>
            <div className={style.gamesContainer}>
            {currentGames ? currentGames.map(g => {
                return (
                    <GameCard
                        key={g.id}
                        id={g.id}
                        img={g.img}
                        name={g.name}
                        genres={g.genres}
                        // loading={loading}
                    />
                )
            }) : 'Not Working'}
            </div>
            
            <Pagination className={style.pagination}
                gamesPerPage={gamesPerPage}
                totalGames={gamesSearched.length}
                paginate={paginate}
            />
        </div>
    );
}

export default GamesSearched;
