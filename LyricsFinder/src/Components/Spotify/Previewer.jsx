import React, { useEffect, useState } from "react";
import "./Pre.css";
function Previewer(props) {
  const [accessToken, setAccessToken] = useState(null);
  const [spotifyID, setSpotifyID] = useState(null); //Stores the URL of a 30-second audio preview of the song.
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const clientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  async function getAccessToken() {
    try {
      const res = await fetch(
        "https://accounts.spotify.com/api/token",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(clientID + ":" + clientSecret)}`, //clientId:clientSecret encoded in Base64.
            //btoa(...) = built-in JavaScript function that converts a string into Base64.
            //Ex:"abc123:xyz789" → "YWJjMTIzOnh5ejc4OQ=="
            //Look -Authorization: Basic YWJjMTIzOnh5ejc4OQ==
          },
          body: "grant_type=client_credentials",
          /*This tells Spotify what type of token you want.
          "client_credentials" means you’re asking for a token using just your app credentials (no user login).
          Spotify will return an App Access Token (valid ~1 hour). */
        }
      );
      const data = await res.json();
      setAccessToken(data.access_token);
      /*Example response:
      {
      "access_token": "BQDxxxxxxx",
      "token_type": "Bearer",
      "expires_in": 3600
      } 
      */
      console.log("Acces Token have been granted");
    } catch (err) {
      console.error(err);
      setErrors("Failed to Get Acces token Access");
    }
  }

  useEffect(() => {
    getAccessToken();
  }, []);

  const getSong = async (input) => {
    if (!accessToken) {
      setErrors("Acces token not Available Yet");
    } else {
      setSpotifyID(null);
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.spotify.com/v1/search?q=${input}&type=track&limit=3`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await res.json();
        console.log(data);
        /*{
  "tracks": {
    "items": [
      {
        "id": "TRACK_ID",
        "name": "Song Name",
        "artists": [{ "name": "Artist Name" }],
        "preview_url": "https://p.scdn.co/mp3-preview/XXXX.mp3",
        "external_urls": { "spotify": "https://open.spotify.com/track/TRACK_ID" },
        // other fields...
      }
    ]
  }
}
 */
        if (data.tracks.items.length > 0) {
          const track = data.tracks.items[0];
          setSpotifyID(track.id);
          setErrors("");
        } else {
          setErrors("No Songs Found");
          setSpotifyID(null);
        }
      } catch (err) {
        console.error(err);
        setErrors("Failed to Fetch Song from Spotify");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="preview-container">
      <button onClick={() => getSong(props.input)} disabled={!accessToken}>
        Play
      </button>

      {spotifyID && (
        <iframe
          key={spotifyID}
          src={`https://open.spotify.com/embed/track/${spotifyID}`}
          width="100%"
          height="80" // correct full-size height
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          frameBorder="0"
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
            display: "block",
            margin: "0 auto",
          }}
        ></iframe>
      )}

      <h3>{errors}</h3>
    </div>
  );
}

export default Previewer;
