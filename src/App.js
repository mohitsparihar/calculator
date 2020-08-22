import React from 'react';
import './App.css';
import BtnEqualTo from './components/BtnEqualTo/BtnEqualTo.component'
import BtnNum from './components/BtnNum/BtnNum.component';
import BtnOperator from './components/BtnOperator/BtnOperator.component';
import ClearBtn from './components/ClearBtn/ClearBtn.component';
import DecimalBtn from './components/DecimalBtn/DecimalBtn.component';
import calculate from './Utils/calculate.util';

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
  }

  handleDecimal() {
    if (!this.state.decimalClicked) {
      this.setState({
        input: this.state.lastClicked === 'operator' ? '0.' : this.state.input + '.',
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

export default App;
