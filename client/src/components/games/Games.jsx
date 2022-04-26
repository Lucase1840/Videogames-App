import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, getGenres, searchByName, setSearchName } from '../../redux/actions';
import GameCard from '../gameCard/gameCard';
import Pagination from '../pagination/Pagination.jsx';
import style from './Games.module.css';

function Games() {
    // STATES & DISPATCHS

    // PRUEBA

    const dispatch = useDispatch();
    const nameToSearch = useSelector(state => state.searchName);
    const mainGamesByName = useSelector(state => state.gamesByName);
    const mainGamesToShow = useSelector(state => state.mainGames);
    const [games, setGames] = useState([]);
    // const [loading, setLoading] = useState(false);
    
    useEffect( () => {
            const data = dispatch(getAllGames())
            // if(nameToSearch === '' && mainGamesByName.length) {
            //     setGames(mainGamesByName);
            // }
            if(nameToSearch && mainGamesByName.length) {
                setGames(mainGamesByName);
                dispatch(setSearchName(''))
            }
            if(nameToSearch) {
                dispatch(searchByName(nameToSearch));
                console.log('holi');
            } else {
                setGames(data);
            };
            // else {
            //     const data = dispatch(getAllGames());                
            //     setGames(data);
            // }
            // dispatch(getGenres());
            // setLoading(false);
    }, [nameToSearch, mainGamesToShow, mainGamesByName, dispatch]);

    // console.log(mainGamesToShow)

    // CODIGO FUNCIONANDO SOLO CON JUEGOS PRINCIPALES

        // const dispatch = useDispatch();
        // const mainGamesToShow = useSelector(state => state.mainGames);
        // const [games, setGames] = useState([]);
        // const [loading, setLoading] = useState(false);
        
        // const genres = useSelector(state => state.genres);
        // useEffect( () => {
        //     setLoading(true);
        //     const data = dispatch(getAllGames());
        //     setGames(data);
        //     // dispatch(getGenres());
        //     setLoading(false);
        // }, [dispatch]);
        



        // FILTERS
        // const [filter, setFilter] = useState({
            //     genre: '',
            //     createdByUser: '',
            //     sortAlphabetically,
            //     sortByRating,
            // });
            
            // PAGINATION
            
    
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(15);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = mainGamesToShow.slice(indexOfFirstGame, indexOfLastGame);
    

    const paginate = function(pageNumber) {
        setCurrentPage(pageNumber);
    };

    return (
        <div id='top' className={style.mainContainer}>
            {/* <nav>
                <select name='filterByGenres' defaultValue={true} >
                    <option value={true} disabled='disabled'>Filter by genres</option>
                    {genres ? genres.map((genre, i) => {
                        return (
                            <option key={i} value={genre.name}>{genre.name}</option>
                        )
                    }): 'Not Working'};
                </select>
            </nav> */}
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
                totalGames={mainGamesToShow.length}
                paginate={paginate}
            />
        </div>
    );
}

export default Games;
