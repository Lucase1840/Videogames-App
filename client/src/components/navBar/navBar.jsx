import React, {useRef, useEffect, useState} from 'react';
import style from './navBar.module.css';
import image from '../../images/bar-logo.jpg'
import { NavLink, useHistory } from 'react-router-dom';
import { searchByName } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import Filters from '../filters/Filters.jsx'


function NavBar() { 
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    let history = useHistory();

    // const handleKeyPress = function (e) {
    //     const input = inputRef.current;
    //     if (e.key === 'Enter') {
    //       dispatch(searchByName(input.value));
    //     }
    // };

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchByName(name));
        setName('');
        history.push('/videogames/results');
    }

    // useEffect( () => {
    //     const input = inputRef.current;
    //     if(inputRef && inputRef.current) {
    //         inputRef.current.addEventListener('keypress', function (e) {
    //             if (e.key === 'Enter') {
    //               dispatch(setSearchName(input.value));
    //               dispatch(getAllGames(input.value));
    //               input.value = '';
    //             }
    //     })}
    //     return () => input.removeEventListener('keypress', ('keypress', function (e) {
    //         if (e.key === 'Enter') {
    //             dispatch(setSearchName(input.value));
    //             dispatch(getAllGames(input.value));
    //             input.value = '';
    //         }
    //     }));
    // }, [dispatch])

    console.log(name)
    return (
        <div className={style.bar}>
            <NavLink to='/' className={style.link}>
                <img src={image} className={style.image} alt='asd'></img>
                <div className={style.titleContainer}>
                    <h2 className={style.title}>The</h2>
                    <h2 className={style.title}>GAME</h2>
                    <h2 className={style.title}>Searcher</h2>
                </div>
            </NavLink>

            <Filters/>

            <div className={style.searchBar}>
                <form onSubmit={handleSubmit}>
                    <label>Search for a game </label>
                    <input
                        name='gameName'
                        className={style.create}
                        // ref={inputRef}
                        placeholder='Search for a videogame by name'
                        onChange={handleChange}
                    >
                    </input>
                    {/* <NavLink to='/videogames/results'> */}
                    <button type='submit'>
                        asd
                    </button>
                    {/* </NavLink> */}

                </form>

            </div>
            <NavLink 
            to='/videogames'
            className={style.main}
            >Main games
            </NavLink>
            <NavLink to='/videogame' className={style.create}>Create a new game</NavLink>
        </div>
    );
};

export default NavBar;

