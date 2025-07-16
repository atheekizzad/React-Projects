import React, { useEffect, useState } from "react";
import Die from "./die";
import "./Rolldice.css";

function Rolldice() {
  const resultsArray = ["one", "two", "three", "four", "five", "six"];
  const faceToNumber = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
  };
  const [dieface1, setdieFace1] = useState("one");
  const [dieFace2, setdieFace2] = useState("three");
  const [rolled, setrolled] = useState(false);
  const [score, setScore] = useState(0);
  const [rollCount, setRollCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const roll = () => {
    if (gameOver || rolled) return;
    setrolled(true);
    setTimeout(() => {
      const die1 =
        resultsArray[Math.floor(Math.random() * resultsArray.length)];
      const die2 =
        resultsArray[Math.floor(Math.random() * resultsArray.length)];
      const sum = faceToNumber[die1] + faceToNumber[die2];
      const nowCount = rollCount + 1;
      const nowSum = score + sum;
      setdieFace1(die1);
      setdieFace2(die2);
      setScore(nowSum);
      setRollCount(nowCount);

      if (nowSum >= 60) {
        setTimeout(() => {
          alert(`You won! Good Luck : Score is ${nowSum}`);
          setGameOver(true);
        }, 2000);
      } else if (nowCount >= 10) {
        if (nowSum >= 60) {
          setTimeout(() => {
            alert(`You won! Good Luck : Score is ${nowSum}`);
            setGameOver(true);
          }, 2000);
        } else {
          setTimeout(() => {
            alert("Bad Luck! You lost the game.");
            setGameOver(true);
          }, 2000);
        }
      }
      setrolled(false);
    }, 1000);
  };

  const resetGame = () => {
    setRollCount(0);
    setScore(0);
    setdieFace1("one");
    setdieFace2("three");
    setGameOver(false);
  };

  return (
    <div className="RollDice">
      <div className="RollDice-container">
        <Die face={dieface1} rolling={rolled}></Die>
        <Die face={dieFace2} rolling={rolled}></Die>
      </div>
      <p className="score">Score: {score}</p>
      <p className="tries">Available Try: {10 - rollCount}</p>
      <button
        className={rolled ? "rolling" : "idle"}
        onClick={roll}
        disabled={rolled}
      >
        {rolled ? "Rolling" : "Roll Dice"}
      </button>
      <button onClick={resetGame} disabled={!gameOver}>
        Reset
      </button>
    </div>
  );
}

export default Rolldice;
