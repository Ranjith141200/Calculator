const display = document.getElementById('display');
let currentInput = '';
let operator = null;
let previousInput = '';

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'clear') {
            clear();
        } else if (value === '=') {
            calculate();
        } else if (['+', '-', '*', '/'].includes(value)) {
            setOperator(value);
        } else {
            appendNumber(value);
        }
    });
});

function appendNumber(number) {
    if (currentInput.length < 12) { // Limiting the input length for display
        currentInput += number;
        updateDisplay(currentInput);
    }
}

function setOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') calculate();

    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay(currentInput);
}

function clear() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay('0');
}

function updateDisplay(value) {
    display.innerText = value;
}
