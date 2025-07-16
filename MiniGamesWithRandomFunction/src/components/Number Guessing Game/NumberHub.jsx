import React, { useState, useEffect, useRef } from "react";
import "./Numberhub.css";

function NumberHub() {
  const [inputNumb, setinputNumb] = useState("");
  const [secretNumb, setSecretNumb] = useState("");
  const [results, setResults] = useState("");
  const [disable, setDisable] = useState(false);
  const [correctScore, setCorrectScore] = useState(0);
  const [wrongScore, setWrongScore] = useState(0);
  const inputRef = useRef(null);
  useEffect(() => {
    secretNumberGen();
  }, []);
  useEffect(() => {
    if (correctScore === 5) {
      alert("You have won the game");
      handleReset();
    } else if (wrongScore === 5) {
      alert("You have lose the game Bad luck!");
      handleReset();
    }
  }, [correctScore, wrongScore]);

  const handlechange = (e) => {
    setinputNumb(e.target.value);
    setDisable(false);
  };

  const secretNumberGen = () => {
    const dbNum = Math.floor(Math.random() * 20 + 1);
    setSecretNumb(dbNum);
    console.log(dbNum);
  };

  const resetAfterDelay = () => {
    setDisable(true);
    setTimeout(() => {
      secretNumberGen();
      setDisable(false);
      setinputNumb("");
      inputRef.current?.focus();
    }, 4000);
  };
  const handleCheck = () => {
    const guess = Number(inputNumb);
    const secret = Number(secretNumb);

    let output;

    if (isNaN(guess) || guess < 1 || guess > 20) {
      output = "invalid";
    } else if (guess === secret) {
      output = "correct";
    } else if (guess > secret) {
      output = "higher";
    } else if (guess < secret) {
      output = "lower";
    }

    switch (output) {
      case "correct":
        setResults("Perfect Guess! BRAVO! 🎉");
        setCorrectScore((score) => score + 1);
        resetAfterDelay();
        break;
      case "higher":
        setResults("Your guess is higher than the secret number.");
        setWrongScore((score) => score + 1);
        resetAfterDelay();
        break;
      case "lower":
        setResults("Your guess is lower than the secret number.");
        setWrongScore((score) => score + 1);
        resetAfterDelay();
        break;
      case "invalid":
        setResults("Please enter a valid number between 1 and 20.");
        break;
      default:
        setResults("Try Again");
    }
  };

  const handleReset = () => {
    setinputNumb("");
    setResults("");
    setCorrectScore(0);
    setWrongScore(0);
    inputRef.current?.focus();
  };
  return (
    <div className="number-hub">
      <label htmlFor="numb">Enter the number</label>
      <input
        ref={inputRef}
        type="number"
        id="numb"
        name="input"
        value={inputNumb}
        onChange={handlechange}
        min="1"
        max="20"
        required
      />
      {!disable && (
        <button onClick={handleCheck} disabled={disable}>
          Check
        </button>
      )}
      {disable && <h3>{results}</h3>}
      {disable && <h2>Secret Number is : {secretNumb}</h2>}
      {!disable && <button onClick={handleReset}>Reset</button>}
      <div className="score">
        <span>✅ {correctScore}</span>
        <span> / </span>
        <span>❌ {wrongScore}</span>
      </div>
    </div>
  );
}

export default NumberHub;
