import logo from './logo.svg';
import './App.css';
import MovieSearch from './components/MovieSearch';
import MovieResults from './components/MovieResults';
import MovieNominations from './components/MovieNominations';
import React, { useState } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  const [movieSearchTitle, setMovieSearchTitle] = useState("");
  const [nominatedMovies, setNominatedMovies] = useState([]);

  //callback function that sends data from child comp. to parent comp.
  const sendMoviesData = (moviesData, movieSearchTitleRes) => {
    setMovies(moviesData);
    setMovieSearchTitle(movieSearchTitleRes);
  }

  const sendNominations = (nominatedMoviesData) => {
    setNominatedMovies([...nominatedMovies, nominatedMoviesData]);
  }

  return (
    <div className="container">
      <h1 className="title">The Shoppies</h1>
      <div className="movie-container" style={{"margin-bottom": "10px"}}>
        <MovieSearch movies={movies} sendMoviesData={sendMoviesData}></MovieSearch>
      </div>

      <div className="movie-container" style={{"margin-bottom": "10px"}}>
        <MovieResults movies={movies} movieSearchTitle={movieSearchTitle} nominatedMovies={nominatedMovies} sendNominations={sendNominations} className="movie-container"></MovieResults>
      </div>

      <div className="movie-container" >
        <MovieNominations nominatedMovies={nominatedMovies} className="movie-container"></MovieNominations>
      </div>
  
    </div>
  );
}

export default App;
