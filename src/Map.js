import React, { Component } from 'react';
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import styled from 'styled-components';
import Dropdown from './Dropbox';


const token = "pk.eyJ1IjoicGFuZGVsaXN6IiwiYSI6ImNqZ3VxNGd0djBxbzAyem16bmV0NDc5Z3UifQ.cliPzD2EjANpAjt-j5TflA"
const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoicGFuZGVsaXN6IiwiYSI6ImNqZ3VxNGd0djBxbzAyem16bmV0NDc5Z3UifQ.cliPzD2EjANpAjt-j5TflA"
});

const Container = styled.div`
  position: relative;
  height: 100%;
  flex: 1;
`;

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

const geocodingUrl = 'https://api.mapbox.com/geocoding/v5';
const mapboxGeocoding = (query) =>
  `${geocodingUrl}/mapbox.places/${query}.json?access_token=${token}`;

const req = (url, body, method) =>
  new Request(url, {
    method : method ? method : 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Charset': 'utf-8'
    }),
    body
  });

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      options: [],
      selected: undefined,
      coords: props.coords
    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({coords: [position.coords.longitude, position.coords.latitude]})
      props.updateCoords(this.state.coords)
    });

  }

  fetch(query) {
    fetch(req(mapboxGeocoding(query)))
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          options: data.features
            .filter((place) => place.place_type.includes('poi'))
            .map((poi) => ({
              id: poi.id,
              coords: poi.center,
              name: poi.text
            }))
        });
      });
  };

  onSelectItem(index) {
    const selected = this.state.options[index];
    this.setState({
      selected,
      coords: selected.center
    });
  };

  onSearch(query) {
    this.setState({ query });
    this.fetch(query);
  };


  render() {
    const { options, selected, coords } = this.state;
    return (
      <Container>
      <Dropdown
      onSearch={this.onSearch}
      onSelectItem={this.onSelectItem}
      options={options}
    />
      <Map
  style={config.styles.outdoor}
  center={this.state.coords}
  containerStyle={{
    height: "100%",
    width: "100%"
  }}>
      
      {selected && (
            <Marker coordinates={selected.center}>
              <Mark />
            </Marker>
          )}
      {!selected && (
        <Marker coordinates={this.state.coords}>
        <Mark />
      </Marker>
      )}
    </Map>
    </Container>
    );
  }
}

export default App;
