import React, { useState } from "react";
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";
import MovieDetailsFromTMDBapi from "./MovieDetailsFromTMDBapi";
import "./css/TrailerURLfromMovieSearchLibrary.css";
import { FaFilm } from "react-icons/fa";
function TrailerURLfromMovieSearchLibrary() {
  const [movieTitle, setMovieTitle] = useState("");
  const [trailerURL, setTrailerURL] = useState("");
  const [trailerSuggestions, setTrailersuggestions] = useState([]);
  const [alerts, setAlerts] = useState("");
  const [trigger, setTrigger] = useState(false);

  const trailerSearch = async (title) => {
    try {
      const youtubeURL = await movieTrailer(title, { multi: true });
      console.log(youtubeURL);
      if (youtubeURL === null) {
        setAlerts("No Movie Trailer Found");
        setTrailerURL("");
        setTrailersuggestions([]);
      } else {
        setAlerts("");
        setTrailerURL(youtubeURL[0]);
        setTrailersuggestions(youtubeURL);
      }
    } catch (err) {
      console.error(err);
      setAlerts("Fetching Failed : Something Went Wrong");
    }
  };

  const handleClick = () => {
    if (!movieTitle) {
      setAlerts("Please Enter the Movie Name");
      setTrigger(false);
    } else {
      setAlerts("");
      trailerSearch(movieTitle);
      setTrigger(true);
    }
  };

  return (
    <div className="movie-container">
      <h3>
        <FaFilm />
        Trailer Search with Movie-Trailer Library
      </h3>
      <div className="search-section">
        <input
          id="name"
          type="text"
          value={movieTitle}
          placeholder="Enter the Movie Title...."
          onChange={(e) => setMovieTitle(e.target.value)}
        />

        <button onClick={handleClick}>Search</button>
      </div>
      <div className="search-ouput">
        <div className="details-section">
          {trailerURL && (
            <ReactPlayer url={trailerURL} controls={true} playing={false} />
          )}
        </div>
        <div>{alerts && <h3 className="alert-text">{alerts}</h3>}</div>

        <div className="overview">
          {trigger && <MovieDetailsFromTMDBapi title={movieTitle} />}
        </div>
      </div>

      {trailerSuggestions.length > 1 && (
        <>
          {" "}
          <h4>Related Trailers to Searched Movie ........</h4>
          <div className="sugchild">
            {trailerSuggestions.slice(1).map((suggestion, index) => {
              return (
                <div className="player">
                  <ReactPlayer
                    key={index}
                    url={suggestion}
                    controls={true}
                    playing={false}
                    width="100%"
                    height="400px"
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default TrailerURLfromMovieSearchLibrary;
