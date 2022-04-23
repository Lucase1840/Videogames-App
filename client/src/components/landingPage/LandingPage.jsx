import React from 'react';
import style from './LandingPage.module.css';
import { NavLink } from 'react-router-dom';

function LandingPage() { 
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
