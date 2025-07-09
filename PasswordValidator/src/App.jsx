import { useState } from "react";
import "./App.css";
import PasswordValidator from "./Components/PasswordValidator";
import PasswordValidatorwithRegex from "./Components/PasswordValidatorwithRegex";

function App() {
  return (
    <div className="App">
      <h2>Validation Techniques</h2>
      <div className="grid-container">
        <PasswordValidator />
        <PasswordValidatorwithRegex />
      </div>
    </div>
  );
}

export default App;
