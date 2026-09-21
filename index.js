
// Access reference of elements

const textArea = document.querySelector(".textArea");
const buttons = document.querySelector(".buttons");

// Calculator state

let operator = "";
let firstNumber = null;
let secondNumber = "";


// Button click

buttons.addEventListener("click", (event) => {

    const value = getButtonValue(event);

    // Ignore clicks that are not buttons
    if (event.target.tagName !== "BUTTON") {
        return;
    }


    // Number or decimal

    if (!isOperator(value) && !isEqual(value)) {

        // Decimal point
        if (value === ".") {

            if (!secondNumber.includes(".")) {
                secondNumber += value;
                updateDisplay(value);
            }

        } else {

            secondNumber += value;
            updateDisplay(value);
        }

    }


    // Operator

    else if (isOperator(value)) {

        // If user enters a number first
        if (secondNumber !== "") {

            firstNumber = parseFloat(secondNumber);
            secondNumber = "";

        }

        operator = value;

        textArea.value = firstNumber + operator;
    }


    // Equal

    else if (isEqual(value)) {

        if (
            firstNumber !== null &&
            secondNumber !== "" &&
            operator !== ""
        ) {

            const result = calculate(
                firstNumber,
                secondNumber,
                operator
            );

            textArea.value = result;

            // Result becomes first number
            firstNumber = result;

            // Reset second number
            secondNumber = "";

            // Reset operator
            operator = "";
        }
    }

});


// Get button value

const getButtonValue = (event) => {

    return event.target.textContent;

};


// Update display

const updateDisplay = (value) => {

    textArea.value += value;

};


// Check operator

const isOperator = (value) => {

    const operators = ["+", "-", "×", "÷"];

    return operators.includes(value);

};


// Check equal

const isEqual = (value) => {

    return value === "=";

};


// Calculate

const calculate = (firstNumber, secondNumber, operator) => {

    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    if (operator === "+") {
        return num1 + num2;
    }

    else if (operator === "-") {
        return num1 - num2;
    }

    else if (operator === "×") {
        return num1 * num2;
    }

    else if (operator === "÷") {

        if (num2 === 0) {
            return "Error";
        }

        return num1 / num2;
    }

};


