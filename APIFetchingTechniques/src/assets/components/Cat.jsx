import React from "react";
import { useState } from "react";
import Button from "./Button";
import styled from "styled-components";

function Cat() {
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
  const [cat, setCat] = useState();
  const fetchAPI = () => {
    fetch("https://api.thecatapi.com/v1/images/search")
      .then((res) => res.json())
      .then((data) => setCat(data[0].url));
  };
  return (
    <Body>
      <Button callApi={fetchAPI} name="cat"></Button>
      <IMG src={cat} />
    </Body>
  );
}

export default Cat;
