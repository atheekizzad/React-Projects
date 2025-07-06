import React from "react";
import styled from "styled-components";

function Button(props) {
  const Buffers = styled.button`
    margin-top: 10px;
    display: inline-block;
    padding: 10px 20px 10px 30px;
    background-color: rgb(242, 0, 89);
    color: #ffffff;
    border: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.5s;
    &:hover {
      background-color: rgb(114, 1, 24);
    }
    &:active {
      background-color: rgb(255, 0, 128);
    }
  `;
  return (
    <div>
      <Buffers onClick={props.callApi}>Generate Here {props.name}</Buffers>
    </div>
  );
}

export default Button;
