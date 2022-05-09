import React, { useState } from 'react';
import style from './navBar.module.css';
import image from '../../images/bar-logo.jpg'
import { NavLink, useHistory } from 'react-router-dom';
import { searchByName, loadingStatus } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import Filters from '../filters/Filters.jsx';
import searchImage from '../../images/icone-loupe-gris.png'


function NavBar({ id }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    let url = window.location.pathname;

    let history = useHistory();

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '' || name.charCodeAt(0) === 32) return alert('Please, enter a valid videogame name to search')
        dispatch(searchByName(name));
        dispatch(loadingStatus(true))
        e.target.value = '';
        history.push('/videogames/results');
    }

    return (
        <div className={style.bar}>
            <NavLink to='/' className={style.link}>
                <img src={image} className={style.image} alt='logo'></img>
                <div className={style.titleContainer}>
                    <h2 className={style.title}>The</h2>
                    <h2 className={style.title}>GAME</h2>
                    <h2 className={style.title}>Searcher</h2>
                </div>
            </NavLink>

            {(url === '/videogames/results' || url === '/videogame' || url === `/videogame/${id}`) ? ''
                : <Filters className={style.filters} />}

            <div className={style.searchBar}>
                <form onSubmit={handleSubmit}>
                    <label className={(url === '/videogames/results') ? style.barLabelActive : ''}>Search for a game</label>
                    <input
                        name='gameName'
                        className={style.create}
                        placeholder='Search for a videogame by name'
                        onChange={handleChange}
                    >
                    </input>
                    <button type='submit' className={style.searchButton}>
                        <img src={searchImage} className={style.searchIcon} alt='search-icon'></img>
                    </button>
                </form>

            </div>
            <NavLink
                to='/videogames'
                className={(url === '/videogames') ? style.mainActive : style.main}
            >Main games
            </NavLink>
            <NavLink
                to='/videogame'
                className={(url === '/videogame') ? style.createActive : style.create}
            >Create a new game
            </NavLink>
        </div>
    );
};

export default NavBar;

