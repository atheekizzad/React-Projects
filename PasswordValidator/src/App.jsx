import { useState } from "react";
import "./App.css";
import PasswordValidator from "./Components/PasswordValidator/PasswordValidator";
import PasswordValidatorwithRegex from "./Components/PasswordValidator/PasswordValidatorwithRegex";
import CreditCardNumberValidator from "./Components/CardNumberValidator/CreditCardNumberValidator";
import OtherValidator from "./Components/OtherValidators/OtherValidator";

function App() {
  return (
    <div className="App">
      <h2>Validation Techniques</h2>
      <div className="grid-container">
        <PasswordValidator />
        <PasswordValidatorwithRegex />
        <CreditCardNumberValidator />
        <OtherValidator />
      </div>
    </div>
  );
}

export default App;
