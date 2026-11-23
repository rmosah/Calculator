// Get the display input element
const display = document.getElementById("display");

// Track whether a result is currently displayed
let isResultDisplayed = false;

// Append a digit to the display
function appendNumber(number) {
    // Clear previous error or calculation result before typing a new number
    if (display.value === "Error" || isResultDisplayed) {
        display.value = "";
        isResultDisplayed = false;
    }
    display.value += number;
}

// Append a decimal point
function appendDecimal() {
    if (display.value === "Error" || isResultDisplayed) {
        display.value = "0.";
        isResultDisplayed = false;
        return;
    }

    // Split by operators to check the current number only
    const parts = display.value.split(/[\+\-\*\/]/);
    const currentNumber = parts[parts.length - 1];

    if (!currentNumber.includes(".")) {
        if (currentNumber === "") {
            display.value += "0.";
        } else {
            display.value += ".";
        }
    }
}

// Append an arithmetic operator (+, -, *, /)
function appendOperator(operator) {
    if (display.value === "Error") {
        display.value = "";
        return;
    }

    isResultDisplayed = false;
    const currentText = display.value;

    // Prevent starting with an operator except minus
    if (currentText === "" && operator !== "-") {
        return;
    }

    // Replace the last operator if the user clicks another operator right away
    const lastChar = currentText.slice(-1);
    if (lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/") {
        display.value = currentText.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
}

// Clear the entire display (C button)
function clearDisplay() {
    display.value = "";
    isResultDisplayed = false;
}

// Delete the last character (⌫ button)
function deleteLast() {
    if (display.value === "Error") {
        display.value = "";
        return;
    }
    display.value = display.value.slice(0, -1);
}

// Calculate and show the result (= button)
function calculateResult() {
    const expression = display.value;

    if (expression === "" || expression === "Error") {
        return;
    }

    try {
        // Check for division by zero
        if (/\/0+(?![0-9.])/.test(expression)) {
            display.value = "Error";
            isResultDisplayed = true;
            return;
        }

        // Evaluate the mathematical expression
        let result = eval(expression);

        // Validate that the result is a finite number
        if (!isFinite(result) || isNaN(result)) {
            display.value = "Error";
        } else {
            // Round long floating-point decimals
            display.value = Math.round(result * 100000000) / 100000000;
        }
        isResultDisplayed = true;

    } catch (error) {
        // Show Error for incomplete or invalid expressions
        display.value = "Error";
        isResultDisplayed = true;
    }
}