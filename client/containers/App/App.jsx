import React, { Component } from 'react';
import ListExperiments from './ListExperiments';
import { Button } from 'react-bootstrap';

export default class App extends Component {
  state = {
    experiments: [],
    showList: false,
  };

  componentWillMount() {
      $.ajax({
          url: '/experiments',
          success: (data, textStatus, jqXHR) => {
            console.log('DATA?', data)
              this.setState( { experiments: data.recordset } );

          }
      });
  }

  handleClick = (event) => {
      if(this.state.showList) {
          this.setState({ showList: false });
      } else {
          this.setState( { showList: true} )
      }
  }

  render() {
    return (
      <div>
        <h1>Experiments</h1>
        <Button onClick={this.handleClick}>CLick Me</Button>
        {this.state.showList && <ListExperiments experiments={this.state.experiments}/>}




        {
          //}<p>{JSON.stringify(this.state.experiments)}</p>
        }
      </div>
    );
  }
}
