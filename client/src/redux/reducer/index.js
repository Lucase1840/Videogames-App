import { GET_ALL_GAMES, SEARCH_BY_ID, SEARCH_BY_NAME, GET_GENRES, CREATE_GAME, SET_SEARCH_NAME, FILTER_BY_GENRE, SORT_ALPHABETICALLY, SORT_BY_RATING, ACTIVE_FILTERS } from "../actions";

const initialState = {
    mainGames: [],
    gameDetails: {},
    genres: [],
    searchName: '',
    gamesByName: [],
    filteredGames: [],
    activeFilters: {
        gameGenre: '',
        sortAlphabetically: '',
        ratingSort: ''
    }
};

const rootReducer = (state = initialState, action) => {
    if (action.type === GET_ALL_GAMES) {
        return {
            ...state,
            mainGames: action.payload
        };
    }
    if (action.type === SEARCH_BY_ID) {
        return {
            ...state,
            gameDetails: action.payload
        };
    }
    if (action.type === SEARCH_BY_NAME) {
        return {
            ...state,
            gamesByName: action.payload
        };
    }
    if (action.type === GET_GENRES) {
        return {
            ...state,
            genres: action.payload
        };
    }
    if (action.type === CREATE_GAME) {
        return {
            ...state,
            // mainGames: state.mainGames.concat(action.payload)
        };
    }
    if (action.type === SET_SEARCH_NAME) {
        return {
            ...state,
            searchName: action.payload
        }
    }
    if (action.type === FILTER_BY_GENRE) {
        let genre = action.payload;
        let result;
        // CHEQUEAR SI FUNCION
        // if(state.filteredGames.length) {
        //     gamesToSort = state.filteredGames
        // } else {
        //     gamesToSort = state.mainGames
        // }
        if (genre || genre === 'All') {
            if (genre === 'All') {
                return {
                    ...state,
                    filteredGames: state.mainGames
                }
            }
            result = state.mainGames.filter(game => game.genres.includes(genre));
        };
        if (result.length === 0) {
            return {
                ...state,
                filteredGames: ['No games found']
            };
        }
        return {
            ...state,
            filteredGames: result
        };
    }
    if(action.type === SORT_ALPHABETICALLY) {
        let alphabeticalOrder  = action.payload
        let sortedGames;
        let gamesToSort
        if(state.filteredGames.length) {
            gamesToSort = state.filteredGames
        } else {
            gamesToSort = state.mainGames
        }
        if(alphabeticalOrder === 'ASC') {
            sortedGames = gamesToSort.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
            return {
                ...state,
                filteredGames: sortedGames
            }
        } 
        if(alphabeticalOrder === 'DESC') {
            sortedGames = state.filteredGames.sort((a, b) => {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
            });
            return {
                ...state,
                filteredGames: sortedGames
            }
        }
    }
    if(action.type === SORT_BY_RATING) {
        let ratingOrder = action.payload;
        let orderedGames;
        let gamesRatingSort;
        if(state.filteredGames.length) {
            gamesRatingSort = state.filteredGames
        } else {
            gamesRatingSort = state.mainGames
        }
        if(ratingOrder === 'HIG') {
            orderedGames = gamesRatingSort.sort((a, b) => {
                return parseFloat(b.rating) - parseFloat(a.rating)
            });
            return {
                ...state,
                filteredGames: orderedGames
            }
        }
        if(ratingOrder === 'LOW') {
            orderedGames = gamesRatingSort.sort((a, b) => {
                return parseFloat(a.rating) - parseFloat(b.rating)
            });
            return {
                ...state,
                filteredGames: orderedGames
            }
        }
    }
    else {
        return state;
    };
};

export default rootReducer;