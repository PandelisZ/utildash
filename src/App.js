import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'semantic-ui-css/semantic.min.css';

const api = (time, coords) => {
  return `https://utildash.glitch.me/api?time=${time.format('YYYY-MM-DD')}&lat=${coords[1]}&lng=${coords[0]}`
}

const info = (props) => {

  return (
    <div>
      <h1>{props.name}</h1>
      <h3>Risk: {props.risk}</h3>
      {props.reasons > 0 && <ul>
        {props.reasons.map(r => (<li>r</li>))}
      </ul>}
    </div>
  )

}

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      coords: [-0.481747846041145, 51.3233379650232]
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateCoords = this.updateCoords.bind(this);
    this.makeApiReq = this.makeApiReq.bind(this);
  }

  async makeApiReq(time, coords) {
    console.log('api')
    const payload = await fetch(api(time, coords)).then(res => res.json())
    this.setState({
      payload: payload
    })
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });

    console.log('called')

    this.makeApiReq(date, this.state.coords)
  }

  updateCoords(coords) {
    this.setState({
      coords: coords
    })
  }

  render() {
    return (
      <div className="App">

        <div className="ui grid" style={{height: '100%'}}>
          <div className="ten wide column">
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                dateFormat="DD-MM-YYYY"
            />

            <h1>lat: {this.state.coords[1]} lng:{this.state.coords[0]}</h1>
            <code>
              {JSON.stringify(this.state.payload)}
            </code>

            <div>

            </div>
          </div>
          <div className="six wide column">
            <Map updateCoords={this.updateCoords} coords={this.state.coords} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
