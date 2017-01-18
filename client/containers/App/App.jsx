import React, {Component} from 'react';
import ListExperiments from './ListExperiments';
import {Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router';

export default class App extends Component {
  state = {
    experiments: [],
    showList: false,
    showPlates: false
  };

  componentWillMount() {
    $.ajax({
      url: '/experiments',
      success: (data, textStatus, jqXHR) => {
        console.log('EXPERIMENTS', data)
        this.setState({experiments: data.recordset});

      }
    });
    // document.addEventListener('click', (event) => {
    //   console.log('window click')
    //   this.setState( { showList: false } );
    // });
  }

  expClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    //console.log('dhoe lidy', this.state.showList)
    // this.setState( { showList: true } );
    if (this.state.showList) {
      //return;
      this.setState({showList: false});
    } else {
      this.setState({showList: true})
    }
  }

  getPlateId = (experimentId) => {

    //console.log(typeof experimentId);
    $.ajax({
      url: '/plates/' + experimentId,
      success: (data, textStatus, jqXHR) => {
        console.log(data);
      }
    });

  }

  render() {
    return (
      <div>
        <h1>Experiments</h1>
        <Row>
          <Col xs={3}>
            <div style={styles.paddingLeft}>
              <Button style={styles.button} onClick={this.expClick}>Experiments</Button>
              {this.state.showList && <div >
                <ListExperiments getPlateID={this.getPlateId} experiments={this.state.experiments}/></div>
}
            </div>
          </Col>
          <Col xs={3}>
            <div style={styles.paddingLeft}>
              <Button style={styles.button} disabled={!this.state.showPlates}>Plates</Button>

            </div>

          </Col>
          <Col xs={3}>
            <Link to="two"><Button>Click here for 2</Button></Link>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.props.children}
          </Col>
        </Row>
      </div>
    );
  }
}

const styles = {
  button: {},
  paddingLeft: {
    paddingLeft: '10px'
  }
};
