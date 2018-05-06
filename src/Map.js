import React, { Component } from 'react';
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import styled from 'styled-components';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoicGFuZGVsaXN6IiwiYSI6ImNqZ3VxNGd0djBxbzAyem16bmV0NDc5Z3UifQ.cliPzD2EjANpAjt-j5TflA"
});

const config = {
  "styles": {
    "londonCycle": "mapbox://styles/alex3165/cj2hv9v4y00242slphcyk9oca",
    "light": "mapbox://styles/mapbox/light-v9",
    "dark": "mapbox://styles/mapbox/dark-v9",
    "basic": "mapbox://styles/mapbox/basic-v9",
    "outdoor": "mapbox://styles/mapbox/outdoors-v10"
  }
}

const Mark = styled.div`
  background-color: #e74c3c;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 4px solid #eaa29b;
`;

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      coords: props.coords
    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({coords: [position.coords.longitude, position.coords.latitude]})
      props.updateCoords(this.state.coords)
    });

  }
  render() {
    return (
      <Map
  style={config.styles.outdoor}
  center={this.state.coords}
  containerStyle={{
    height: "100%",
    width: "100%"
  }}>
      <Marker coordinates={this.state.coords}>
        <Mark />
      </Marker>
    </Map>
    );
  }
}

export default App;
