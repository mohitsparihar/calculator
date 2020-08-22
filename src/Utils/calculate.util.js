function calculate(q) { // q = queue
    let a = false;
    let b = false;
    let o = false;
    let m = false;
    while (q.length()) {
      let n = q.pop();
      console.log(n);
      if (a === false && typeof +n === "number") {
        a = n;
      } else {
        if (['+', '-', '*', '/'].includes(n)) {
          console.log('operator: ' + n);
          if (o !== false && n === '-') {
            m = n;
          } else {
            o = n;
            m = false;
          }

          console.log('operator: ' + n);
        } else if (a !== false && typeof +n === "number") {
          b = m ? m + n : n;
          m = false;
          a = operation(+a, +b, o);
          o = false;
        }
      }
    }
    return a;
  }

  function operation(operand1, operand2, operator) {
    let result = 0
    console.log(operand1, operand2, operator);
    switch (operator) {
      case '+':
        result = operand1 + operand2;
        break;
      case '-':
        result = operand1 - operand2;
        break;
      case '*':
        result = operand1 * operand2;
        break;
      case '/':
        result = operand1 / operand2;
        break;
    }

    return result;
  }

  export default calculate;