import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1>🎬 Welcome to Movie Trailer Hub</h1>
      <p>
        Search and watch trailers using either our TMDB API integration or the
        JavaScript library method.
      </p>

      <div className="home-actions">
        <a href="/trailer" className="btn">
          JS Library Search
        </a>
        <a href="/trailerwithApi" className="btn">
          TMDB API Search
        </a>
      </div>
    </div>
  );
}

export default Home;
