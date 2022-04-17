const axios = require('axios');

export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const SEARCH_BY_ID  = 'SEARCH_BY_ID';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const GET_GENRES = 'GET_GENRES';
export const CREATE_GAME = 'CREATE_GAME';

export const getAllGames = () => {
    return function(dispatch) {
        try{
            return axios.get('http://localhost:3001/videogames')
            .then(res => {
                dispatch({type: GET_ALL_GAMES, payload:res.data});
            });
        } catch(error) {
            console.log(error);
        };
    };
};

export const searchById = (gameId) => {
    return function(dispatch) {
        try{
            return axios.get(`http://localhost:3001/videogame/${gameId}`)
            .then(res => {
                dispatch({type: SEARCH_BY_ID, payload:res.data});
            });
        } catch(error) {
            console.log(error);
        };
    };
};

export const searchByName = (name) => {
    return function(dispatch) {
        try{
            return axios.get(`http://localhost:3001/videogames?name=${name}`)
            .then(res => {
                dispatch({type: SEARCH_BY_NAME, payload:res.data});
            });
        } catch(error) {
            console.log(error);
        };
    }
};

export const getGenres = () => {
    return function(dispatch) {
        try{
            return axios.get('http://localhost:3001/genres')
            .then(res => {
                dispatch({type: GET_GENRES, payload:res.data});
            });
        } catch(error) {
            console.log(error);
        };
    };
};

export const createGame = (data) => {
    return function(dispatch) {
        try {
            return axios.post('http://localhost:3001/videogame', data)
            .then(res => {
                dispatch({type: CREATE_GAME, payload:res.data});
            }).catch(error => {alert(error.message);});
        } catch(error) {
            alert(error);
        };
    };
};