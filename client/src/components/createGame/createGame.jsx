import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, createGame, getAllGames } from '../../redux/actions';
import style from './createGame.module.css';

function CreateGame() {   
    const dispatch = useDispatch();
    const gameGenres = useSelector(state => state.genres);
    const platforms = [
        { name: 'PC' },
        { name: 'PlayStation 5' },
        { name: 'PlayStation 4' },
        { name: 'Xbox One' },
        { name: 'Xbox Series S/X' },
        { name: 'Nintendo Switch' },
        { name: 'iOS' },
        { name: 'Android' },
        { name: 'Nintendo 3DS' },
        { name: 'Nintendo DS' },
        { name: 'Nintendo DSi' },
        { name: 'macOS' },
        { name: 'Linux' },
        { name: 'Xbox 360' },
        { name: 'Xbox' },
        { name: 'PlayStation 3' },
        { name: 'PlayStation 2' },
        { name: 'PlayStation' },
        { name: 'PS Vita' },
        { name: 'PSP' },
        { name: 'Wii U' },
        { name: 'Wii' },
        { name: 'GameCube' },
        { name: 'Nintendo 64' },
        { name: 'Game Boy Advance' },
        { name: 'Game Boy Color' },
        { name: 'Game Boy' },
        { name: 'SNES' },
        { name: 'NES' },
        { name: 'Classic Macintosh' },
        { name: 'Apple II' },
        { name: 'Commodore / Amiga' },
        { name: 'Atari 7800' },
        { name: 'Atari 5200' },
        { name: 'Atari 2600' },
        { name: 'Atari Flashback' },
        { name: 'Atari 8-bit' },
        { name: 'Atari ST' },
        { name: 'Atari Lynx' },
        { name: 'Atari XEGS' },
        { name: 'Genesis' },
        { name: 'SEGA Saturn' },
        { name: 'SEGA CD' },
        { name: 'SEGA 32X' },
        { name: 'SEGA Master System' },
        { name: 'Dreamcast' },
        { name: '3DO' },
        { name: 'Jaguar' },
        { name: 'Game Gear' },
        { name: 'Neo Geo' },
        { name: 'Web'}
    ];
    const [input, setInput] = React.useState({
        name: '',
        description: '',
        releaseDate: '',
        rating: '',
        gGenres: [],
        platforms: [],
    });
    const [errors, setErrors] = React.useState({
        name: '',
        description: '',
        releaseDate: '',
        rating: '',
        gGenres: '',
        platforms: '',
    });
    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]); 

    const handleInputChange = function(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    const handleCheckboxChange = function(e) {
        if (input.gGenres.includes(e.target.value)) {
            setInput({
                ...input,
                gGenres: input.gGenres.filter(g => g !== e.target.value)
            });
        } else {
            setInput({
                ...input,
                gGenres: [...input.gGenres, e.target.value]
            });
            setErrors(validate({
                ...input,
                gGenres: [...input.gGenres, e.target.value]
            }));
        };
    };

    const handleListChange = function (e) {
        if(input.platforms.includes(e.target.value)) return;
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            });
            setErrors(validate({
                ...input,
                platforms: [...input.platforms, e.target.value]
            }))
    };

    const handleListDelete = function (e) {
        setInput({
            ...input,
            platforms: input.platforms.filter(p => p !== e.currentTarget.textContent)
        });
    };

    const handleSubmit = function (e) {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            try{
                dispatch(createGame(input));
                dispatch(getAllGames());
                e.target.reset();
            } catch(err) {
                console.log(err);
            }
        } else {
            alert('All the mandatory fields are not filled');
        };
    };

    return (
        <div className={style.mainContainer}>
            <h2 className={style.title}>Create your Videogame</h2>
            <div className={style.container}>
                <form onSubmit={handleSubmit} className={style.for}>
                    <div className={style.fromNameToGenres}>
                        <label>Name:</label>
                        <input name="name" onChange={handleInputChange} />
                        <span>{errors.name}</span><br/>
                        <label>Description:</label>
                        <textarea 
                            name="description" 
                            onChange={handleInputChange}
                            rows='3'
                            cols='40' />
                        <span>{errors.description}</span><br/>
                        <label>Release Date:</label>
                        <input name="releaseDate" onChange={handleInputChange} placeholder="YYYY-MM-DD" />
                        <span>{errors.releaseDate}</span><br/>
                        <label>Rating:</label>
                        <input name="rating" onChange={handleInputChange} placeholder="4.15" />
                        <span>{errors.rating}</span><br/>
                        <label>Genres:</label>
                        <span className={style.asd}>{errors.gGenres}</span>
                    </div>

                    <div className={style.genres}>
                        {gameGenres ? gameGenres.map(gen => {
                            return (
                                <div key={gen.id} className={style.genresItems}>
                                    <input
                                        type='checkbox'
                                        id={gen.name}
                                        name='genres'
                                        onChange={handleCheckboxChange}
                                        value={JSON.stringify(gen)}>
                                    </input>
                                    <label>{gen.name}</label>
                                </div>
                            )
                        }) : 'No funca'}
                    </div>

                    <div className={style.fromNameToGenres}>
                        <label>Platforms: </label>
                        <span>{input.platforms.length < 0 || errors.platforms}</span><br/>
                        <select name='platforms' id='platforms' defaultValue='true' onChange={handleListChange} className={style.selectTag}>
                            <option value={true} disabled="disabled">Select Platforms</option>
                            {platforms.map((p, i) => {
                                return (
                                    <option
                                        key={i}
                                        name='platforms'
                                        value={p.name}
                                    >{p.name}</option>
                                )
                            })}
                        </select><br/>
                        <label className={style.labelSelected}>Selected:</label>    
                        <div className={style.selected}>{input.platforms.map((p, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <span onClick={handleListDelete}>
                                        {p}
                                    </span>
                                </React.Fragment>
                            );
                        })}
                        </div>
                        
                        <button type='submit' className={style.button}>Create Game</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const validate = function (input) {
    let errors = {};
    if(!input.name || input.name.length < 3) {
        errors.name = 'The videogame name must be at least 3 characters long';
    } else if (/["`'#%&,:;<>=@{}~$()*+/?[\]^|]+/.test(input.name)) {
        errors.name = 'The videogame name can not contain special characters';
    };
    if(input.description.length < 10) {
        errors.description = 'The description must be at least 10 characters long';
    };
    if(!/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(input.releaseDate)) {
        errors.releaseDate = 'The release date must be in the format YYYY-MM-DD';
    };
    if((input.rating > 5) || (input.rating < 0) || /^(?:[1-9]\d{0,4}|0)\.\d$/.test(input.rating)) {
        errors.rating = 'The rating must be a number not greater than 5, and with at least two decimals';
    };
    if(input.gGenres.length < 1) {
        errors.gGenres = 'The videogame must have at least one genre';
    }; 
    if(input.platforms.length < 1) {
        errors.platforms = 'The videogame must have at least one platform';
    }
    if(input.gGenres.length < 1) {
        errors.gGenres = 'At least one genre must be selected';
    }
    if(input.platforms.length < 1) {
        errors.platforms = 'At least one platform must be selected';
    }
    return errors;
};


export default CreateGame;