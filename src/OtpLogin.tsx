import React, { useEffect, useRef, useState } from "react";

export const OtpLogin = ({ length, onOtpSubmit }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef(Array(length).fill(""));

  console.log(inputRefs);

  const submitOtp = (updatedOtp) => {
    if (updatedOtp.length === length) {
      onOtpSubmit(updatedOtp);
    }
  };

  const handleChange = (e, index) => {
    console.log(e, index);
    const val = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = val && val.substring(val.length - 1);
    setOtp(newOtp);

    // set focus to next empty element
    const emptyIndex = inputRefs.current.findIndex((el) => el.value === "");

    console.log(emptyIndex);

    if (emptyIndex >= 0) {
      inputRefs.current[emptyIndex].focus();
    }

    // submit otp
    let combinedOtp = newOtp.join("");

    submitOtp(combinedOtp);
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Backspace") {
      if (index > 0 && !otp[index] && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <form>
      {otp &&
        otp.map((val, index) => {
          return (
            <input
              type="text"
              key={index}
              value={val}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyPress(e, index)}
              className="otp-box"
              ref={(input) => (inputRefs.current[index] = input)}
            />
          );
        })}
    </form>
  );
};
