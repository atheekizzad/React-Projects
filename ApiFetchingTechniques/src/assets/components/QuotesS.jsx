import React, { useState } from "react";
import Button from "./Button";
import styled from "styled-components";

function QuotesS() {
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
  const [Quote, setQuote] = useState("");
  const url = `https://api.adviceslip.com/advice?timestamp=${new Date().getTime()}`;
  async function getQ() {
    try {
      const response = await fetch(url);
      const data = await response.json();

      setQuote(data.slip.advice);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Body>
      <Button callApi={getQ} name="Quote"></Button>
      <p>{Quote}</p>
    </Body>
  );
}

export default QuotesS;
