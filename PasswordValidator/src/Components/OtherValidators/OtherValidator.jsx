import React from "react";
import { useState } from "react";
import validator from "validator";
import "./OtherValidator.css";
function OtherValidator() {
  const [input, setInput] = useState("");
  const [alertMsg, setalertMsg] = useState("");

  const handleChange = (e) => {
    const Content = e.target.value;
    setInput(Content);
  };

  const validation = (itemtype) => {
    let msg;
    let validstatus = false;

    switch (itemtype) {
      case "Email":
        validstatus = validator.isEmail(input);
        msg = validstatus ? "Valid Email" : "Invalid Email";
        break;
      case "URL":
        validstatus = validator.isURL(input);
        msg = validstatus ? "Valid URL" : "Invalid URL";
        break;
      case "PhoneNUmber":
        validstatus = validator.isMobilePhone(input, "en-US");
        msg = validstatus ? "Valid Number" : "Invalid Number";
        break;
      case "AlphaNumeric":
        validstatus = validator.isAlphanumeric(input);
        msg = validstatus ? "Valid Alphanumeric" : "Invalid Alphanumeric";
        break;
      case "UUID":
        validstatus = validator.isUUID(input);
        msg = validstatus ? "Valid UUID" : "Invalid UUID";
        break;
      case "Date":
        validstatus = validator.isDate(input);
        msg = validstatus ? "Valid Date" : "Invalid Date";
        break;
      default:
        msg = "Please provide input to Check";
    }
    setalertMsg(msg.toUpperCase());
  };

  return (
    <div className="other-container">
      {" "}
      <div className="other-box">
        <h3 className="title">Other Validating Techniques</h3>
        <input
          type="text"
          name="input"
          value={input}
          onChange={handleChange}
          placeholder="Validate Your Content Here ...."
        />
        <div className="other-buttons">
          {" "}
          <button onClick={() => validation("Email")}>Email Validation</button>
          <button onClick={() => validation("URL")}>URL Validation</button>
          <button onClick={() => validation("PhoneNUmber")}>
            Phone Number Validation
          </button>
          <button onClick={() => validation("AlphaNumeric")}>
            Alphanumeric Validation
          </button>
          <button onClick={() => validation("UUID")}>UUID Validation</button>
          <button onClick={() => validation("Date")}>Date Validation</button>
        </div>

        <h3 className={alertMsg.includes("VALID") ? "valid" : "invalid"}>
          {input.length !== 0 && alertMsg}
        </h3>
      </div>
    </div>
  );
}

export default OtherValidator;
//test@example.com
//https://subdomain.example.com
//123-456-7890
//hello2025
//123e4567-e89b-12d3-a456-426614174000
//2025-03-10
