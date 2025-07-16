import React, { useState } from "react";
import "./Coin.css";
import Head from "../../assets/Head.png";
import Tail from "../../assets/Tail.png";

const flipsresults = {
  head: Head,
  tail: Tail,
};
function Coin(props) {
  const face = props.face;
  const rotate = props.rotate;

  return (
    <div className="coin-container">
      <img
        src={flipsresults[face]}
        className={`coin ${rotate ? "rotate-now" : ""}`}
      />
    </div>
  );
}

export default Coin;
