import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames } from '../../redux/actions';
import GameCard from '../gameCard/gameCard';
import Pagination from '../pagination/Pagination.jsx';
import style from './Games.module.css';

function Games() {
    // STATES 
    const dispatch = useDispatch();
    const gamesFiltered = useSelector(state => state.filteredGames);
    const mainGamesToShow = useSelector(state => state.mainGames);
    const activeFilters = useSelector(state => state.activeFilters);
    const [loading, setLoading] = useState(false);
    const holeState = useSelector(state => state);

    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(15);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const paginate = function(pageNumber) {
        setCurrentPage(pageNumber);
    };

    // COMPONENTE MOUNT
    let games;
    gamesFiltered.length ? games = gamesFiltered : games = mainGamesToShow;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

    useEffect(() => {
        if(mainGamesToShow.length === 0) {
            dispatch(getAllGames());
        }
    }, [holeState]);


    return (
        <div id='top' className={style.mainContainer}>
            {games[0] === 'No games found' ? <h1>No games found</h1> :
                <div className={style.gamesContainer}>
                {currentGames ? currentGames.map(g => {
                    return (
                        <GameCard
                            key={g.id}
                            id={g.id}
                            img={g.img}
                            name={g.name}
                            genres={g.genres}
                        />
                    )
                }) : 'Not Working'}
                </div>
            };

            <Pagination 
                className={style.pagination}
                gamesPerPage={gamesPerPage}
                totalGames={games.length}
                paginate={paginate}
            />
        </div>
    );
};


export default Games;
