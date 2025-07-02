import React from "react";
import styled from "styled-components";

function Button(props) {
  const Buffers = styled.button`
    margin-top: 10px;
    display: inline-block;
    padding: 12px 28px;
    background: linear-gradient(rgb(252, 9, 94));
    color: #fff;
    border: none;
    font-size: 24px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 600;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(230, 0, 115, 0.3);
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background: linear-gradient(#e60073);
      box-shadow: 0 6px 16px rgba(230, 0, 115, 0.45);
      transform: translateY(-2px);
    }

    &:active {
      background: linear-gradient(135deg, #99004d, #cc0066);
      transform: scale(0.98);
    }
  `;
  return (
    <div>
      <Buffers onClick={props.callApi}>Click to Generate {props.name}</Buffers>
    </div>
  );
}

export default Button;
