import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class ListCultures extends Component {


  render() {
    var itemList = [];
    for(var i = 0; i < this.props.cultures.length; i++) {
        let cultureID = this.props.cultures[i].CultureID;

        itemList.push(<ListGroupItem style={styles.item} onClick={() => this.props.getGraph(cultureID)} key={i}>CultureID: {cultureID}</ListGroupItem>)
    }
    //react allows arrays of components, null or falsey calues and a single component when you render it
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
