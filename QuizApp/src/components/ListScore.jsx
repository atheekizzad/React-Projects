import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ListScore.css";
function ListScore() {
  const [HighScores, setHighScores] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      // Load high scores from localStorage
      const storedScores = JSON.parse(localStorage.getItem("HighScores")) || [];
      setHighScores(storedScores);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleGoToMainPage = () => {
    navigate("/");
  };
  return (
    <div className="highscore-container">
      <h1>🏆 High Scores</h1>

      {HighScores.length === 0 ? (
        <h3>No Highscores</h3>
      ) : (
        <div>
          <ul>
            {HighScores.map((x, index) => {
              return (
                <li key={index}>
                  <span>{x.name}</span>
                  <span>{x.score} Points</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <button onClick={handleGoToMainPage}>Go Back to Main Page</button>
    </div>
  );
}

export default ListScore;
