import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameCard from '../gameCard/gameCard';
import Pagination from '../pagination/Pagination.jsx';
import style from './GamesSearched.module.css';
import Loading from '../loading/loading.jsx';
import { pagination } from '../../redux/actions';

function GamesSearched() {
    const dispatch = useDispatch();
    const gamesSearched = useSelector(state => state.gamesByName);
    const load = useSelector(state => state.loading);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(pagination(1));
        if (!load) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [gamesSearched, load]);


    const [gamesPerPage] = useState(15);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = gamesSearched.slice(indexOfFirstGame, indexOfLastGame);


    const paginate = function (pageNumber) {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            {loading === false ?
                (currentGames[0] !== 'No games found' ?
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
                        
                        <Pagination className={style.pagination}
                            gamesPerPage={gamesPerPage}
                            totalGames={gamesSearched.length}
                            paginate={paginate}
                        />
                    </div> :
                    <div className={style.noGames}><h1>¡No videogames found!</h1></div>)
                : (<Loading />)}
        </>
    );
}

export default GamesSearched;
