const axios = require('axios');

export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const SEARCH_BY_ID  = 'SEARCH_BY_ID';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const GET_GENRES = 'GET_GENRES';
export const CREATE_GAME = 'CREATE_GAME';
export const SET_SEARCH_NAME = 'SET_SEARCH_NAME';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const SORT_ALPHABETICALLY = 'SORT_ALPHABETICALLY';
export const SORT_BY_RATING = 'SORT_BY_RATING';
export const ACTIVE_FILTERS = 'ACTIVE_FILTERS';





export const getAllGames = () => {
    return async function (dispatch) {
        try {
            return await axios.get('http://localhost:3001/videogames')
                .then(res => {
                    dispatch({ type: GET_ALL_GAMES, payload: res.data });
                });
        } catch (error) {
            console.log(error);
        };
    };
};

export const searchByName = (name) => {
    return async function(dispatch) {
        try{
            return await axios.get(`http://localhost:3001/videogames?name=${name}`)
            .then(res => {
                dispatch({type: SEARCH_BY_NAME, payload:res.data});
            });
        } catch(error) {
            console.log(error);
        };
    };
};

export const searchById = (gameId) => {
    return async function(dispatch) {
        try{
            return await axios.get(`http://localhost:3001/videogame/${gameId}`)
            .then(res => {
                dispatch({type: SEARCH_BY_ID, payload:res.data});
            });
        } catch(error) {
            console.log(error);
        };
    };
};


export const getGenres = () => {
    return async function(dispatch) {
        try{
            return await axios.get('http://localhost:3001/genres')
            .then(res => {
                dispatch({type: GET_GENRES, payload:res.data});
            });
        } catch(error) {
            console.log(error);
        };
    };
};

export const createGame = (data) => {
    return async function(dispatch) {
        try {
            return await axios.post('http://localhost:3001/videogame', data)
            .then(res => {
                dispatch({type: CREATE_GAME, payload:res.data});
            }).catch(error => {alert(error.message);});
        } catch(error) {
            alert(error);
        };
    };
};

export const setSearchName = (gameName) => {
    return {
        type: SET_SEARCH_NAME,
        payload: gameName
    };
};

export const filterByGenre = (filters) => {
    return {
        type: FILTER_BY_GENRE,
        payload: filters
    };
};

export const sortAlphabetically = (alphabeticalOrder) => {
    return {
        type: SORT_ALPHABETICALLY,
        payload: alphabeticalOrder
    };
};

export const sortByRating = (ratingOrder) => {
    return {
        type: SORT_BY_RATING,
        payload: ratingOrder
    };
};

