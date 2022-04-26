import React, { useEffect } from 'react';
import style from './LandingPage.module.css';
import { NavLink } from 'react-router-dom';
import { getAllGames } from '../../redux/actions';
import { useDispatch } from 'react-redux';

function LandingPage() {

    const dispatch = useDispatch();
    
    useEffect( () => {
        return dispatch(getAllGames());
    }, [dispatch]);

    return (
        <div className={style.landingContainer}>
            <div className={style.start}>
                <div>Press</div>
                <NavLink to="/videogames" className={style.link}>START</NavLink> 
                <div>to begin</div>
            </div>
        </div>
    )
};

export default LandingPage;
