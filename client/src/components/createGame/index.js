import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, createGame } from '../../redux/actions';

function CreateGame() {   
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);
    const genres = useSelector(state => state.genres);
    let platforms = [
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
        raiting: '',
        genres: [],
        platforms: [],
    });

    const [errors, setErrors] = React.useState({
        name: '',
        description: '',
        releaseDate: '',
        raiting: '',
        genres: '',
        platforms: '',
    });

    const handleInputChange = function(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    };

    const handleCheckboxChange = function(e) {
        if (input.genres.includes(e.target.value)) {
            setInput({
                ...input,
                genres: input.genres.filter(g => g !== e.target.value)
            });
        } else {
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            })
            setErrors(validate({
                ...input,
                genres: [...input.genres, e.target.value]
            }))
        };
    };

    const handleListChange = function (e) {
            setInput({
                ...input,
                platforms: input.platforms.concat(e.target.value)
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
                dispatch(createGame(input))
            } catch(err) {
                console.log(err)
            }
        } else {
            alert('Mandatory fields are not filled');
        };
    }



    console.log(errors)
    console.log(input)
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input name="name" onChange={handleInputChange}/>
                <span>{errors.name}</span><br/>
                <label>Description:</label>
                <input name="description" onChange={handleInputChange}/>
                <span>{errors.description}</span><br/>
                <label>Release Date:</label>
                <input name="releaseDate" onChange={handleInputChange} placeholder="YYYY-MM-DD"/>
                <span>{errors.releaseDate}</span><br/>
                <label>Raiting:</label>
                <input name="raiting" onChange={handleInputChange} placeholder="4.15"/>
                <span>{errors.raiting}</span><br/>
                <label>Genres:</label><br/>
                <span>{errors.genres}</span>

                {genres ? genres.map(gen => {
                    return (
                        <div key={gen.id}>
                            <input type='checkbox' id={gen.name} name='genres' onChange={handleCheckboxChange} value={gen.name}></input>
                            <label>{gen.name}</label>
                        </div>
                    )
                }) :'No funca'}

                <label>Platforms: </label><br/>
                <span>{input.platforms.length < 0 || errors.platforms}</span><br/>
                    <select name='platforms' id='platforms' onChange={handleListChange}>
                        {platforms.map((p, i) => {
                            return (                    
                                <option 
                                    key={i}
                                    name='platforms'
                                    value={p.name}
                                >{p.name} </option>                                              
                            )
                        })}
                    </select>

                <div>Selected: {input.platforms.map((p, i) => {
                    return (
                        <React.Fragment key={i}>
                            <span onClick={handleListDelete}>
                                {p}
                            </span> <br />
                        </React.Fragment>
                    );
                })}
                </div>
        
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export const validate = function (input) {
    let errors = {};
    if(!input.name) {
        errors.username = 'The videogame name is required';
    } else if (!/^[^<>*%:&\\]*$/g.test(input.username)) {
        errors.username = 'The videogame name can not contain special characters';
    };
    if(input.description.length < 10) {
        errors.description = 'The description must be at least 10 characters long';
    };
    if(!/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(input.releaseDate)) {
        errors.releaseDate = 'The release date must be in the format YYYY-MM-DD';
    };
    if((input.raiting > 5) || (input.raiting < 0) || !/\d[.,]\d\d/.test(input.raiting)) {
        errors.raiting = 'The raiting must be a number not greater than 5, and with at least one decimal';
    };
    if(input.genres.length < 1) {
        errors.genres = 'The videogame must have at least one genre';
    }; 
    if(input.platforms.length < 1) {
        errors.platforms = 'The videogame must have at least one platform';
    }
    if(input.genres.length < 1) {
        errors.genres = 'At least one genre must be selected';
    }
    if(input.platforms.length < 1) {
        errors.platforms = 'At least one platform must be selected';
    }
    return errors;
}


export default CreateGame;