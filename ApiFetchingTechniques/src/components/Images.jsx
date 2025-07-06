import React, { useState } from "react";
import styled from "styled-components";

const Body = styled.div`
  background-color: #a50741;
  color: #f5e9e8;
  width: 100%;
  max-width: 280px;
  height: 350px; /* fixed height */
  margin: 20px auto;
  padding: 30px 25px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(165, 7, 65, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* space out button and text */
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const IMG = styled.img`
  width: 230px; // fixed width
  height: 210px; // fixed height
  object-fit: cover; // fill the box while maintaining aspect ratio
  border-radius: 10px;
  box-shadow: 0 4px 100px rgba(255, 255, 255, 0.2);
`;

const StyledButton = styled.button`
  background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
  border: none;
  color: white;
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(255, 65, 108, 0.5);
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #ff4b2b 0%, #ff416c 100%);
    box-shadow: 0 8px 16px rgba(255, 75, 43, 0.7);
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 0 4px 8px rgba(255, 65, 108, 0.6);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 65, 108, 0.7);
  }
`;

function Images() {
  const [dog, setDog] = useState(null);
  const url = "https://dog.ceo/api/breeds/image/random";

  async function Dogsget() {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`${response.status}`);
      const data = await response.json();
      setDog(data.message);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Body>
      <StyledButton onClick={Dogsget}>Get Dog</StyledButton>
      {dog && <IMG src={dog} alt="A random dog" />}
    </Body>
  );
}

export default Images;
