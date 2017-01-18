import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class ListExperiments extends Component {
  hover = (event) => {


  }

  render() {
    var experimentItems = [];
    for(var i = 0; i < this.props.experiments.length; i++) {
        let item = this.props.experiments[i].UserDefinedID;
        const expId = this.props.experiments[i].ExperimentID;
        experimentItems.push(<ListGroupItem style={styles.item} onClick={() => this.props.getPlateID(expId)} key={i}>{item}</ListGroupItem>)
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
    backgroundColor: '#ccc',
    //hover: backgroundColor: '#92e7fc'
  }

};
