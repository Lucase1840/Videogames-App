import { GET_ALL_GAMES, SEARCH_BY_ID, SEARCH_BY_NAME, GET_GENRES, CREATE_GAME } from "../actions";

const initialState = {
    mainGames: [],
    gameDetails: {},
    genres: []
};

const rootReducer = (state = initialState, action) => {
        if(action.type === GET_ALL_GAMES) {
            return {
                ...state,
                mainGames: action.payload
            };
        } 
        if(action.type === SEARCH_BY_ID) {
            return {
                ...state,
                gameDetails: action.payload
            };
        }
        if(action.type === SEARCH_BY_NAME) {
            return {
                ...state,
                mainGames: action.payload
            };
        }
        if(action.type === GET_GENRES) {
            return {
                ...state,
                genres: action.payload
            };
        }
        if(action.type === CREATE_GAME) {
            return {
                ...state,
                // mainGames: state.mainGames.concat(action.payload)
            };
        } else {
            return state;
        };
};

export default rootReducer;