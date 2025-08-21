import './style.css'

let firstNumber = 2;
let secondNumber = 3;
let operation = '+'
let result = null;

// update input area 
function updateInputDisplay() {
    document.querySelector('#input').innerHTML = `${firstNumber} ${operation} ${secondNumber}`
    document.querySelector('#input').className = 'Display'
}

function setOperation(op) {
  operation = op; // e.g. "+" when the user clicks the plus button
    updateInputDisplay();
}

// Listener for calculator operations
document.querySelectorAll('.calculatorButton').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.id; // Get the id of the button clicked
    if (['+', '-', '*', '/'].includes(value)) {
      setOperation(value);
    } else if (!isNaN(value) || value === '.') {
      // If it's a number or a decimal point, update the display
      document.querySelector('#input').innerHTML += value;
    }
    return;
  });
});

// Clear inputs
document.querySelector('#clear').addEventListener('click', () => {
    firstNumber = 0;
    secondNumber = 0;
    operation = '+';
    result = null;
    document.querySelector('#input').innerHTML = '';
    document.querySelector('#output').innerHTML = '';
    document.querySelector('#input').className = 'Display muted';
})


// Function to handle the calculation logic
function calculate() {
  if (operation === null || firstNumber === null || secondNumber === null) {
    console.error("Something is missing...");
    return;
  }

  switch (operation) {
    case "+":
      result = firstNumber + secondNumber;
      break;
    case "-":
      result = firstNumber - secondNumber;
      break;
    case "*":
      result = firstNumber * secondNumber;
      break;
    case "/":
      result = firstNumber / secondNumber;
      break;
  }

  console.log("Result:", result);
}


// Click event for submit
document.querySelector('.submitButton').addEventListener('click', () => {
    calculate();
    
    // Update the display area
    updateInputDisplay();
    document.querySelector('#output').innerHTML = `= ${result}`
    document.querySelector('#input').className = 'Display muted'
})