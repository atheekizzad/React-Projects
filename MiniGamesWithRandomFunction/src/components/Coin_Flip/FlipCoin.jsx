import React, { useEffect, useState } from "react";
import Coin from "./Coin";
import "./FlipCoin.css";

function FlipCoin() {
  const resultsArray = ["head", "tail"];
  const [side, setSide] = useState("head");
  const [toss, setToss] = useState(false);
  const [headScore, setHeadScore] = useState(0);
  const [tailScore, setTailscore] = useState(0);

  const flip = () => {
    setToss(true);
    setTimeout(() => {
      const output =
        resultsArray[Math.floor(Math.random() * resultsArray.length)];
      setSide(output);
      if (output === "head") {
        setHeadScore((prev) => prev + 1);
      } else {
        setTailscore((prev) => prev + 1);
      }
      setToss(false);
    }, 1000);
  };

  useEffect(() => {
    if (headScore === 5) {
      alert("you have won the game ");
      setHeadScore(0);
      setTailscore(0);
    } else if (tailScore === 5) {
      alert("Bad Luck");
      setHeadScore(0);
      setTailscore(0);
    }
  }, [headScore, tailScore]);
  return (
    <div className="flip-container">
      <div className="new">
        <Coin face={side} rotate={toss}></Coin>
      </div>
      <button
        onClick={flip}
        className={`flip-button ${toss ? "tossing" : "idle"}`}
        disabled={toss}
      >
        {toss ? "Tossing" : "Click to Toss"}
      </button>{" "}
      <button
        className="reset-button"
        onClick={() => {
          setHeadScore(0);
          setTailscore(0);
        }}
      >
        Reset
      </button>
      {(headScore !== 0 || tailScore !== 0) && (
        <div className="score-container">
          <h3 className="score-head">
            Heads <span className="icon">🪙</span> : {headScore}
          </h3>
          <h3 className="score-tail">
            Tails <span className="icon">🐍</span> : {tailScore}
          </h3>
        </div>
      )}
    </div>
  );
}

export default FlipCoin;
