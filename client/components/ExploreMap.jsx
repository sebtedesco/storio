import React from 'react';

class ExploreMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      infoWindows: [],
      searchedResult: []
    };
    this.startGoogleMap = this.startGoogleMap.bind(this);
    this.getSearchResult = this.getSearchResult.bind(this);
  }

  componentDidMount() {
    this.startGoogleMap();
    this.getSearchResult();
  }

  startGoogleMap() {
    this.setState(previousState => {
      // eslint-disable-next-line no-undef
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {
          lat: 40.015501,
          lng: -105.257719
        }
      });
      return { map: map };
    });
  }

  getSearchResult() {
    const searchParam = {
      city: 'Boulder',
      state: 'CO'
    };

    fetch(`/api/storages-map/city/${searchParam.city}/state/${searchParam.state}`)
      .then(response => response.json())
      .then(jsonData => {
        var infoWindows = jsonData.map(storage => {
          // eslint-disable-next-line no-undef
          var infoWindow = new google.maps.InfoWindow({
            content: `$${storage.pricePerDay / 100}`,
            position: {
              lat: storage.latitude,
              lng: storage.longitude
            }
          });
          infoWindow.open(this.state.map);
          return infoWindow;
        });
        this.setState({
          searchedResult: jsonData,
          infoWindows: infoWindows
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div id="map" className='google-map-container col-12'></div>
    );
  }
}

export default ExploreMap;
