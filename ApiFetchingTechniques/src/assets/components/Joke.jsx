import React, { useState } from "react";
import Button from "./Button";
import styled from "styled-components";

function Joke() {
  const Body = styled.div`
    background-color: rgb(165, 7, 65);
    width: auto;
    height: auto;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: beige;

    /* Rounded edges */
    border-radius: 15px;

    /* Shadow effect */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `;
  const Part = styled.p`
    text-align: center;
    color: beige;
  `;

  const [joke, setjoke] = useState("");
  const url = "https://sv443.net/jokeapi/v2/joke/Programming?type=single";
  async function getJoke() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      setjoke(data.joke);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Body>
      <Button callApi={getJoke} name="joke"></Button>
      <Part>{joke}</Part>
    </Body>
  );
}

export default Joke;
