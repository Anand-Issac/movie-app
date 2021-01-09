import React, { useState } from 'react';
import './MovieNominations.css';
function MovieNominations(props) {
    const [movie, setMovie] = useState("");
    //callback to remove movie from nomination movie list
    const removeNominationMovie = (movie) => {
      props.removeNomination(movie);
  }
    return (
        <div className='container-class'>
            <p>Nominations</p>
            <ul>
              {props.nominatedMovies.map(movie => (
                  <div className="movie-container" >
                      <div className="movie-item">
                          <li>{movie.Title} ({movie.Year})</li>
                      </div>
                      <div className="nominate-button-container">
                          <button onClick={() => {removeNominationMovie(movie)}} className="nominate-button">Remove</button>
                      </div>  
                      <div className="clearfix"></div>
                  </div>
              
              
              ))}
            </ul>
            {
              props.nominatedMovies.length > 4 && 
              <p className="max-nom-warning">Maximum 5 nominations per user</p>
            }
        
        </div> 

    );
  }
  
export default MovieNominations;

