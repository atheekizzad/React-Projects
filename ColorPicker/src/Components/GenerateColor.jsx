import React, { useEffect, useState } from "react";
import Colorbox from "./Colorbox";
import "../Css/GenerateColor.css";
import NameChecker from "./NameChecker";

function GenerateColor() {
  const [colors, setColors] = useState([]);
  const [numberOfColors, setNumberOfColors] = useState(28);
  const [rgbValue, setRGBValue] = useState("");

  const colorGenratorRGB = () => {
    const red = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const gencolor = `rgb(${red},${green},${blue})`;

    return gencolor;
  };

  const colorupdate = (num) => {
    const newcolors = [];
    for (let i = 0; i < num; i++) {
      newcolors.push(colorGenratorRGB());
    }
    setColors(newcolors);
  };
  useEffect(() => {
    if (numberOfColors > 0) {
      colorupdate(numberOfColors);
    }
  }, [numberOfColors]);

  const handleClick = (index) => {
    setColors((prevColors) => {
      const shallowCopy = [...prevColors];
      let newcolor;
      //Always runs the code inside do { ... } at least once.
      // After running, it checks the condition in while (...).
      // If the condition is true, it repeats the loop.
      // If the condition is false, it stops.
      do {
        newcolor = colorGenratorRGB();
      } while (newcolor === shallowCopy[index]);
      shallowCopy[index] = newcolor;
      setRGBValue(shallowCopy[index]);
      return shallowCopy;
    });
  };

  return (
    <div>
      <h1>
        <i className="fas fa-palette"></i> Color Palette
      </h1>
      <label>
        <i className="fas fa-list-ol"></i> Enter the Number of Palette You want
        to See ......
      </label>
      <input
        type="number"
        value={numberOfColors}
        onChange={(e) => setNumberOfColors(Number(e.target.value))}
        min="1"
      />
      {rgbValue && <NameChecker rgb={rgbValue}></NameChecker>}
      <div className="color-box-container">
        {colors.map((color, index) => {
          return (
            <div key={index}>
              <button
                onClick={() => handleClick(index)}
                onMouseEnter={() => setRGBValue(color)}
              >
                <Colorbox color={color}></Colorbox>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GenerateColor;
