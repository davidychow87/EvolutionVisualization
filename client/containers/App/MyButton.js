import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class MyButton extends Component {
  componentWillUnmount() {
    console.log("BUTTON IS UNMOUNTED!");
    this.props.onRemove();
  }

  render() {
    return (
      <Button
        bsStyle="primary"
        bsSize="large"
        disabled={this.props.disabled}
        onClick={this.props.handleClick}
        >
        Click Me
      </Button>
    );
  }
}
