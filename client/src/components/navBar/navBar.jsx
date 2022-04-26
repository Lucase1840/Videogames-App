import React, {useRef, useEffect} from 'react';
import style from './navBar.module.css';
import image from '../../images/bar-logo.jpg'
import { NavLink } from 'react-router-dom';
import { setSearchName } from '../../redux/actions';
import { useDispatch } from 'react-redux';


function NavBar() { 
    const dispatch = useDispatch();

    const inputRef = useRef(null);

    // const handleKeyPress = function (e) {
    //     const input = inputRef.current;
    //     if (e.key === 'Enter') {
    //       dispatch(searchByName(input.value));
    //     }
    // };

    useEffect( () => {
        const input = inputRef.current;
        if(inputRef && inputRef.current) {
            inputRef.current.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                  dispatch(setSearchName(input.value));
                  input.value = '';
                }
        })}
        return () => input.removeEventListener('keypress', ('keypress', function (e) {
            if (e.key === 'Enter') {
              dispatch(setSearchName(input.value));
              input.value = '';
            }
        }));
    }, [dispatch])


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
            <div className={style.searchBar}>
                <label>Search for a game </label>
                <input 
                    name='gameName'
                    className={style.create}
                    ref={inputRef}
                    placeholder='Search for a videogame by name'
                >
                </input>
            </div>
            <NavLink to='/videogames' className={style.main}>Main games</NavLink>
            <NavLink to='/videogame' className={style.create}>Create a new game</NavLink>
        </div>
    )
};

export default NavBar;