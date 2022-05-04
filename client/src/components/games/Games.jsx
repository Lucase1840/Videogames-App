import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, pagination } from '../../redux/actions';
import GameCard from '../gameCard/gameCard';
import Pagination from '../pagination/Pagination.jsx';
import Loading from '../loading/loading.jsx';
import style from './Games.module.css';

function Games() {
    // STATES 
    const dispatch = useDispatch();
    const gamesFiltered = useSelector(state => state.filteredGames);
    const mainGamesToShow = useSelector(state => state.mainGames);
    const [loading, setLoading] = useState(true);
    const holeState = useSelector(state => state);
    const statePage = useSelector(state => state.pagination)

    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(15);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const paginate = function(pageNumber) {
        setCurrentPage(pageNumber);
        dispatch(pagination(pageNumber));
    };

    // COMPONENTE MOUNT
    let games;
    gamesFiltered.length ? games = gamesFiltered : games = mainGamesToShow;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

    useEffect(() => {
        if(statePage) setCurrentPage(statePage);
        if(mainGamesToShow.length === 0) {
            dispatch(getAllGames());
        }
        if(mainGamesToShow.length !== 0) {
            setLoading(false);
        }
    }, [holeState, currentGames]);

    console.log(currentPage)
    console.log(statePage)
    return (
        <>
            {loading === false ?
                (currentGames[0] !== 'No games found' ?
                    (
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
                                        />
                                    )
                                }) : 'Not Working'}
                            </div>
                            <Pagination
                                className={style.pagination}
                                gamesPerPage={gamesPerPage}
                                totalGames={games.length}
                                paginate={paginate}
                            />
                        </div>) : (
                            <div className={style.noGames}><h1>¡No videogames found!</h1></div> )
                ) : <Loading />}
        </>)
};


export default Games;
