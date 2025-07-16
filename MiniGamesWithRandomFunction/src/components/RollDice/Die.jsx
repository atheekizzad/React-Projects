import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from "@fortawesome/free-solid-svg-icons";
import "./Die.css";
const diceIcons = {
  one: faDiceOne,
  two: faDiceTwo,
  three: faDiceThree,
  four: faDiceFour,
  five: faDiceFive,
  six: faDiceSix,
};
function Die(props) {
  const face = props.face;
  const rolling = props.rolling;
  return (
    <div>
      <FontAwesomeIcon
        icon={diceIcons[face]}
        className={`Die ${rolling ? "Die-shaking" : ""}`}
      />
    </div>
  );
}

export default Die;
