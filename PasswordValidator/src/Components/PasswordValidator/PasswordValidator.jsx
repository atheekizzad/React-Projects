import React, { useState } from "react";
import validator from "validator";
import styled from "styled-components";

// Add this styled component:
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
  width: ${(props) => (props.strong ? "100%" : "40%")};
  background-color: ${(props) => (props.strong ? "green" : "red")};
  border-radius: 5px;
  transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out;
`;
function PasswordValidator() {
  const [password, setpassword] = useState("");
  const [Msg, setMsg] = useState("");
  const [strong, setStrong] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const HandleChange = (e) => {
    const passwordNow = e.target.value;
    setpassword(passwordNow);

    const valid = validator.isStrongPassword(passwordNow, {
      minLength: 8, // At least 8 characters
      minLowercase: 1, // At least one lowercase letter
      minUppercase: 1, // At least one uppercase letter
      minNumbers: 1, // At least one number
      minSymbols: 1, // At least one special character
    });
    setStrong(valid);
    setMsg(valid ? "It is a Strong Password" : "It is a Weak One");
  };
  return (
    <Container>
      <Box>
        <Title>
          Check your Password Strength here using Validator with Fixed Strength
          Score
        </Title>
        <Label htmlFor="pass">Enter your Password </Label>
        <InputWrapper>
          {" "}
          <Input
            id="pass"
            name="password"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={HandleChange}
            placeholder="Check your password here"
          />
          <ToggleButton onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? "🙈" : "👁️"}
          </ToggleButton>
        </InputWrapper>

        {password && <Message strong={strong}>{Msg} </Message>}
        {password && (
          <StrengthBarContainer>
            <StrengthBar strong={strong} />
          </StrengthBarContainer>
        )}
      </Box>
    </Container>
  );
}

export default PasswordValidator;
