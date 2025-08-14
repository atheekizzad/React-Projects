import React, { useState } from "react";
import Qbank from "./Qbank";
import "./showpage.css";
import { useNavigate } from "react-router-dom";

function Showpage() {
  const [currentquestion, setCurrentquestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedoption] = useState([]);
  const [quizfinished, setQuizFinished] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleselectoption = (option) => {
    const nowAnswerArray = [...selectedOption];
    nowAnswerArray[currentquestion] = option;
    setSelectedoption(nowAnswerArray);
  };

  const handleAnswerClick = () => {
    if (currentquestion === Qbank.length - 1) {
      let finalScore = selectedOption.reduce(
        (acc, selected, index) =>
          acc + (selected === Qbank[index].answer ? 1 : 0),
        0
      );
      setScore(finalScore);
      setQuizFinished(true);
      console.log(selectedOption);
    } else {
      setCurrentquestion((prevquestion) => prevquestion + 1);
    }
  };

  const handleGoBack = () => {
    if (currentquestion > 0) {
      setCurrentquestion((prev) => prev - 1);
    } else {
      return;
    }
  };
  const handleGoNext = () => {
    if (currentquestion < Qbank.length - 1) {
      setCurrentquestion((prev) => prev + 1);
    } else {
      return;
    }
  };

  const showscores = () => {
    navigate("/listOfScores");
  };

  const saveScore = () => {
    if (!username.trim()) {
      alert("Please Enter your Name");
      return;
    }
    const userScore = { name: username, score: score };
    const storedScores = JSON.parse(localStorage.getItem("HighScores")) || []; //  JSON.Parseturns that string back into a JavaScript array.
    console.log("Saving score:", userScore);
    const updateTheScore = [...storedScores, userScore];
    updateTheScore.sort((a, b) => b.score - a.score);
    localStorage.setItem("HighScores", JSON.stringify(updateTheScore)); //Converts the sorted score array back to a string with JSON.stringify(...).
    handleGoToMainPage();
  };

  const handleGoToMainPage = () => {
    setQuizFinished(false);
    setSelectedoption([]);
    setCurrentquestion(0);
  };
  return (
    <div className="quiz-container">
      <div>
        <h1>
          💻Multiple-Choice Quiz App Built with🚀✨React (No Backend Required)
        </h1>
        <button className="highScore-button" onClick={showscores}>
          HighScores
        </button>
        {!quizfinished ? (
          <div>
            <h3 className="question">
              {Qbank[currentquestion].id}.{Qbank[currentquestion].question}
            </h3>

            {Qbank[currentquestion].options.map((option, index) => (
              <div key={index} className="option-container">
                <input
                  id={index}
                  type="radio"
                  value={option}
                  onChange={() => handleselectoption(option)}
                  checked={selectedOption[currentquestion] === option}
                />
                <label htmlFor={index}>{option}</label>
              </div>
            ))}
            <div className="button-container">
              <button onClick={handleGoBack} disabled={currentquestion === 0}>
                Previous
              </button>
              <button
                onClick={handleAnswerClick}
                disabled={
                  !selectedOption[currentquestion] ||
                  (currentquestion === Qbank.length - 1 &&
                    !Qbank.every((_, i) => selectedOption[i]))
                }
                className="quiz-button"
              >
                {currentquestion === Qbank.length - 1 ? "Finish" : "Submit"}
              </button>
              <button
                onClick={handleGoNext}
                disabled={currentquestion === Qbank.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="score-container">
            <h3 className="score-message">Your Score is : {score}</h3>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Your Name .........."
            />
            <div className="save-buttons">
              <button onClick={saveScore}>Save Score</button>
              <button onClick={handleGoToMainPage}>Go to Main Page</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Showpage;
