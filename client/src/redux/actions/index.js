const axios = require('axios');

export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const SEARCH_BY_ID = 'SEARCH_BY_ID';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const GET_GENRES = 'GET_GENRES';
export const CREATE_GAME = 'CREATE_GAME';
export const LOADING_STATUS = 'LOADING_STATUS';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const SORT_ALPHABETICALLY_OR_RATING = 'SORT_ALPHABETICALLY_OR_RATING';
export const FILTER_BY_SOURCE = 'FILTER_BY_SOURCE';
export const ACTIVE_FILTERS = 'ACTIVE_FILTERS';
export const PAGINATION = 'PAGINATION';

export const getAllGames = () => {
    return function (dispatch) {
        try {
            return axios.get('http://localhost:3001/videogames')
                .then(res => {
                    dispatch({ type: GET_ALL_GAMES, payload: res.data });
                });
        } catch (error) {
            console.log(error);
        };
    };
};

export const searchByName = (name) => {
    return function (dispatch) {
        try {
            return axios.get(`http://localhost:3001/videogames?name=${name}`)
                .then(res => {
                    dispatch({ type: SEARCH_BY_NAME, payload: res.data });
                });
        } catch (error) {
            console.log(error);
        };
    };
};

export const searchById = (gameId) => {
    return function (dispatch) {
        try {
            return axios.get(`http://localhost:3001/videogame/${gameId}`)
                .then(res => {
                    dispatch({ type: SEARCH_BY_ID, payload: res.data });
                });
        } catch (error) {
            console.log(error);
        };
    };
};


export const getGenres = () => {
    return function (dispatch) {
        try {
            return axios.get('http://localhost:3001/genres')
                .then(res => {
                    dispatch({ type: GET_GENRES, payload: res.data });
                });
        } catch (error) {
            console.log(error);
        };
    };
};

export const createGame = (data) => {
    return function (dispatch) {
        try {
            return axios.post('http://localhost:3001/videogame', data)
                .then(res => {
                    dispatch({ type: CREATE_GAME, payload: res.data });
                }).catch(error => { alert(error.message) });
        } catch (error) {
            console.log(error);
        };
    };
};

export const loadingStatus = (isLoading) => {
    return {
        type: LOADING_STATUS,
        payload: isLoading
    };
};

export const filterByGenre = (filters) => {
    return {
        type: FILTER_BY_GENRE,
        payload: filters
    };
};

export const sortAlphabeticallyOrRating = (filterBy) => {
    return {
        type: SORT_ALPHABETICALLY_OR_RATING,
        payload: filterBy
    };
};

export const filterBySource = (filters) => {
    return {
        type: FILTER_BY_SOURCE,
        payload: filters
    };
};

export const activeFilters = (filters) => {
    return {
        type: ACTIVE_FILTERS,
        payload: filters
    };
};

export const pagination = (pageNumber) => {
    return {
        type: PAGINATION,
        payload: pageNumber
    };
};

