import React from "react";
import { useState } from "react";
import validator from "validator";
import "./CreditCardNumberValidator.css";
function CreditCardNumberValidator() {
  const [cardNumber, setCardNumber] = useState("");
  const [alertMsg, setalertMsg] = useState("");
  const [inputFieldDisabled, setInputFieldDisabled] = useState(false);

  const handleChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    if (input.length === 16) {
      setInputFieldDisabled(true);
    }
    let formattedInput = "";
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedInput += " ";
      }
      formattedInput += input[i];
    }
    setCardNumber(formattedInput);

    const valid = validator.isCreditCard(input);
    setalertMsg(
      valid ? "Valid Credit Card Number" : "Invalid Credit Card Number"
    );
  };

  const handleReset = () => {
    setInputFieldDisabled(false);
    setCardNumber("");
    setalertMsg("");
  };
  return (
    <div className="container">
      <div className="box">
        <h1 className="title">Credit Card Number Validator</h1>
        <div className="input-wrapper">
          {" "}
          <input
            type="text"
            name="cardNumber"
            value={cardNumber}
            onChange={handleChange}
            disabled={inputFieldDisabled}
          />
        </div>

        <h3
          className={`message ${
            alertMsg.includes("Valid") ? "valid" : "invalid"
          }`}
        >
          {cardNumber.length !== 0 && alertMsg}
        </h3>
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default CreditCardNumberValidator;
/*
You type 1
e.target.value is "1".
input = e.target.value.replace(/\D/g, "") → removes non-digit characters.
Here, "1" stays "1".
*/
