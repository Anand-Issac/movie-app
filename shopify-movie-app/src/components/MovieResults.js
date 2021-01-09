import React, { useState } from 'react';
import './MovieResults.css'
function MovieResults(props) {
    const [movie, setMovie] = useState("");
    
    const handleClick = async (e) => {
      e.preventDefault();
    };

    //updates user movie search title
    const onChangeMovie = (e) => {
        setMovie(e.target.value);
    };
    
    //sends nominated movie data back to parent
    const nominateMovie = (movie) => {
        props.sendNominations(movie);
    }

    //checks if movie is already in nominated list
    const isMovieAlreadyNominated = (movie) => {
        const nominatedMoviesList = props.nominatedMovies;
        console.log(nominatedMoviesList);
        for (var i = 0; i < nominatedMoviesList.length; i++) {
            if (nominatedMoviesList[i] === movie) {
                return true;
            }
        }
        return false;
    }

    return (
        <div className="container-class">
            <p>Results for {props.movieSearchTitle}</p>
            <div>
                <ul>
                    {props.movies.map(movie => (
                        <div className="movie-container" >
                            <div className="movie-item">
                                <li>{movie.Title} ({movie.Year})</li>
                            </div>
                            <div className="nominate-button-container">
                                <button disabled={isMovieAlreadyNominated(movie)} onClick={() => {nominateMovie(movie)}} className="nominate-button">Nominate</button>
                            </div>  
                            <div className="clearfix"></div>
                        </div>
                    
                    
                    ))}
                </ul>
            </div>
        </div> 

    );
  }
  
export default MovieResults;

