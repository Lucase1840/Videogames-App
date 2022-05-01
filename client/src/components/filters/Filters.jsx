import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, filterByGenre, sortAlphabeticallyOrRating, activeFilters, filterBySource } from '../../redux/actions';

function Filters() {
    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);
    const [loading, setLoading] = useState(false);
    let filters = {
            gameGenre: '',
            sortAlphabetically: '',
            ratingSort: '',
            source: ''
    }

    let sortOption = useRef(null)
    let sourceOption = useRef(null)

    useEffect(() => {
        setLoading(true);
        dispatch(getGenres());
        setLoading(false);
    }, []);
    
    const handleGenreChange = function (e) {
        filters = {
            sortAlphabetically: '',
            ratingSort: '',
            source: '',
            gameGenre: e.target.value
        }
        dispatch(filterByGenre(e.target.value));
        sortOption.current.selected = 'selected';
        sourceOption.current.selected = 'selected';
        dispatch(activeFilters(filters));
    };

    const handleAlphAndRating = function (e) {
        if (e.target.value === 'ASC' || e.target.value === 'DESC') {
            filters.sortAlphabetically = e.target.value
            dispatch(sortAlphabeticallyOrRating(e.target.value));
            dispatch(activeFilters(filters));
        } else {
            filters.ratingSort = e.target.value
            dispatch(sortAlphabeticallyOrRating(e.target.value));
            dispatch(activeFilters(filters));
        };
    };

    const handleSourceSelection = function (e) {
        filters.source = e.target.value
        dispatch(filterBySource(e.target.value));
        if(filters.sortAlphabetically !== '') {
                dispatch(sortAlphabeticallyOrRating(filters.sortAlphabetically));
        } 
        if(filters.ratingSort !== '') {
            dispatch(sortAlphabeticallyOrRating(filters.ratingSort));
        } 
        if (filters.gameGenre !== '') {
            dispatch(filterByGenre(filters.gameGenre));
        }
        dispatch(activeFilters(filters));
    };

    return (
        <nav>
            {loading ? <h1>cargando</h1> 
            :
            <select
                name='filterByGenres'
                defaultValue={true}
                onChange={handleGenreChange}
            >
                <option value={true} disabled='disabled'>Filter by genres</option>
                <option value={'All'}>All</option>
                {genres ? genres.map((genre, i) => {
                    return (
                        <option key={i} value={genre.name}>{genre.name}</option>
                    )
                }) : 'Not Working'};
            </select>
            }

            {loading ? <h1>cargando</h1>
                :
                <select
                    name='sortAlphabetically'
                    defaultValue={true}
                    onChange={handleAlphAndRating}
                    

                >
                    <option value={true} disabled='disabled' ref={sortOption}>Sort Alphabetically or by Rating</option>
                    <option value={'ASC'}>A-Z</option>
                    <option value={'DESC'}>Z-A</option>
                    <option value={'HIG'}>Highest rating</option>
                    <option value={'LOW'}>Lowest rating</option>
                </select>
            }

            {loading ? <h1>cargando</h1>
                :
                <select
                    name='fromDbOrApi'
                    defaultValue={true}
                    onChange={handleSourceSelection}
                >
                    <option value={true} disabled='disabled' ref={sourceOption}>Select source of Videogames</option>
                    <option value={'ALL'}>Database & API</option>
                    <option value={'API'}>API only</option>
                    <option value={'DB'}>Database only</option>
                </select>
            }
        </nav>
    );
};

export default Filters;