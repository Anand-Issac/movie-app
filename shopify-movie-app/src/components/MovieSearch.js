import React, { useEffect, useState } from 'react';
import './MovieSearch.css';

function MovieSearch(props) {
    const [movie, setMovie] = useState("");

    //submits form and fetches API request data
    const handleClick = async (e) => {
      e.preventDefault();
      const apiKey = '44d30801'; // would normally be stored in a .env file
      const url = 'http://www.omdbapi.com/?apikey=' + apiKey + '&s=' + movie;
      const res = await fetch(url);
      const resData = await res.json();
      const data = resData.Search;
      props.sendMoviesData(data, movie);
    };

    const onChangeMovie = (e) => {
        setMovie(e.target.value);
    };

    return (
        <div className="container-class">
            <p>Search Movies</p>
            <form onSubmit={handleClick}>
                <div>
                    <input
                        className="input-box"
                        name="movie"
                        placeholder="Search by movie title"
                        value={movie}
                        onChange={onChangeMovie}
                    />
                    <button className="input-button" role="link">
                        Search
                    </button>
                </div>
                
                
            </form>
        </div> 

    );
  }
  
export default MovieSearch;

