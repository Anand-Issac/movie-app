import React, { useState } from 'react';
import './MovieResults.css';
import Modal from 'react-modal';

function MovieResults(props) {
    const [movie, setMovie] = useState([]);
    const [movieDetails, setMovieDetails] = useState(false);
    const [modalIsOpen,setIsOpen] = useState(false);

    //fetch the details of the movie by the imdbId
    const getDetails = async (movie) => {
        setIsOpen(true);
        const apiKey = '44d30801'; // would normally be stored in a .env file
        const url = 'https://www.omdbapi.com/?apikey=' + apiKey + '&i=' + movie.imdbID;
        const res = await fetch(url);
        const resData = await res.json();
        const data = resData;
        console.log(data);
        setMovie(data);

    }

    const closeModal = () => {
        setMovie([]);
        setIsOpen(false);
    }

    const afterOpenModal = () => {

    }
       
    //sends nominated movie data back to parent
    const nominateMovie = (movie) => {
        props.sendNominations(movie);
    }

    //checks if movie is already in nominated list
    const isMovieAlreadyNominated = (movie) => {
        const nominatedMoviesList = props.nominatedMovies;
        for (var i = 0; i < nominatedMoviesList.length; i++) {
            if (nominatedMoviesList[i] === movie) {
                return true;
            }
        }
        return false;
    }

    // checks if there already 5 nominations submitted
    const maxNominationsReached = () => {
        if (props.nominatedMovies.length >= 5){
            return true;
        }
        return false;
    }

    return (
        <div className="container-class">
            <p>Results for {props.movieSearchTitle}</p>
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Nomination Limit Modal"
                >
        
                    <h2>{movie.Title}</h2>
                    <img src={movie.Poster}></img>
                    <p> <span style={{fontWeight:"bold"}}>Genre: </span>{movie.Genre}</p>
                    <p><span style={{fontWeight:"bold"}}>Plot: </span>{movie.Plot}</p>
                    <p><span style={{fontWeight:"bold"}}>IMDB Rating: </span>{movie.imdbRating} / 10</p>
                    
                    <div>
                    </div>
                    <button onClick={closeModal}>close</button>
                    
                </Modal>
                <ul>
                    {props.movies != null && 
                    props.movies.map(movie => (
                        <div>
                            <div className="flex-container" >
                                <div className="movie-item">
                                    <li>{movie.Title} ({movie.Year})</li>
                                </div>
                                <div className="nominate-button-container">
                                    <button disabled={isMovieAlreadyNominated(movie) || maxNominationsReached()} onClick={() => {nominateMovie(movie)}} className="nominate-button">Nominate</button>
                                </div> 
                                <div className="see-more-container">
                                    <button onClick={() => getDetails(movie)} className="see-more">Details</button>
                                </div>
                                
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div> 

    );
  }
const customStyles = {
content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    maxWidth : '1000px',
}
};
export default MovieResults;

