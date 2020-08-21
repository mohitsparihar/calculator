import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '0',
      operand1: '',
      operand2: '',
      operator: '',
      result: '',
      lastClicked: '',
      decimalClicked: false
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
      operand1: '',
      operand2: '',
      operator: '',
      result: '',
      lastClicked: '',
      decimalClicked: false
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
    if (this.state.lastClicked === "operator") {
      if (event.target.value === '-') {
        this.setState({
          input: '-',
          lastClicked: "number"
        })
        return;
      } else {
        this.setState({
          operator: event.target.value,
          lastClicked: "operator",
          decimalClicked: false
        })
        return;
      }
    } else if (this.state.input === '-') {
      this.setState({
        input: this.state.operand1,
        operator: event.target.value,
        lastClicked: "operator"
      })
      return;
    }

    if (this.state.operand1 && this.state.operator) {
      this.setState({
        operand1: this.calculate(),
        operator: event.target.value
      })
    } else {
      this.setState({
        operand1: this.state.input,
        operator: event.target.value
      })
    }

    this.setState({
      lastClicked: 'operator',
      decimalClicked: false
    });
    console.log(this.state);
  }

  calculate() {
    let result = 0
    let operand1 = +this.state.operand1;
    let operand2 = +this.state.input;

    switch (this.state.operator) {
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

  handleEqualTo(event) {
    let result = this.calculate()

    this.setState({
      input: result,
      lastClicked: 'equalto',
      operator: ''
    });
  }

  handleDecimal() {
    if (!this.state.decimalClicked) {
      this.setState({
        input: this.state.input + '.',
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
    <button className="btn number" id={props.idProp} style={{gridArea:props.idProp}} value={props.value} onClick={props.handler}>{props.value}</button>
  )
};

const BtnOperator = (props) => {
  return (
    <button className="btn operator" id={props.idProp} style={{gridArea:props.idProp}} value={props.value} onClick={props.handler}>{props.value}</button>
  )
}

const BtnEqualTo = (props) => {
  return (
    <button id="equals" style={{gridArea: "equals"}} className="btn operator" onClick={props.handler}>=</button>
  )
}

const DecimalBtn = (props) => {
  return (
    <button className="btn operator" id="decimal" style={{gridArea: "decimal"}} onClick={props.handler}>.</button>
  )
}

const ClearBtn = (props) => {
  return (
    <button className="btn" id="clear" style={{gridArea: "clear"}} onClick={props.handler}>C</button>
  )
}

export default App;
