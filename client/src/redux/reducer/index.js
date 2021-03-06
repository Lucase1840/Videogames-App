import { GET_ALL_GAMES, SEARCH_BY_ID, SEARCH_BY_NAME, GET_GENRES, CREATE_GAME, LOADING_STATUS, FILTER_BY_GENRE, SORT_ALPHABETICALLY_OR_RATING, ACTIVE_FILTERS, FILTER_BY_SOURCE, PAGINATION } from "../actions";

const initialState = {
    mainGames: [],
    gameDetails: {},
    genres: [],
    loading: true,
    gamesByName: [],
    filteredGames: [],
    activeFilters: {
        gameGenre: '',
        sortAlphabetically: '',
        ratingSort: '',
        source: ''
    },
    pagination: 1
};

const rootReducer = (state = initialState, action) => {
    if (action.type === GET_ALL_GAMES) {
        return {
            ...state,
            mainGames: action.payload
        };
    };

    if (action.type === SEARCH_BY_ID) {
        return {
            ...state,
            gameDetails: action.payload,
            loading: false
        };
    };

    if (action.type === SEARCH_BY_NAME) {
        return {
            ...state,
            gamesByName: action.payload,
            loading: false
        };
    };

    if (action.type === GET_GENRES) {
        return {
            ...state,
            genres: action.payload
        };
    };

    if (action.type === CREATE_GAME) {
        return {
            ...state
        };
    };

    if (action.type === PAGINATION) {
        return {
            ...state,
            pagination: action.payload
        };
    };

    if (action.type === LOADING_STATUS) {
        return {
            ...state,
            loading: action.payload,
        };
    };

    if (action.type === ACTIVE_FILTERS) {
        return {
            ...state,
            activeFilters: action.payload
        };
    };

    if (action.type === FILTER_BY_GENRE) {
        let genre = action.payload;
        let gamesToSortByGenre;
        let result;
        if ((!state.activeFilters.sortAlphabetically && !state.activeFilters.ratingSort && state.activeFilters.gameGenre) && state.activeFilters.source) {
            if (genre === 'All') {
                return {
                    ...state,
                    filteredGames: state.filteredGames
                };
            } else {
                gamesToSortByGenre = state.filteredGames;
                if (gamesToSortByGenre[0] === 'No games found') {
                    return {
                        ...state,
                        filteredGames: ['No games found']
                    };
                };
                result = gamesToSortByGenre.filter(game => {
                    if (game.id.length === 36) {
                        let flag = false;
                        let i = 0;
                        while (i < game.genres.length && flag === false) {
                            if (game.genres[i].name === genre) {
                                return flag = true;
                            } else {
                                i++;
                            }
                        }
                        return flag;
                    } else {
                        return game.genres.includes(genre);
                    };
                });
            };
            if (result.length === 0) {
                return {
                    ...state,
                    filteredGames: ['No games found']
                };
            };
            return {
                ...state,
                filteredGames: result
            };
        };
        if ((state.activeFilters.sortAlphabetically !== '' || state.activeFilters.ratingSort !== '') && state.activeFilters.source === 'DB') {
            if (genre === 'All') {
                gamesToSortByGenre = state.mainGames;
                result = gamesToSortByGenre.filter(game => {
                    if (game.id.length === 36) {
                        return true;
                    }
                    return false;
                });
                if (result.length === 0) {
                    return {
                        ...state,
                        filteredGames: ['No games found']
                    };
                };
                return {
                    ...state,
                    filteredGames: result
                };
            };
            gamesToSortByGenre = state.mainGames;
            result = gamesToSortByGenre.filter(game => {
                if (game.id.length === 36) {
                    let flag = false;
                    let i = 0;
                    while (i < game.genres.length && flag === false) {
                        if (game.genres[i].name === genre) {
                            return flag = true;
                        } else {
                            i++;
                        }
                    }
                    return flag;
                } else {
                    return false;
                }
            })
            if (result.length === 0) {
                return {
                    ...state,
                    filteredGames: ['No games found']
                };
            };
            return {
                ...state,
                filteredGames: result
            };
        };
        if ((state.activeFilters.sortAlphabetically !== '' || state.activeFilters.ratingSort !== '') && state.activeFilters.source === 'API') {
            if (genre === 'All') {
                gamesToSortByGenre = state.mainGames;
                result = gamesToSortByGenre.filter(game => {
                    if (game.id.length === 36) {
                        return false;
                    };
                    return true;
                });
                if (result.length === 0) {
                    return {
                        ...state,
                        filteredGames: ['No games found']
                    };
                };
                return {
                    ...state,
                    filteredGames: result
                };
            };
            gamesToSortByGenre = state.mainGames;
            result = gamesToSortByGenre.filter(game => {
                if (game.id.length === 36) {
                    return false;
                }
                return game.genres.includes(genre);
            });
            if (result.length === 0) {
                return {
                    ...state,
                    filteredGames: ['No games found']
                };
            };
            return {
                ...state,
                filteredGames: result
            };
        };
        if (genre || genre === 'All') {
            if (genre === 'All') {
                return {
                    ...state,
                    filteredGames: state.mainGames
                }
            } else {
                gamesToSortByGenre = state.mainGames;
                result = gamesToSortByGenre.filter(game => {
                    if (game.id.length === 36) {
                        let flag = false;
                        let i = 0;
                        while (i < game.genres.length && flag === false) {
                            if (game.genres[i].name === genre) {
                                return flag = true;
                            } else {
                                i++;
                            }
                        }
                        return flag;
                    } else {
                        return game.genres.includes(genre);
                    }
                });
            };
            if (result.length === 0) {
                return {
                    ...state,
                    filteredGames: ['No games found']
                };
            };
            return {
                ...state,
                filteredGames: result
            };
        };
    };

    if (action.type === SORT_ALPHABETICALLY_OR_RATING) {
        let sortBy = action.payload;
        let sortedGames;
        let gamesToSort;
        if (state.activeFilters.gameGenre !== '' && state.filteredGames.length !== 0) {
            gamesToSort = state.filteredGames;
        } else if (state.activeFilters.gameGenre !== '' && state.filteredGames.length === 0) {
            return {
                ...state,
                filteredGames: ['No games found']
            };
        }
        else if (state.filteredGames.length) {
            gamesToSort = state.filteredGames
        } else {
            gamesToSort = state.mainGames
        };
        if (sortBy === 'ASC') {
            sortedGames = gamesToSort.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        };
        if (sortBy === 'DESC') {
            sortedGames = gamesToSort.sort((a, b) => {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
            });
        };
        if (sortBy === 'HIG') {
            sortedGames = gamesToSort.sort((a, b) => {
                return parseFloat(b.rating) - parseFloat(a.rating)
            });
        };
        if (sortBy === 'LOW') {
            sortedGames = gamesToSort.sort((a, b) => {
                return parseFloat(a.rating) - parseFloat(b.rating);
            });
        };
        return {
            ...state,
            filteredGames: sortedGames
        };
    };

    if (action.type === FILTER_BY_SOURCE) {
        if ((!state.activeFilters.sortAlphabetically && !state.activeFilters.ratingSort) && state.activeFilters.gameGenre) {
            let gamesToFilter = state.mainGames;
            let gamesFilteredBySource;
            if (action.payload === 'ALL') {
                gamesFilteredBySource = state.mainGames;
            };
            if (action.payload === 'DB') {
                gamesFilteredBySource = gamesToFilter.filter(g => g.id.length === 36);
            };
            if (action.payload === 'API') {
                gamesFilteredBySource = gamesToFilter.filter(g => g.id.length !== 36);
            };
            if (gamesFilteredBySource.length === 0) {
                return {
                    ...state,
                    filteredGames: ['No games found']
                };
            };
            return {
                ...state,
                filteredGames: gamesFilteredBySource
            }
        };
        let gamesToFilter = state.mainGames;
        let gamesFilteredBySource;
        if (action.payload === 'ALL') {
            gamesFilteredBySource = state.mainGames;
        };
        if (action.payload === 'DB') {
            gamesFilteredBySource = gamesToFilter.filter(g => g.id.length === 36);
        };
        if (action.payload === 'API') {
            gamesFilteredBySource = gamesToFilter.filter(g => g.id.length !== 36);
        };
        if (gamesFilteredBySource.length === 0) {
            return {
                ...state,
                filteredGames: ['No games found']
            };
        };
        return {
            ...state,
            filteredGames: gamesFilteredBySource
        };
    }

    else {
        return state;
    };
};

export default rootReducer;