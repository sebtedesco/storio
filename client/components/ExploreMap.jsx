import React from 'react';
import { withRouter } from 'react-router-dom';

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
    this.setState(() => {
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
    const searchParams = {
      city: this.props.match.params.city,
      state: this.props.match.params.state
    };
    fetch(`/api/storages-map/city/${searchParams.city}/state/${searchParams.state}`)
      .then(response => response.json())
      .then(jsonData => {
        var map = this.state.map;
        var markers = jsonData.map(storage => {
          // previousStorage = storage;
          // eslint-disable-next-line no-undef
          var marker = new google.maps.Marker({
            position: {
              lat: storage.latitude,
              lng: storage.longitude
            },
            map: map
            // icon: image
          });
          // console.log(storage);
          // if (storage.addressId === previousStorage.addressId) {
          //   marker.markerOptions({
          //     anchorPoint: 2
          //   });
          // }
          // eslint-disable-next-line no-undef
          var infowindow = new google.maps.InfoWindow({
            content: `$${storage.pricePerDay / 100}`
          });

          infowindow.open(map, marker);
          infowindow.setOptions({
            content: `$${storage.pricePerDay / 100}`
          });
          // map.event.addListener(marker, 'click', function () {

          // });
          // marker.addListener('mouseover', function () {
          //   infowindow.open(map, marker);
          // });
          marker.addListener('click', function () {
            // infowindow.setContent(<a href="'/listing-detail'">To Listing Detail</a>);
            // put in link here in the infowindow
            infowindow.setOptions({
              content: `<a href="/listing-detail/${storage.storageId}">To Listing Detail</a>`
            });
          });
          // marker.addListener('mouseout', function () {
          //   // infowindow.close(map, marker);
          //   // infowindow.setContent(`$${storage.pricePerDay / 100}`);
          // });

          marker.setMap(map);
          return marker;
        });
        this.setState({
          searchedResult: jsonData,
          infoWindows: markers
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

export default withRouter(ExploreMap);
