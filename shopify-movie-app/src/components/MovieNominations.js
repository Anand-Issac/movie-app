import React, { useState } from 'react';
import './MovieNominations.css';
function MovieNominations(props) {
    const [movie, setMovie] = useState("");

    const handleClick = async (e) => {
      e.preventDefault();
      //dispatch(login(email,password, client));
    };

    const onChangeMovie = (e) => {
        setMovie(e.target.value);
    };

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
                          <button onClick={() => {}} className="nominate-button">Remove</button>
                      </div>  
                      <div className="clearfix"></div>
                  </div>
              
              
              ))}
            </ul>
        
        </div> 

    );
  }
  
export default MovieNominations;

