import React, { useState } from "react";
import { OtpLogin } from "./OtpLogin";
import "./styles.css";

export const App = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [showOtp, setShowOtp] = useState(false);

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const isValidNumber = (number) => {
    const regex = /^[0-9]+$/;

    console.log(number);
    console.log(regex.test(number));

    if (number.length < 10 || !regex.test(number)) {
      alert("phoneNumber is not valid!");
      return false;
    } else {
      return true;
    }
  };

  const handleKeyPress = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      if (isValidNumber(phoneNumber)) {
        setShowOtp(true);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidNumber(phoneNumber)) {
      setShowOtp(true);
    }
  };

  const handleOtpSubmit = (e) => {
    console.log("Login successful");
  };

  return (
    <>
      {!showOtp ? (
        <>
          <h1>LogIn with Mobile Number</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={phoneNumber}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              maxLength={10}
            />
            <button type="submit" onSubmit={handleSubmit}>
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          <div>Enter OTP received on {phoneNumber} </div>
          <OtpLogin length={4} onOtpSubmit={handleOtpSubmit} />
        </>
      )}
    </>
  );
};
