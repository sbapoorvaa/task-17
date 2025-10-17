const display = document.getElementById('display');
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

let currentMode = 'dark';

modeToggle.addEventListener('click', () => {
  if (currentMode === 'dark') {
    body.classList.add('dark-mode');
    modeToggle.textContent = 'Light Mode';
    currentMode = 'light';
  } else {
    body.classList.remove('dark-mode');
    modeToggle.textContent = 'Dark Mode';
    currentMode = 'dark';
  }
});

const buttons = document.querySelectorAll('.buttons button');
let expression = '';

buttons.forEach(btn => {
  if (btn.classList.contains('digit')) {
    btn.addEventListener('click', () => {
      expression += btn.dataset.digit;
      display.value = expression;
    });
  } else if (btn.classList.contains('operator')) {
    btn.addEventListener('click', () => {
      expression += btn.dataset.op;
      display.value = expression;
    });
  } else if (btn.classList.contains('func')) {
    btn.addEventListener('click', () => {
      const func = btn.dataset.func;
      if (func === 'pi') {
        expression += 'Math.PI';
      } else if (func === 'e') {
        expression += 'Math.E';
      } else if (func === 'sqrt') {
        expression += 'Math.sqrt('; 
        // add closing parenthesis after user input
        // but for simplicity, we can append 'Math.sqrt(' and expect user to close
        // or implement auto-close
        // For now, just append 'Math.sqrt('
      } else if (func === 'log') {
        expression += 'Math.log10('; 
      } else if (func === 'ln') {
        expression += 'Math.log('; 
      } else if (func === 'sin') {
        expression += 'Math.sin('; 
      } else if (func === 'cos') {
        expression += 'Math.cos('; 
      } else if (func === 'tan') {
        expression += 'Math.tan('; 
      } else if (func === 'pow') {
        expression += 'Math.pow('; 
      }
      display.value = expression;
    });
  } else if (btn.classList.contains('clear')) {
    btn.addEventListener('click', () => {
      expression = '';
      display.value = '';
    });
  }
});

// Handle equals
document.getElementById('equals').addEventListener('click', () => {
  try {
    // Replace 'Math.' functions in expression
    // For safety, evaluate only allowed functions
    // For simplicity, use eval with caution
    const result = eval(expression);
    display.value = result;
    expression = result.toString();
  } catch (e) {
    display.value = 'Error';
    expression = '';
  }
});