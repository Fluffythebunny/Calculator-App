let display = document.querySelector('.display');
let currentValue = '0';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        if (shouldResetDisplay) {
            currentValue = '';
            shouldResetDisplay = false;
        }
        if (currentValue === '0') currentValue = '';
        currentValue += button.textContent;
        updateDisplay();
    });
});

document.querySelector('.decimal').addEventListener('click', () => {
    if (!currentValue.includes('.')) {
        currentValue += '.';
        updateDisplay();
    }
});

document.querySelector('.clear').addEventListener('click', () => {
    currentValue = '0';
    previousValue = '';
    operation = null;
    updateDisplay();
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === '±') {
            currentValue = (parseFloat(currentValue) * -1).toString();
            updateDisplay();
            return;
        }
        if (button.textContent === '%') {
            currentValue = (parseFloat(currentValue) / 100).toString();
            updateDisplay();
            return;
        }
        handleOperator(button.textContent);
    });
});

document.querySelector('.equals').addEventListener('click', () => {
    calculate();
    operation = null;
});

function handleOperator(op) {
    if (operation !== null) calculate();
    previousValue = currentValue;
    operation = op;
    shouldResetDisplay = true;
}

function calculate() {
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    switch(operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '×': result = prev * current; break;
        case '÷': result = prev / current; break;
        default: return;
    }
    
    currentValue = result.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentValue;
}
