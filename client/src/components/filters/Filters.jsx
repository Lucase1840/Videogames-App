import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, filterByGenre, sortAlphabetically, sortByRating } from '../../redux/actions';

function Filters() {
    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState('');
    const [alphabeticalOrder, setAlphabeticalOrder] = useState('');
    const [rating, setRating] = useState(null);

    useEffect(() => {
        setLoading(true);
        dispatch(getGenres());
        setLoading(false);
    }, []);
    
    const handleGenreChange = function (e) {
        setGenre(e.target.value);
        dispatch(filterByGenre(e.target.value))  
};

    const handleAlphabeticalOrder = function (e) {
        setAlphabeticalOrder(e.target.value);
        dispatch(sortAlphabetically(e.target.value))
    }

    const handleRatingChange = function(e) {
        setRating(e.target.value);
        dispatch(sortByRating(e.target.value))
    }

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
                    onChange={handleAlphabeticalOrder}
                >
                    <option value={true} disabled='disabled'>Sort Alphabetically</option>
                    <option value={'ASC'}>A-Z</option>
                    <option value={'DESC'}>Z-A</option>
                </select>
            }

            {loading ? <h1>cargando</h1>
                :
                <select
                    name='sortByRating'
                    defaultValue={true}
                    onChange={handleRatingChange}
                >
                    <option value={true} disabled='disabled'>Sort by rating</option>
                    <option value={'HIG'}>Highest rating</option>
                    <option value={'LOW'}>Lowest rating</option>
                </select>
            }
        </nav>
    );
};

export default Filters;