import React from 'react';

function Pagination({ gamesPerPage, totalGames, paginate }) {
const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pageNumbers.push(i);
};

return (
    <nav>
        <ul>
            {pageNumbers ? pageNumbers.map(number => {
                return (
                    <li key={number}>
                        <a onClick={() => paginate(number)} href='#top'>
                            {number}
                        </a>
                    </li>
                )
            }): 'Not Working'}
        </ul>
    </nav>
)
}

export default Pagination;