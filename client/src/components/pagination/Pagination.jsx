import React, { useEffect } from 'react';
import style from './Pagination.module.css'

function Pagination({ gamesPerPage, totalGames, paginate }) {
    
    useEffect(() => {
    }, [totalGames]);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <nav className={style.container}>
            <ul className={style.pageList}>
                {pageNumbers ? pageNumbers.map(number => {
                    return (
                        <li 
                            key={number}
                            className={style.items}>
                            <a
                                onClick={
                                    () => paginate(number)
                                }
                                href='#top'
                                className={style.pages}
                            >{number}
                            </a>
                        </li>
                    )
                }) : 'Not Working'}
            </ul>
        </nav>
    )
}

export default Pagination;