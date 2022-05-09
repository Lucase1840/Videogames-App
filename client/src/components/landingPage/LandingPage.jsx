import React, { useEffect } from 'react';
import style from './LandingPage.module.css';
import { NavLink } from 'react-router-dom';
import { getAllGames, getGenres } from '../../redux/actions';
import { useDispatch } from 'react-redux';

function LandingPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGames());
        dispatch(getGenres())
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
