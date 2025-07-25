import React, { useState } from "react";
import Button from "./Button";
import styled from "styled-components";

function QuotesS() {
  const Body = styled.div`
    background-color: #2d2d2d;
    max-width: 600px;
    margin: 40px auto;
    padding: 30px 40px;
    border-radius: 20px;
    color: #fdfdfd;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    transition: all 0.3s ease-in-out;
  `;
  const Part = styled.p`
    margin-top: 25px;
    font-size: 18px;
    line-height: 1.6;
    text-align: center;
    color: #f5f5f5;
    background-color: #3a3a3a;
    padding: 20px 25px;
    border-radius: 12px;
    box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.05);
  `;
  const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    color: #ff4d94;
    text-align: center;
  `;
  const ResetButton = styled.button`
    margin-top: 20px;
    padding: 10px 24px;
    background-color: transparent;
    color: #ff4d94;
    border: 2px solid #ff4d94;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #ff4d94;
      color: #fff;
      transform: translateY(-1px);
    }

    &:active {
      transform: scale(0.98);
      background-color: #cc0066;
      border-color: #cc0066;
    }
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
  const handleClick = () => {
    setQuote("");
  };

  return (
    <Body>
      <Title>Chill with cool advice</Title>
      <Button callApi={getQ} name="Quote"></Button>
      {Quote && (
        <>
          <Part>{Quote}</Part>
          <ResetButton onClick={handleClick}>Reset</ResetButton>
        </>
      )}
    </Body>
  );
}

export default QuotesS;
