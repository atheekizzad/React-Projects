import React from "react";
import { useState } from "react";
import Button from "./Button";
import styled from "styled-components";

function Dogs() {
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
  const IMG = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 12px;
    margin-top: 20px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
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
  const [dog, setDog] = useState("");
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
  const handleClick = () => {
    setDog("");
  };
  return (
    <Body>
      <Title>Here’s a Random Dog for You!</Title>
      <Button callApi={Dogsget} name="Dog Image"></Button>
      {dog && (
        <>
          <IMG src={dog} />
          <ResetButton onClick={handleClick}>Reset</ResetButton>
        </>
      )}
    </Body>
  );
}

export default Dogs;
