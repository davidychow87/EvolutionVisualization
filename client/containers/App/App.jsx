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
      this.setState( { showList: true } );
      // if(this.state.showList) {
      //     this.setState({ showList: false });
      // } else {
      //     this.setState( { showList: true} )
      // }
  }

  handleLeave = (event) => {
      this.setState( { showList: false} );
  }


  render() {
    return (
      <div>
        <h1>Experiments</h1>
        <Button onMouseEnter={this.handleClick} onMouseLeave={this.handleLeave}>Experiments</Button>
        {this.state.showList && <div onMouseEnter={this.handleClick} onMouseLeave={this.handleLeave}> <ListExperiments
                              experiments={this.state.experiments}/></div>

        }


        <Button>Plates</Button>


      </div>
    );
  }
}
