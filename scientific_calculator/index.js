let answer = "";
let display = [];
let expression = [];
let answered = false;
let modeBtn = document.querySelector("#mode");
let equalBtn = document.querySelector("#equal");
let clearBtn = document.querySelector("#clear");
let deleteBtn = document.querySelector("#delete");
let logBtn = document.querySelector("#logarithm");
let squareBtn = document.querySelector("#square");
let inverseBtn = document.querySelector("#inverse");
let numberArr = document.querySelectorAll("#number");
let regularArr = document.querySelectorAll("#regular");
let functionArr = document.querySelectorAll("#function");
let constantArr = document.querySelectorAll("#constant");
let modeDisplay = document.querySelector(".mode-display");
let textBorder = document.querySelector(".text-border");
let textDisplay = document.querySelector(".text-display");
let hiddenBracket = document.getElementById("hidden-bracket");
let openingParenthesisBtn = document.querySelector("#opening-parenthesis");
let closingParenthesisBtn = document.querySelector("#closing-parenthesis");

const constants = [
  {
    symbol: "π",
    value: Math.PI.toString(),
  },
  {
    symbol: "e",
    value: Math.E.toString(),
  },
];

const functions = [
  {
    normal: "sin",
    inverse: "sin<sup>-1</sup>",
    normalText: "sin",
    inverseText: "asin",
    normalAction: function (i) {
      if (modeDisplay.textContent == "DEG") {
        return Math.sin(Math.PI * (parseFloat(i) / 180)).toString();
      } else {
        return Math.sin(parseFloat(i)).toString();
      }
    },
    inverseAction: function (i) {
      if (modeDisplay.textContent == "DEG") {
        return ((Math.asin(parseFloat(i)) * 180) / Math.PI).toString();
      } else {
        return Math.asin(parseFloat(i)).toString();
      }
    },
  },
  {
    normal: "cos",
    inverse: "cos<sup>-1</sup>",
    normalText: "cos",
    inverseText: "acos",
    normalAction: function (i) {
      if (modeDisplay.textContent == "DEG") {
        return Math.cos(Math.PI * (parseFloat(i) / 180)).toString();
      } else {
        return Math.cos(parseFloat(i)).toString();
      }
    },
    inverseAction: function (i) {
      if (modeDisplay.textContent == "DEG") {
        return ((Math.acos(parseFloat(i)) * 180) / Math.PI).toString();
      } else {
        return Math.acos(parseFloat(i)).toString();
      }
    },
  },
  {
    normal: "tan",
    inverse: "tan<sup>-1</sup>",
    normalText: "tan",
    inverseText: "atan",
    normalAction: function (i) {
      if (modeDisplay.textContent == "DEG") {
        return Math.tan(Math.PI * (parseFloat(i) / 180)).toString();
      } else {
        return Math.tan(parseFloat(i)).toString();
      }
    },
    inverseAction: function (i) {
      if (modeDisplay.textContent == "DEG") {
        return ((Math.atan(parseFloat(i)) * 180) / Math.PI).toString();
      } else {
        return Math.atan(parseFloat(i)).toString();
      }
    },
  },
  {
    normal: "ln",
    inverse: "e<sup>x</sup>",
    normalText: "ln",
    inverseText: "exp",
    normalAction: function (i) {
      return Math.log(parseFloat(i)).toString();
    },
    inverseAction: function (i) {
      return Math.exp(parseFloat(i)).toString();
    },
  },
];

function checkAnswer() {
  if (answered == true) {
    display = [];
    expression = [];
    textDisplay.textContent = display.join("");
    answered = false;
  }
}

function isNumber(num) {
  return isNaN(parseFloat(num)) == false;
}

function isConstant(number) {
  return number == "π" || number == "e";
}

function isPlusOrMinus(value) {
  let result = false;
  if (value == "+" || value == "-") {
    result = true;
  }
  return result;
}

function checkPercentages(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "%") {
      if (isPlusOrMinus(arr[i - 2]) == true) {
        console.log(true);
        arr[i - 1] = ((parseFloat(arr[i - 1]) / 100) * arr[i - 3]).toString();
        arr.splice(i, 1);
        checkPercentages(arr);
      } else {
        arr[i - 1] = (parseFloat(arr[i - 1]) / 100).toString();
        arr.splice(i, 1);
        checkPercentages(arr);
      }
    }
  }
}

function applyFunctions(arr) {
  for (let i = arr.length; i >= 0; i--) {
    for (let j = 0; j < functions.length; j++) {
      if (arr[i] == functions[j].normalText) {
        arr[i] = functions[j].normalAction(arr[i + 1]);
        arr.splice(i + 1, 1);
        applyFunctions(arr);
      } else if (arr[i] == functions[j].inverseText) {
        arr[i] = functions[j].inverseAction(arr[i + 1]);
        arr.splice(i + 1, 1);
        applyFunctions(arr);
      } else if (arr[i] == "log") {
        arr[i] = Math.log10(parseFloat(arr[i + 1])).toString();
        arr.splice(i + 1, 1);
        applyFunctions(arr);
      }
    }
  }
}

function factorial(n) {
  if (n == 0 || n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function getFactorial(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "!") {
      arr[i - 1] = factorial(parseFloat(arr[i - 1])).toString();
      arr.splice(i, 1);
      getFactorial(arr);
    }
  }
}

function openBrackets(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == "(") {
      let subExpression = [];
      let closingBracketPosition = 0;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] != ")") {
          subExpression.push(arr[j]);
        } else {
          closingBracketPosition = j;
          break;
        }
      }
      if (closingBracketPosition != 0) {
        if (isNumber(arr[closingBracketPosition + 1])) {
          arr[i] = "x";
        } else {
          arr.splice(closingBracketPosition, 1);
        }
      }
      expressionLength = subExpression.length;
      let result = getAnswer(subExpression);
      arr[i + 1] = result;
      arr.splice(i + 2, expressionLength - 1);
      if (isNumber(arr[i - 1])) {
        arr[i] = "x";
      } else {
        arr.splice(i, 1);
      }
    }
  }
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == ")") {
      if (isNumber(arr[i - 1])) {
        arr[i] = "x";
      } else {
        arr[i] = "NaN";
      }
    }
  }
  console.log(arr);
}

function performExponentiation(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "^") {
      arr[i - 1] = (
        parseFloat(arr[i - 1]) ** parseFloat(arr[i + 1])
      ).toString();
      arr.splice(i, 2);
      performExponentiation(arr);
    } else if (arr[i] == "√") {
      arr[i] = Math.sqrt(parseFloat(arr[i + 1])).toString();
      arr.splice(i + 1, 1);
      performExponentiation(arr);
    }
  }
}

function performMultiplicationAndDivision(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "x") {
      arr[i - 1] = (parseFloat(arr[i - 1]) * parseFloat(arr[i + 1])).toString();
      arr.splice(i, 2);
      performMultiplicationAndDivision(arr);
    } else if (arr[i] == "/") {
      arr[i - 1] = (parseFloat(arr[i - 1]) / parseFloat(arr[i + 1])).toString();
      arr.splice(i, 2);
      performMultiplicationAndDivision(arr);
    }
  }
}

function performAdditionAndSubtraction(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "+") {
      arr[i - 1] = (parseFloat(arr[i - 1]) + parseFloat(arr[i + 1])).toString();
      arr.splice(i, 2);
      performAdditionAndSubtraction(arr);
    } else if (arr[i] == "-") {
      if (i == 0) {
        arr[i] = (parseFloat(arr[i + 1]) * -1).toString();
        arr.splice(i + 1, 1);
        performAdditionAndSubtraction(arr);
      } else {
        arr[i - 1] = (
          parseFloat(arr[i - 1]) - parseFloat(arr[i + 1])
        ).toString();
        arr.splice(i, 2);
        performAdditionAndSubtraction(arr);
      }
    }
  }
}

function getAnswer(arr) {
  getFactorial(arr);
  checkPercentages(arr);
  openBrackets(arr);
  applyFunctions(arr);
  performExponentiation(arr);
  performMultiplicationAndDivision(arr);
  performAdditionAndSubtraction(arr);
  return arr[0];
}

openingParenthesisBtn.addEventListener("click", function () {
  if (answered == true && display.length == 1) {
    answered = false;
    display = [];
    expression = [];
  }
  display.push("(");
  expression.push("(");
  textDisplay.textContent = display.join("");
  textBorder.scrollLeft = textBorder.scrollWidth;
});

closingParenthesisBtn.addEventListener("click", function () {
  if (hiddenBracket.style.visibility == "visible") {
    hiddenBracket.style.visibility = "hidden";
  }
  if (answered == true && display.length == 1) {
    answered = false;
    display = [];
    expression = [];
  }
  display.push(")");
  expression.push(")");
  textDisplay.textContent = display.join("");
  textBorder.scrollLeft = textBorder.scrollWidth;
});

squareBtn.addEventListener("click", function () {
  if (squareBtn.innerHTML == "√") {
    checkAnswer();
    if (isNumber(expression[expression.length - 1])) {
      expression.push("x");
    }
    display.push("√");
    expression.push("√");
  } else {
    display.push("^");
    display.push("2");
    expression.push("^");
    expression.push("2");
  }
  textDisplay.textContent = display.join("");
  textBorder.scrollLeft = textBorder.scrollWidth;
});

logBtn.addEventListener("click", function () {
  if (logBtn.innerHTML == "log") {
    checkAnswer();
    if (isNumber(expression[expression.length - 1])) {
      expression.push("x");
    }
    display.push("log");
    display.push("(");
    expression.push("log");
    expression.push("(");
    hiddenBracket.style.visibility = "visible";
  } else {
    if (isNumber(expression[expression.length - 1])) {
      display.push("x");
      expression.push("x");
    }
    display.push("10");
    display.push("^");
    expression.push("10");
    expression.push("^");
  }
  textDisplay.textContent = display.join("");
  textBorder.scrollLeft = textBorder.scrollWidth;
});

for (let i = 0; i < regularArr.length; i++) {
  regularArr[i].addEventListener("click", function () {
    if (expression.length != 0) {
      expression.push(regularArr[i].textContent);
      display.push(regularArr[i].textContent);
    } else if (expression.length == 0 && regularArr[i].textContent == "-") {
      expression.push(regularArr[i].textContent);
      display.push(regularArr[i].textContent);
    }
    textDisplay.textContent = display.join("");
    textBorder.scrollLeft = textBorder.scrollWidth;
  });
}

for (let i = 0; i < constantArr.length; i++) {
  constantArr[i].addEventListener("click", function () {
    checkAnswer();
    for (let j = 0; j < constants.length; j++) {
      if (constantArr[i].textContent == constants[j].symbol) {
        if (isNumber(expression[expression.length - 1])) {
          expression.push("x");
        }
        expression.push(constants[j].value);
        display.push(constants[j].symbol);
      }
    }
    textDisplay.textContent = display.join("");
    textBorder.scrollLeft = textBorder.scrollWidth;
  });
}

for (let i = 0; i < functionArr.length; i++) {
  functionArr[i].addEventListener("click", function () {
    checkAnswer();
    if (isNumber(expression[expression.length - 1])) {
      expression.push("x");
    }
    for (let j = 0; j < functions.length; j++) {
      if (functionArr[i].innerHTML == functions[j].normal) {
        display.push(functions[j].normalText);
        expression.push(functions[j].normalText);
      } else if (functionArr[i].innerHTML == functions[j].inverse) {
        display.push(functions[j].inverseText);
        expression.push(functions[j].inverseText);
      }
    }
    display.push("(");
    expression.push("(");
    hiddenBracket.style.visibility = "visible";
    textDisplay.textContent = display.join("");
    textBorder.scrollLeft = textBorder.scrollWidth;
  });
}

for (let i = 0; i < numberArr.length; i++) {
  numberArr[i].addEventListener("click", function () {
    if (answered == true && display.length == 1) {
      answered = false;
      display = [];
      expression = [];
    }
    if (display.length == 0) {
      display.push(numberArr[i].textContent);
      expression.push(numberArr[i].textContent);
    } else {
      if (isNumber(display[display.length - 1]) == true) {
        expression.pop();
        let number = display.pop() + numberArr[i].textContent;
        display.push(number);
        expression.push(number);
      } else {
        if (isConstant(display[display.length - 1])) {
          expression.push("x");
        }
        display.push(numberArr[i].textContent);
        expression.push(numberArr[i].textContent);
      }
    }
    textDisplay.textContent = display.join("");
    textBorder.scrollLeft = textBorder.scrollWidth;
  });
}

inverseBtn.addEventListener("click", function () {
  for (let i = 0; i < functionArr.length; i++) {
    for (let j = 0; j < functions.length; j++) {
      if (functionArr[i].textContent == functions[j].normal) {
        functionArr[i].innerHTML = functions[j].inverse;
      } else if (functionArr[i].innerHTML == functions[j].inverse) {
        functionArr[i].innerHTML = functions[j].normal;
      }
    }
  }
  if (squareBtn.innerHTML == "√") {
    squareBtn.innerHTML = "x<sup>2</sup>";
  } else {
    squareBtn.innerHTML = "√";
  }

  if (logBtn.innerHTML == "log") {
    logBtn.innerHTML = "10<sup>x</sup>";
  } else {
    logBtn.innerHTML = "log";
  }
});

modeBtn.addEventListener("click", function () {
  if (modeBtn.textContent == "RAD") {
    modeBtn.textContent = "DEG";
    modeDisplay.textContent = "RAD";
  } else {
    modeBtn.textContent = "RAD";
    modeDisplay.textContent = "DEG";
  }
});

deleteBtn.addEventListener("click", function () {
  if (isNumber(display[display.length - 1])) {
    display.pop();
    let number = expression.pop();
    newNumber = number.slice(0, number.length - 1);
    if (newNumber != "") {
      display.push(newNumber);
      expression.push(newNumber);
    }
  } else if (isConstant(display[display.length - 1])) {
    expression.pop();
    expression.pop();
    display.pop();
  } else if (display[display.length - 1] == "(") {
    if (hiddenBracket.style.visibility == "visible") {
      hiddenBracket.style.visibility = "hidden";
    }
    expression.pop();
    display.pop();
  } else {
    expression.pop();
    display.pop();
  }
  textDisplay.textContent = display.join("");
});

clearBtn.addEventListener("click", function () {
  if (hiddenBracket.style.visibility == "visible") {
    hiddenBracket.style.visibility = "hidden";
  }
  expression = [];
  display = [];
  textDisplay.textContent = "";
});

equalBtn.addEventListener("click", function () {
  if (textDisplay.textContent != "Error") {
    if (hiddenBracket.style.visibility == "visible") {
      hiddenBracket.style.visibility = "hidden";
    }
    answer = getAnswer(expression);
    if (answer == "NaN" || answer == undefined) {
      answer = "Error";
    }
    answered = true;
    display = [answer];
    expression = [answer];
    textDisplay.textContent = display.join("");
  }
});
