import React, { useState } from "react";
import MovieDetailsFromTMDBapi from "./MovieDetailsFromTMDBapi";
import "./css/MovieTrailerSearchWithAPI.css";
function MovieTrailerSearchWithAPI() {
  const [trailerURL, setTrailerURL] = useState("");
  const [movie, setMovie] = useState("");
  const [alerts, setAlerts] = useState("");
  const [urlKeys, setUrlKeys] = useState([]);
  const API_KEY = import.meta.env.VITE_My_API_KEY;

  const trailerSearch = async (title) => {
    setTrailerURL("");
    setAlerts("");
    try {
      const res = await fetch(
        //Used to find the movie ID from the title.
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`
      );

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const ID = data.results[0].id;
        const trailersfromsearch = await fetch(
          //Get Movie Videos API:
          `https://api.themoviedb.org/3/movie/${ID}/videos?api_key=${API_KEY}`
        );
        const videoData = await trailersfromsearch.json();
        const keysofurl = videoData.results.map((movie) => movie.key);
        setUrlKeys(keysofurl);
        console.log(keysofurl);
        if (keysofurl) {
          setTrailerURL(`https://www.youtube.com/embed/${keysofurl[0]}`);
          /*You’ll get a YouTube page inside the frame, with the header, sidebar, and comments 
        — not just the video player.
        Using the embed URL shows only the video player, which is what you want for a clean trailer display. */
        } else {
          setAlerts("No Matching Trailer Key found");
        }
      } else {
        setAlerts("No Matching Id's Found");
      }
    } catch (err) {
      console.error(err);
      setAlerts("Fetching Failed : Something Went Wrong");
    }
  };

  const handleClick = () => {
    if (!movie) {
      setAlerts("Please Enter the Movie Name");
    } else {
      trailerSearch(movie);
      setAlerts("");
    }
  };

  return (
    <div className="trailer-search-container">
      <h3>Trailer Search with TMDB API</h3>
      <div className="search-bar">
        {" "}
        <input
          id="name"
          type="text"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          placeholder="Enter the Movie Title...."
        />
        <button onClick={handleClick}>Search</button>
      </div>

      {alerts && <h4 className="alert">{alerts}</h4>}

      <div className="main-output">
        {trailerURL && (
          <div className="iframe-section">
            <iframe
              width="100%"
              height="315"
              src={trailerURL}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        {movie && <MovieDetailsFromTMDBapi title={movie} />}
      </div>
      {urlKeys.slice(1).length > 0 && (
        <>
          <h3>Related Movie Trailers......</h3>
          <div className="suggestions">
            {urlKeys.slice(1).map((urlkey, index) => {
              return (
                <iframe
                  key={index}
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${urlkey}`}
                  title="Movie Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default MovieTrailerSearchWithAPI;
