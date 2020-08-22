import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: 0,
      lastClicked: '',
      decimalClicked: false,
      arr: []
    }

    this.handleInputNum = this.handleInputNum.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleEqualTo = this.handleEqualTo.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
  }
  handleClear(event) {
    this.setState({
      input: '0',
      lastClicked: '',
      decimalClicked: false,
      arr: []
    });
  }

  handleInputNum(event) {
    if (this.state.lastClicked === '' || this.state.lastClicked === 'operator' || this.state.lastClicked === 'equalto' || this.state.input === '0') {
      this.setState({
        input: event.target.value
      })
    } else {
      this.setState({
        input: this.state.input + '' + event.target.value
      })
    }

    this.setState({
      lastClicked: 'number'
    });

  }

  handleOperator(event) {
    let tempArr = this.state.arr;
    if (this.state.lastClicked === "number") {
      tempArr.push(this.state.input);
      this.setState({
        arr: tempArr
      })

    }

    tempArr.push(event.target.value)
    this.setState({
      arr: tempArr,
      decimalClicked: false,
      lastClicked: 'operator',
    })
  }

  handleEqualTo(event) {
    let calArr = this.state.arr;
    calArr.push(this.state.input);
    console.log(calArr);
    let result = calculate(calArr);

    this.setState({
      input: result,
      lastClicked: 'equalto',
      arr: [result]
    });

    function calculate(arr) {
      let a = false;
      let b = false;
      let o = false;
      let m = false;
      while (arr.length) {
        let n = arr.shift();
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
  }

  handleDecimal() {
    if (!this.state.decimalClicked) {
      this.setState({
        input: this.state.lastClicked === 'operator' ? '0.': this.state.input + '.',
        decimalClicked: true,
        lastClicked: "decimal"
      })
    }
  }



  render() {
    const btnNums = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].map((el, i) => {
      return (
        <BtnNum key={el} idProp={el} value={i} handler={this.handleInputNum} />
      );
    })

    const operatorMap = {
      add: '+',
      subtract: '-',
      multiply: '*',
      divide: '/'
    }
    const operators = ['add', 'subtract', 'multiply', 'divide'].map(el => {
      return (
        <BtnOperator key={'key' + el} idProp={el} value={operatorMap[el]} handler={this.handleOperator} />
      )
    })

    return (
      <div className="container">
        <div id="display">{this.state.input}</div>
        <div className="btns">
          <ClearBtn handler={this.handleClear} />
          {btnNums}
          {operators}
          <DecimalBtn handler={this.handleDecimal} />
          <BtnEqualTo handler={this.handleEqualTo} />
        </div>
      </div>
    )
  }
}

const BtnNum = (props) => {
  return (
    <button className="btn number" id={props.idProp} style={{ gridArea: props.idProp }} value={props.value} onClick={props.handler}>{props.value}</button>
  )
};

const BtnOperator = (props) => {
  return (
    <button className="btn operator" id={props.idProp} style={{ gridArea: props.idProp }} value={props.value} onClick={props.handler}>{props.value}</button>
  )
}

const BtnEqualTo = (props) => {
  return (
    <button id="equals" style={{ gridArea: "equals" }} className="btn operator" onClick={props.handler}>=</button>
  )
}

const DecimalBtn = (props) => {
  return (
    <button className="btn operator" id="decimal" style={{ gridArea: "decimal" }} onClick={props.handler}>.</button>
  )
}

const ClearBtn = (props) => {
  return (
    <button className="btn" id="clear" style={{ gridArea: "clear" }} onClick={props.handler}>C</button>
  )
}

export default App;
