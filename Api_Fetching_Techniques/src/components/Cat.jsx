import React from "react";
import { useState } from "react";
import Button from "./Button";
import styled from "styled-components";

function Cat() {
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

  const [cat, setCat] = useState();
  const fetchAPI = () => {
    fetch("https://api.thecatapi.com/v1/images/search")
      .then((res) => res.json())
      .then((data) => setCat(data[0].url));
  };
  const handleClick = () => {
    setCat("");
  };
  return (
    <Body>
      <Title>Is your random Cat lovely?</Title>
      <Button callApi={fetchAPI} name="cat"></Button>
      {cat && (
        <>
          {" "}
          <IMG src={cat} />
          <ResetButton onClick={handleClick}>Reset</ResetButton>
        </>
      )}
    </Body>
  );
}

export default Cat;
