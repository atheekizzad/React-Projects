import React, { useEffect, useState } from "react";
import "./css/MovieDetailsFromTMDBapi.css";

function MovieDetailsFromTMDBapi(props) {
  const [details, setDetails] = useState("");
  const [Img, setImg] = useState(null);
  const [alerts, setAlerts] = useState("");
  const API_KEY = import.meta.env.VITE_My_API_KEY;
  const title = props.title;

  useEffect(() => {
    fetchDetails(title);
  }, [title]);

  const fetchDetails = async (movieTitle) => {
    setAlerts("");
    if (!movieTitle) {
      return;
    }
    try {
      //TMDB (The Movie Database) search API endpoint for movies
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieTitle}`
      );
      const data = await res.json();
      console.log(data);
      if (data.results.length > 0) {
        const overView = data.results[0].overview;
        setDetails(overView);
        const poster = data.results[0].poster_path;
        setImg(poster ? `https://image.tmdb.org/t/p/w500/${poster}` : null);
      } else {
        setDetails("No Overviews Found");
        setImg(null);
      }
    } catch (err) {
      console.error(err);
      setAlerts("Something Went Wrong");
    }
  };
  return (
    <div className="details-container">
      {Img && <img className="movie-poster" src={Img} alt="Poster" />}
      {details && <p className="movie-overview">{details}</p>}
      {alerts && <h3>{alerts}</h3>}
    </div>
  );
}

export default MovieDetailsFromTMDBapi;
