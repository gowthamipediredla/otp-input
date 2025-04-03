import "./styles.css";
import React, { useState, useRef, useEffect } from "react";
const OTP_DIGITS_COUNT = 5;
export default function App() {
  const [inputArr, setInputArr] = useState(
    new Array(OTP_DIGITS_COUNT).fill("")
  );
  const refrr = useRef([]);
  useEffect(() => {
    refrr.current[0].focus();
  }, []);
  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    let newVal = value.trim();
    const arr = [...inputArr];
    arr[index] = newVal.slice(-1); // only keep latest element
    setInputArr(arr);
    if (newVal && index !== refrr.current.length - 1) {
      const nextIndex = index + 1;
      refrr.current[nextIndex].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      index !== 0 && refrr.current[index - 1].focus();
    }
  };
  return (
    <div className="App">
      <h1>OTP Input</h1>
      <div>
        {inputArr.map((input, index) => (
          <input
            type="text"
            className="otp-input"
            value={inputArr[index]}
            key={index}
            onChange={(e) => handleChange(index, e.target.value)}
            ref={(node) => (refrr.current[index] = node)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
    </div>
  );
}
