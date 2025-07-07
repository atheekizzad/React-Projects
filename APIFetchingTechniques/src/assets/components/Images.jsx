import React from "react";
import { useState } from "react";
import Button from "./Button";
import styled from "styled-components";

function Images() {
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
  const IMG = styled.img`
  width:30px'
  height:30px`;

  const [dog, setDog] = useState();
  const url = "https://dog.ceo/api/breeds/image/random";

  async function Dogsget() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      setDog(data.message);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Body>
      <Button callApi={Dogsget} name="dog"></Button>
      <IMG src={dog} />
    </Body>
  );
}

export default Images;
