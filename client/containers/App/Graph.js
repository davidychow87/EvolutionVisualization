import React, { Component } from 'react';
//var ODGraph = require('./client/graph/ODgraph.js');

export default class Graph extends Component {
  componentDidMount() {
    this.plotGraph(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    this.plotGraph(nextProps.data);
  }

  plotGraph = (data) => {
    new SimpleGraph("plot", data, {
        "cx": 600,
        "cy": 400,
        "title": "Ancestor: " + data[0].CultureID,
        "xlabel": "Date",
        "ylabel": "OD"
    });
  };

  render() {

    return (
      <div style={styles.item} id="plot" className="chart"></div>
    );
  }

}

const styles = {
  item: {
    backgroundColor: '#ccc',
    fontFamily: 'serif',
    fontStyle: 'italic',
    // left: '100px',
    // top: '150px',
    marginTop: '10px',
    zIndex: 1,
    //hover: backgroundColor: '#92e7fc'
  }

};
