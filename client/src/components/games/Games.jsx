import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, getGenres } from '../../redux/actions';
import GameCard from '../gameCard/gameCard';
import Pagination from '../pagination/Pagination.jsx';
import style from './Games.module.css';

function Games() {
    // STATES & DISPATCHS
    const dispatch = useDispatch();
    const games = useSelector(state => state.mainGames);
    const genres = useSelector(state => state.genres);
    useEffect( () => {
        setLoading(true);
        dispatch(getAllGames());
        dispatch(getGenres());
        setLoading(false);
    }, [dispatch]);

    // FILTERS
    // const [filter, setFilter] = useState({
    //     genre: '',
    //     createdByUser: '',
    //     sortAlphabetically,
    //     sortByRating,
    // });

    // PAGINATION
    const [loading, setLoading] = useState(false);
    const [currentPage, SetCurrentPage] = useState(1);
    const [gamesPerPage] = useState(15);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);
    


    const paginate = function(pageNumber) {
        SetCurrentPage(pageNumber);
    };
    

   

    return (
        <div id='top' className={style.mainContainer}>
            <nav>
                <select name='filterByGenres' defaultValue={true} >
                    <option value={true} disabled='disabled'>Filter by genres</option>
                    {genres ? genres.map((genre, i) => {
                        return (
                            <option key={i} value={genre.name}>{genre.name}</option>
                        )
                    }): 'Not Working'};
                </select>
            </nav>
            <div className={style.gamesContainer}>
            {currentGames ? currentGames.map(g => {
                return (
                    <GameCard
                        key={g.id}
                        id={g.id}
                        img={g.img}
                        name={g.name}
                        genres={g.genres}
                        loading={loading}
                    />
                )
            }) : 'No funca'}
            </div>
            
            <Pagination className={style.pagination}
                gamesPerPage={gamesPerPage}
                totalGames={games.length}
                paginate={paginate}
            />
        </div>
    );
}

export default Games;
