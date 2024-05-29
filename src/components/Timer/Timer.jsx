import React, { useEffect, useState } from "react";
import "./Timer.css";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

function Timer() {
  const [fNumber, setFnumber] = useState(0);
  const [sNumber, setSnumber] = useState(0);
  const [output, setOutput] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  useEffect(() => {
    window.addEventListener("keydown", handleKeySupport);
  });
  const handleNumberChange = (e, setter) => {
    const value = e.target.value;
    setOutput(null); // Reset output
    setErrorMessage("");
    setter(value); // Update number state
    setCopySuccess(false);
  };

  const operations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => (b !== 0 ? a / b : null),
  };
  const handleOperation = (operator) => {
    const num1 = parseFloat(fNumber);
    const num2 = parseFloat(sNumber);

    // checking input to be number
    if (isNaN(num1) && isNaN(num2)) {
      setErrorMessage("Invalid input. Please enter valid message");
      return;
    }
    const result = operations[operator](num1, num2);

    // Check for division by zero
    if (operator === "divide" && num2 === 0) {
      setErrorMessage("Cannot divide by zero.");
      return;
    }
    setOutput(result);
    setCopySuccess(false);
  };
  const handleClearAll = () => {
    setFnumber(0);
    setSnumber(0);
    setOutput(null);
    setErrorMessage("");
  };

  const handleKeySupport = (e) => {
    console.log("INTO KEY SUPPORT");
    const key = e.key;
    if (key >= 0 && key <= 9) {
      if (fNumber === "") {
        console.log(key);
        setFnumber(key);
      } else if (sNumber === "" && output === null) {
        setSnumber(key);
      }
    }
  };

  const handleClipCopy = () => {
    navigator.clipboard
      .writeText(output)
      .then(() => {
        setCopySuccess(true);
      })
      .catch(() => {
        setCopySuccess(false);
      });
  };
  return (
      <div className="main-container">
        <div className="timer-container">
          <div className="input-container">
            <label htmlFor="firstnumber">First Number: </label>
            <input
              type="number"
              id="firstnumber"
              name="firstnumber"
              value={fNumber}
              onChange={(e) => handleNumberChange(e, setFnumber)}
              style={{ color: "inherit" }}
            />
          </div>
          <div className="input-container">
            <label htmlFor="secondname">Second Number: </label>
            <input
              type="number"
              id="secondname"
              name="secondname"
              value={sNumber}
              onChange={(e) => handleNumberChange(e, setSnumber)}
            />
          </div>
          <div className="operations">
            {Object.keys(operations).map((operator) => (
              <button
                key={operator}
                className="operation-btn"
                onClick={() => handleOperation(operator)}
              >
                {operator}
              </button>
            ))}
            <button className="clear-btn" onClick={handleClearAll}>
              Clear
            </button>
          </div>
        </div>
        <div>
          {errorMessage && (
            <div className="error-message">
              <h3>{errorMessage}</h3>
            </div>
          )}
          {output !== null && !errorMessage ? (
            <div className="result">
              <h3 style={{ color: "black" }}>Result: {output}</h3>
              <button onClick={handleClipCopy}>
                {!copySuccess ? "Copy" : "Copied"}
              </button>
            </div>
          ) : (
            !errorMessage && (
              <h3 >
                Perform an operation
              </h3>
            )
          )}
        </div>
      </div>
  );
}

export default Timer;
