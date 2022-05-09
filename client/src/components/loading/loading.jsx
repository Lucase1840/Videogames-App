import React from 'react';
import style from './loading.module.css'

function Loading() {
    return (
        <div className={style.container}>
            <div className={style.loading}>
            </div>
            <h2>Loading</h2>
        </div>

    );
}

export default Loading;