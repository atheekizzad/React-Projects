import React, { useEffect, useState } from "react";
import "./Game.css";
function Game() {
  const optionsArray = ["Rock 🪨", "Paper 📄", "Scissor ✂️"];
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [YourScore, setYourScore] = useState(0);
  const [ComputerScore, setComputerScore] = useState(0);
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);
  const [previousResults, setPreviousResults] = useState([]);
  const [gameEnd, setGameEnd] = useState(false);
  const [winnerAnnouncement, setWinnerAnnouncement] = useState("");
  // Choose the winner
  const determineWinner = (player, computer) => {
    if (player === computer) {
      return "draw";
    }
    if (
      (player === "Rock 🪨" && computer === "Scissor ✂️") ||
      (player === "Paper 📄" && computer === "Rock 🪨") ||
      (player === "Scissor ✂️" && computer === "Paper 📄")
    ) {
      return player;
    } else {
      return computer;
    }
  };

  const AnnouncetheWinner = (scoreofPlayer, scoreofComputer) => {
    setGameEnd(true);
    if (scoreofComputer > scoreofPlayer) {
      setWinnerAnnouncement("Computer Won the Game 🏆");
    } else {
      setWinnerAnnouncement("You won the Game 🏆");
    }
  };

  const handleClick = (choice) => {
    setLoading(true);
    setPlayerChoice(choice);
    const computerChoiceRandom =
      optionsArray[Math.floor(Math.random() * optionsArray.length)];
    setComputerChoice(computerChoiceRandom);
    const winner = determineWinner(choice, computerChoiceRandom);
    let resultsTextforLog = "";
    if (winner === choice) {
      setYourScore((prev) => prev + 1);
      setResults("You Won 🏆 | 💀 I will kill you ");
      resultsTextforLog = "You Won 🏆";
    } else if (winner === computerChoiceRandom) {
      setComputerScore((prev) => prev + 1);
      setResults("You Lost 💀 | 🧑 Don't Come my way next time");
      resultsTextforLog = "You Lost 💀";
    } else {
      setResults("It's a tie 🤝 | Damnnnnnnnnn.... it");
      resultsTextforLog = "It's a tie 🤝";
    }

    setTimeout(() => {
      setPlayerChoice("");
      setComputerChoice("");
      setResults("");
      setLoading(false);
      setPreviousResults((prev) => [
        ...prev,
        `You ${choice} & Computer ${computerChoiceRandom} | ${resultsTextforLog}`,
      ]);
    }, 2000);
  };
  useEffect(() => {
    if (previousResults.length === 5) {
      AnnouncetheWinner(YourScore, ComputerScore);
    }
  }, [previousResults]);

  const handleReset = () => {
    setComputerChoice("");
    setComputerScore(0);
    setPlayerChoice("");
    setYourScore(0);
    setPreviousResults([]);
    setLoading(false);
  };
  const handlePlayAgain = () => {
    handleReset();
    setGameEnd(false);
  };
  return (
    <div className="game">
      <h2 className="loading-text">
        🕒 Rock... Paper... Scissors... Shoot!🎮😄
      </h2>
      {!gameEnd ? (
        <>
          <div className="buttons">
            {optionsArray.map((option, index) => {
              return (
                <button
                  className="game-button"
                  onClick={() => handleClick(option)}
                  key={index}
                  disabled={loading}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <div className="game-info">
            <h3>Your Choice 🧑: {playerChoice}</h3>
            <h3>Computer Choose 🤖 : {computerChoice}</h3>
            <h3>Your Score 🧮 : {YourScore}</h3>
            <h3>Computer Score 💻 : {ComputerScore}</h3>
            {results && <h2>{results}</h2>}
          </div>
          <button onClick={handleReset} disabled={previousResults.length === 0}>
            Reset
          </button>
          <div className="previous-outcomes">
            <h2>Previous Outcomes</h2>
            {previousResults.length === 0 ? (
              <h3>No records</h3>
            ) : (
              <ul>
                {previousResults.map((previousResult, index) => {
                  return (
                    <li key={index}>
                      Round :{index + 1} {previousResult}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </>
      ) : (
        <>
          <h3>{winnerAnnouncement}</h3>
          <button onClick={handlePlayAgain}>Play Again</button>
        </>
      )}
    </div>
  );
}

export default Game;
