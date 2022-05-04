import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import style from './Pagination.module.css'

function Pagination({ gamesPerPage, totalGames, paginate }) {
    
    const actualPage = useSelector(state => state.pagination);

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
                            className={(actualPage === number) ? style.itemsSelected : style.items}>
                            <a
                                onClick={
                                    () => paginate(number)
                                }
                                href='#top'
                                className={(actualPage === number) ? style.pagesSelected: style.pages}
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