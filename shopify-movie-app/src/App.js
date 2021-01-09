import logo from './logo.svg';
import './App.css';
import MovieSearch from './components/MovieSearch';
import MovieResults from './components/MovieResults';
import MovieNominations from './components/MovieNominations';
import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

function App() {
  const [movies, setMovies] = useState([]);
  const [movieSearchTitle, setMovieSearchTitle] = useState("");
  const [nominatedMovies, setNominatedMovies] = useState([]);

  const [modalIsOpen,setIsOpen] = React.useState(true);
  console.log(modalIsOpen);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }
 
  function closeModal(){
    setIsOpen(false);
  }

  //callback function that sends data from child comp. to parent comp.
  const sendMoviesData = (moviesData, movieSearchTitleRes) => {
    setMovies(moviesData);
    setMovieSearchTitle(movieSearchTitleRes);
  }

  const sendNominations = (nominatedMoviesData) => {
    setNominatedMovies([...nominatedMovies, nominatedMoviesData]);
    if (nominatedMovies.length > 4){
      openModal();
    }
  }

  const removeNomination = (movie) => {
    setNominatedMovies(nominatedMovies.filter(curr => curr != movie));
    if (nominatedMovies.length > 4){
      openModal();
    }
  }

  return (
    <div className="container">
      {
        nominatedMovies.length > 4 &&
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Nomination Limit Modal"
          >
  
            <h2>Thank you for your nominations!</h2>
            <div>
              <p>
                Your input is very valued here at Shopify! Have a wonderful day.
              </p>
            </div>
            <button onClick={closeModal}>close</button>
            
        </Modal>
      }
      
      
      <h1 className="title">The Shoppies</h1>
      <div className="movie-container-1" style={{"margin-bottom": "10px"}}>
        <MovieSearch movies={movies} sendMoviesData={sendMoviesData}></MovieSearch>
      </div>
      <div className="container-4">
        <div className="movie-container-2" style={{"margin-bottom": "10px"}}>
          <MovieResults movies={movies} movieSearchTitle={movieSearchTitle} nominatedMovies={nominatedMovies} sendNominations={sendNominations} className="movie-container"></MovieResults>
        </div>

        <div className="movie-container-3" >
          <MovieNominations nominatedMovies={nominatedMovies} removeNomination={removeNomination} className="movie-container"></MovieNominations>
        </div>
        <div className="clear"></div>
      </div>
    </div>
  );
}

export default App;
