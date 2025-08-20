import React, { useState } from "react";
import styled from "styled-components";
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 270px; /* slightly wider than input width */
  margin: 10px auto;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  flex-grow: 1; /* take all remaining width */
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #007bff;
    box-shadow: 0px 0px 8px rgba(0, 123, 255, 0.5);
  }
`;

const ToggleButton = styled.button`
  margin-left: 10px;
  background: rgb(249, 7, 92);
  border: none;
  color: white;
  cursor: pointer;
  font-size: 20px;
  padding: 10px 14px;
  border-radius: 5px;

  &:hover {
    background: rgb(83, 246, 19);
  }
  outline: none;
`;

const Box = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(243, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 15px rgba(255, 0, 38, 0.3);
  }
`;
const Container = styled.div`
  text-align: center;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
`;

const Message = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  color: ${(props) => (props.strong ? "green" : "red")};
  transition: color 0.3s ease-in-out, transform 0.2s ease-in-out;

  /* Smooth pop-up effect when text changes */
  transform: ${(props) => (props.strong ? "scale(1.05)" : "scale(1)")};
`;

const StrengthBarContainer = styled.div`
  width: 270px;
  height: 8px;
  background: #eee;
  border-radius: 5px;
  margin: 8px auto 0 auto;
  overflow: hidden;
`;

// Actual colored bar
const StrengthBar = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${(props) => {
    if (props.width === 100) return "green";
    if (props.width >= 80) return "#ffa500"; // orange
    if (props.width >= 60) return "#ffcc00"; // yellow
    if (props.width >= 40) return "#ff6666"; // light red
    return "red"; // default (0–20%)
  }};
  border-radius: 5px;
  transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out;
`;
function PasswordValidatorwithRegex() {
  const [password, setpassword] = useState("");
  const [Msg, setMsg] = useState("");
  const [strong, setStrong] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [score, setScore] = useState(0);

  const validatePassword = (code) => {
    const minLength = code.length >= 8;
    const upperCase = /[A-Z]/.test(code);
    const lowerCase = /[a-z]/.test(code);
    const hasNumber = /[0-9]/.test(code);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(code);

    const rulesArray = [minLength, upperCase, lowerCase, hasNumber, hasSymbol];
    const rulespassedCount = rulesArray.filter(Boolean).length;
    setScore(rulespassedCount);
    console.log(rulespassedCount);

    return minLength && lowerCase && upperCase && hasNumber && hasSymbol;
  };
  const handlechange = (e) => {
    const passwordnow = e.target.value;
    setpassword(passwordnow);

    const valid = validatePassword(passwordnow);
    setStrong(valid);
    setMsg(valid ? "It is a Strong Password" : "It is a Weak One");
  };

  return (
    <Container>
      <Box>
        <Title>
          Check your Password Strength here using Regex with Dynamic Strength
          Score
        </Title>
        <Label htmlFor="pass">Enter your Password : </Label>
        <InputWrapper>
          {" "}
          <Input
            id="pass"
            name="password"
            value={password}
            type="password"
            onChange={handlechange}
            placeholder="Check your password here"
          />{" "}
          <ToggleButton onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? "🙈" : "👁️"}
          </ToggleButton>
        </InputWrapper>
        {password && <Message strong={strong}>{Msg} </Message>}
        {password && (
          <StrengthBarContainer>
            <StrengthBar width={(score * 100) / 5} />
          </StrengthBarContainer>
        )}
      </Box>
    </Container>
  );
}

export default PasswordValidatorwithRegex;
