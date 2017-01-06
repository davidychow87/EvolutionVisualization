import React, { Component } from 'react';
import MyButton from './MyButton';

export default class App extends Component {
  state = {
    value: 1,
    disabled: false,
    blah: false,
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextState.value >= 6) {
  //     return false;
  //   }
  //   return true;
  // }



  handleClick = (event) => {
    if (this.state.value === 10) {
      this.setState({ disabled: true });
      return;
    }

    this.setState({ value: this.state.value + 1 })
  };

  handleRemove = () => {
    this.setState({ blah: true });
  }

  render() {
    let blah;
    let button = null;
    if (this.state.value < 6) {
      button = <MyButton onRemove={this.handleRemove} handleClick={this.handleClick} disabled={this.state.disabled} />;
    } else {
      blah = "BLAHHHH";
    }

    return (
      <div>
        <h1>Experiments</h1>
        <p>{this.state.value}</p>
        <p>{blah}</p>
        {button}
      </div>
    );
  }
}
