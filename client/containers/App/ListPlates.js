import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class ListPlates extends Component {


  render() {
    var itemList = [];
    for(var i = 0; i < this.props.plates.length ; i++) {
        let plateID = this.props.plates[i].PlateID;

        itemList.push(<ListGroupItem style={styles.item} onClick={() => this.props.getCultureID(plateID)} key={i}>PlateID: {plateID}</ListGroupItem>)
    }
  
    return (
      <ListGroup style={styles.listGroup}>
          {itemList}
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
