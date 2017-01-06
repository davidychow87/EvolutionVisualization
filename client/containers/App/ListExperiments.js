import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class ListExperiments extends Component {

  render() {
    var experimentItems = [];
    for(var i = 0; i < this.props.experiments.length; i++) {
        let item = this.props.experiments[i].UserDefinedID;
        experimentItems.push(<ListGroupItem style={styles.item} key={i}>{item}</ListGroupItem>)
    }
    //react allows arrays of components, null or falsey calues and a single component when you render it
    return (
      <ListGroup style={styles.listGroup}>
          {experimentItems}
      </ListGroup>

    );
  }
}

const styles = {
  listGroup: {
    width: '200px',
  },

  item: {
    backgroundColor: '#ccc'
  }
};
