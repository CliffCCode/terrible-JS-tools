let firstNumber = 0;
let secondNumber = 0;
let operation = '+'
let result = null;

window.onload = () => {
    machine.dispatchEvent('clear');
}

// TODO: Remove 2nd display
const machine = {
  state: "RESET",
  transitions: {
    RESET: {
      clear: function() {
        console.log("Clearing calculator...");
        firstNumber = 0;
        secondNumber = 0;
        operation = '+';
        result = null;
        this.changeState('FIRST');
        document.querySelector('#input').className = 'Display'
        updateInputDisplay();
      },
    },
    FIRST: {
      handleNumberInput: handleNumberInput,
      setOperation: setOperation,
      reset: reset,
      calculate: calculate,

    },
    OPERATION: {
      reset: reset,
      calculate: calculate,
    },
    SECOND: {
      handleNumberInput: handleNumberInput,
      setOperation: setOperation,
      reset: reset,
      calculate: calculate,
    },
    RESULT: {
      handleNumberInput: handleNumberInput,
      calculate: calculate,
      reset: reset,
    },
  },

  dispatchEvent(actionName, ...payload) {
    // const actions = this.transitions[this.state];
    const action = this.transitions[this.state][actionName];

    if (action) {
      action.apply(machine, ...payload);
    } else {
      // No action found for this event in the current state
      console.log(`No action for event ${actionName} in state ${this.state}`);
    }
  },
  changeState(newState) {
    this.state = newState;
    console.log(`State changed to: ${this.state}`);
  }
};

// Number button press
function handleNumberInput(num,) {
  if (this.state === 'FIRST') {
      firstNumber = parseInt(`${firstNumber}${num}`);
  } else if (this.state === 'SECOND') {
      secondNumber = parseInt(`${secondNumber}${num}`);
  } else if (this.state === 'RESULT') {
    machine.dispatchEvent('reset');
    firstNumber = parseInt(`${firstNumber}${num}`);
  }
  updateInputDisplay();
}

// update input area 
function updateInputDisplay() {
    document.querySelector('#input').innerHTML = `${firstNumber} ${operation} ${secondNumber}`
    
}

function setOperation(op) {
  operation = op; // e.g. "+" when the user clicks the plus button
  updateInputDisplay();
  this.changeState('SECOND');
}

function reset() {
  this.changeState('RESET');
  machine.dispatchEvent('clear');
}


// Input handling
// Number inputs
document.querySelectorAll('.number').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.innerHTML; // Get the id of the button clicked
    machine.dispatchEvent('handleNumberInput', [value]);
  });
});

// operator inputs
document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.id; // Get the id of the button clicked
    console.log("Operator input:", value);
    machine.dispatchEvent('setOperation', [value]);
  });
});

// equals input
document.querySelector('.submitButton').addEventListener('click', () => {
  machine.dispatchEvent('calculate');
});

// Clear inputs
document.querySelector('#clear').addEventListener('click', () => {
  machine.dispatchEvent('reset');
  machine.dispatchEvent('clear');
});

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
  updateInputDisplay();
  document.querySelector('#output').innerHTML = `= ${result}`;
  document.querySelector('#input').className = 'Display muted';
  this.changeState('RESULT');
}