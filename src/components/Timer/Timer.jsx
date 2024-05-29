import React, { useState } from "react";
import "./Timer.css";

function Timer() {
  const [fNumber, setFnumber] = useState(0);
  const [sNumber, setSnumber] = useState(0);
  const [output, setOutput] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNumberChange = (e, setter) => {
    const value = e.target.value;
    setOutput(null); // Reset output
    setErrorMessage("");
    setter(value); // Update number state
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
  };

  return (
    <>
      <div style={{ position: "relative", top: "2rem" }}>
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
              className="btn-size"
              onClick={() => handleOperation(operator)}
            >
              {operator}
            </button>
          ))}
        </div>
      </div>
      {errorMessage && (
        <div style={{ marginTop: "5rem", textAlign: "center", color: "red" }}>
          <h3>{errorMessage}</h3>
        </div>
      )}
      {output !== null && !errorMessage ? (
        <div style={{ marginTop: "5rem", textAlign: "center" }}>
          <h3 style={{ color: "black" }}>Result: {output}</h3>
        </div>
      ) : (
        !errorMessage && (
          <h3 style={{ marginTop: "5rem", textAlign: "center" }}>
            Perform an operation
          </h3>
        )
      )}
    </>
  );
}

export default Timer;
