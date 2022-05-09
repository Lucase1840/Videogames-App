import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, filterByGenre, sortAlphabeticallyOrRating, activeFilters, filterBySource, pagination } from '../../redux/actions';
import style from '../filters/Filters.module.css';

function Filters() {
    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);
    let filters = {
        gameGenre: '',
        sortAlphabetically: '',
        ratingSort: '',
        source: ''
    };

    let sortOption = useRef(null);
    let sourceOption = useRef(null);

    useEffect(() => {
        if (genres.length === 0) {
            dispatch(getGenres());
        }
    }, []);

    const handleGenreChange = function (e) {
        dispatch(pagination(1));
        filters = {
            sortAlphabetically: '',
            ratingSort: '',
            source: '',
            gameGenre: e.target.value
        };
        dispatch(activeFilters(filters));
        dispatch(filterByGenre(e.target.value));
        sortOption.current.selected = 'selected';
        sourceOption.current.selected = 'selected';
    };

    const handleAlphAndRating = function (e) {
        dispatch(pagination(1));
        if (e.target.value === 'ASC' || e.target.value === 'DESC') {
            filters.sortAlphabetically = e.target.value;
            filters.ratingSort = '';
            dispatch(sortAlphabeticallyOrRating(e.target.value));
            dispatch(activeFilters(filters));
        } else {
            filters.ratingSort = e.target.value;
            filters.sortAlphabetically = '';
            dispatch(sortAlphabeticallyOrRating(e.target.value));
            dispatch(activeFilters(filters));
        };
    };

    const handleSourceSelection = function (e) {
        dispatch(pagination(1));
        filters.source = e.target.value;
        dispatch(filterBySource(e.target.value));
        if (filters.gameGenre !== '') {
            if (filters.sortAlphabetically === '' || filters.ratingSort === '') {
                dispatch(filterByGenre(filters.gameGenre));
                dispatch(activeFilters(filters));
            };
            dispatch(filterByGenre(filters.gameGenre));
        };
        if (filters.sortAlphabetically !== '') {
            dispatch(sortAlphabeticallyOrRating(filters.sortAlphabetically));
        };
        if (filters.ratingSort !== '') {
            dispatch(sortAlphabeticallyOrRating(filters.ratingSort));
        };
        dispatch(activeFilters(filters));
    };

    return (
        <nav className={style.container}>
            <select
                className={style.select}
                name='filterByGenres'
                defaultValue={true}
                onChange={handleGenreChange}
            >
                <option value={true} disabled='disabled'>Filter by genre</option>
                <option value={'All'}>All</option>
                {genres ? genres.map((genre, i) => {
                    return (
                        <option key={i} value={genre.name}>{genre.name}</option>
                    )
                }) : 'Not Working'};
            </select>

            <select
                className={style.select}
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

            <select
                className={style.select}
                name='fromDbOrApi'
                defaultValue={true}
                onChange={handleSourceSelection}
            >
                <option value={true} disabled='disabled' ref={sourceOption}>Select source of Videogames</option>
                <option value={'ALL'}>Database & API</option>
                <option value={'API'}>API only</option>
                <option value={'DB'}>Database only</option>
            </select>

        </nav>
    );
};

export default Filters;