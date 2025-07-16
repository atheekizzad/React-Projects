import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import bg from "../assets/Preview.jpg";
// Import image
function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Mini Game Center</h1>

      <Link className="link-button" to="/coin_flip">
        Coin Flip
      </Link>
      <Link className="link-button" to="/number_guess">
        Number Guess
      </Link>
      <Link className="link-button" to="/roll_dice">
        Roll Dice
      </Link>
    </div>
  );
}

export default Home;
