import React from "react";

function Colorbox(props) {
  const boxStyle = {
    backgroundColor: props.color,
    width: "170px",
    height: "170px",
    margin: "10px",
    display: "inline-block",
    borderRadius: "10px",
    transition: "background-color 0.5s ease",
  };

  return <div style={boxStyle}></div>;
}

export default Colorbox;
