import React, { useEffect, useState } from "react";
import "./Lyrics.css";
import Previewer from "./Spotify/Previewer";
import Suggestions from "./Suggestion/Suggestions";

function Lyrics() {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState([]);

  const alertError = (text) => {
    setError(text);
    setTimeout(() => {
      setError("");
    }, 2000);
  };

  const fetchSuggestion = async (query) => {
    if (!query) {
      return setSuggestion([]);
    } else {
      try {
        const response = await fetch(`https://api.lyrics.ovh/suggest/${query}`);
        const data = await response.json();
        setSuggestion(data.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleClick = async (artist, song) => {
    console.log(artist, song);
    if (!song || !artist) {
      alertError("Please enter both song & artist Name");
      return;
    } else {
      setError("");
      setLoading(true);
      setLyrics("");

      try {
        //Lyrics.ovh API
        const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
        if (!res.ok) {
          throw new Error("Lyrics Not Found");
        } else {
          const data = await res.json();
          setLyrics(data.lyrics || data.error);
        }
      } catch (err) {
        console.error(err);
        alertError("Error in Fetching Lyrics");
      } finally {
        setLoading(false);
      }
    }
  };

  const clickOnSuggestion = (songName, artist) => {
    setSong(songName);
    setArtist(artist);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestion(song);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [song]);

  return (
    <div className="container">
      <h2 className="title">🎶 Lyrics Finder</h2>
      <div className="input-row">
        <div className="input-group">
          <input
            placeholder="Enter the Song Name"
            type="text"
            id="song"
            value={song}
            className="input-field"
            onChange={(e) => {
              setSong(e.target.value);
            }}
          />
        </div>
        <div className="input-group">
          <input
            placeholder=" Enter the Artist Name"
            type="text"
            id="artist"
            value={artist}
            className="input-field"
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>
      </div>{" "}
      <button
        className="search-btn"
        onClick={() => handleClick(artist, song)}
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
      <div className="content-wrapper">
        <div className="suggestions-container">
          <Suggestions
            suggestionArray={suggestion}
            handleSugClick={clickOnSuggestion}
          />
        </div>
        <div className="preview-container">
          <Previewer input={song}></Previewer>
        </div>
      </div>
      <div className="lyrics-container">
        {" "}
        {loading && <p className="loading"> 🎶lyrics Loading</p>}
        {error && <p className="error">{error}</p>}
        {lyrics && <pre className="lyrics">{lyrics}</pre>}
      </div>
    </div>
  );
}

export default Lyrics;
