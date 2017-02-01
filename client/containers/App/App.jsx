import React, {Component} from 'react';
import ListExperiments from './ListExperiments';
import ListPlates from './ListPlates';
import ListCultures from './ListCultures';
import {Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import Graph from './Graph';

export default class App extends Component {
  state = {
    experiments: [],
    showExp: false,
    showPlates: false,
    selectedExp: null,
    plates: [],
    showPlates: false,
    selectedPlate: null,
    cultures: [],
    showCulture: false,
    selectedCulture: null,
    graphData: null,
    plotGraph: false,
  };

  componentWillMount() {
    $.ajax({
      url: '/experiments',
      success: (data, textStatus, jqXHR) => {
        //console.log('EXPERIMENTS', data)
        this.setState({experiments: data.recordset});
        //console.log('TEST:', this.state.experiments)
        this.setState({selectedExp: data.recordset[0].ExperimentID});
        //console.log('test', this.state.selectedExp)
        $.ajax({
          url: '/plates/' + this.state.selectedExp,
          success: (data, textStatus, jqXHR) => {
            //console.log('Plates:', typeof data);
            this.setState({plates: data});
            //console.log('plates!!', this.state.plates.length)
            this.setState({selectedPlate: data[0].PlateID});
            //console.log('slected palte', this.state.selectedPlate)
            $.ajax({
              url: '/cultures/' + this.state.selectedPlate,
              success: (data, textStatus, jqXHR) => {

                this.setState( {cultures: data} );
                this.setState( {selectedCulture: data[0].CultureID} );
                // console.log('cults', this.state.cultures)
                 console.log('selected cult!', this.state.selectedCulture)
                // this.setState( {selectedCulture: 53500401} );
                // console.log('seectled cult!', this.state.selectedCulture)
                $.ajax({
                  url: '/ancestorculture/' + this.state.selectedCulture,

                  success: (data, textStatus, jqXHR) => {

                      this.setState( {graphData: data} );
                      console.log('graphdata!', this.state.graphData);
                      this.setState( {plotGraph: true} );


                  }

                });

              }
            });
          }
        });
      }
    });
    // document.addEventListener('click', (event) => {
    //   console.log('window click')
    //   this.setState( { showExp: false } );
    // });
  }

  expClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    //console.log('dhoe lidy', this.state.showExp)
    // this.setState( { showExp: true } );
    this.setState( {showPlate: false} );
    this.setState( {showCulture: false} );
    if (this.state.showExp) {
      //return;
      this.setState({showExp: false});
    } else {
      this.setState({showExp: true});
    }
  }

  plateClick = (event) => {
    //console.log('plate clicked checker!', this.state.plates.length)
    this.setState( {showExp: false} );
    this.setState( {showCulture: false} );
    if (this.state.showPlate) {
      this.setState({showPlate: false});
    } else {
      this.setState({showPlate: true});
    }
  }

  cultureClick = (event) => {
    this.setState( {showExp: false} );
    this.setState( {showPlate: false} );
    if (this.state.showCulture) {
      this.setState({showCulture: false});
    } else {
      this.setState({showCulture: true});
    }
  }

  getPlateId = (experimentId) => {

    //console.log(typeof experimentId);
    $.ajax({
      url: '/plates/' + experimentId,
      success: (data, textStatus, jqXHR) => {
        this.setState( {plates: data} );
        this.setState( {selectedPlate: data[0].PlateID} );
        //console.log('selected plate!', this.state.selectedPlate);
        this.getCultureId(this.state.selectedPlate);
      }
    });
    this.setState({showExp: false});

  }

  getCultureId = (plateId) => {
    // console.log('length', this.plates.length)
    // console.log('plated!', plateId);
    $.ajax({
      url: '/cultures/' + plateId,
      success: (data, textStatus, jqXHR) => {
        //console.log('cultured', data)
        this.setState( {cultures: data} );
      }
    });
    this.setState( {showPlate: false} );
  }

  getGraph = (cultureId) => {
    console.log('gotten!', cultureId);
    $.ajax({
      url: '/ancestorculture/' + cultureId,

      success: (data, textStatus, jqXHR) => {

          console.log('graph this data!',data);
          this.setState({
            graphData: data,
            plotGraph: true
          });
      }
    });
    this.setState({
      selectedCulture: cultureId,
      showCulture: false,
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
              {this.state.showExp && <div style={styles.absolute}>
                <ListExperiments getPlateID={this.getPlateId} experiments={this.state.experiments}/></div>
              }
            </div>
          </Col>
          <Col xs={3}>
            <div style={styles.paddingLeft}>
              <Button style={styles.button} onClick={this.plateClick}>Plates</Button>
              {this.state.showPlate && <div style={styles.absolute}>
                <ListPlates getCultureID={this.getCultureId} plates={this.state.plates} /></div>
              }

            </div>

          </Col>
          <Col xs={3}>
            <div style={styles.paddingLeft}>
              <Button style={styles.button} onClick={this.cultureClick}>Ancestor Culture</Button>
              {this.state.showCulture && <div style={styles.absolute}>
                <ListCultures style={styles.list} getGraph={this.getGraph} cultures={this.state.cultures} /></div>
              }

            </div>

          </Col>



        </Row>

        <Row>
          <Col xs={6}>
            <div style={styles.paddingLeft}>
              {this.state.plotGraph && (
               <Graph data={this.state.graphData}/>
               )}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}



const styles = {
  list: {
    zIndex: '10',
  },
  button: {},
  paddingLeft: {
    paddingLeft: '10px'
  },
  absolute: {
    position: 'absolute',
    zIndex: 10
  },
};
