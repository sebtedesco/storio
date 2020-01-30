import React from 'react';
import { withRouter } from 'react-router-dom';
import ToggleMapList from './ToggleMapList';

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
        center: {
          lat: 40.015501,
          lng: -105.257719
        },
        disableDefaultUI: true
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
        var previousStorage = null;
        let zIndex = 1;
        var latlng = [];
        // eslint-disable-next-line no-undef
        var latlngbounds = new google.maps.LatLngBounds();
        var markers = jsonData.map(storage => {
          // eslint-disable-next-line no-undef
          var marker = new google.maps.Marker({
            position: {
              lat: storage.latitude,
              lng: storage.longitude
            },
            map: map
          });
          latlng.push(
            // eslint-disable-next-line no-undef
            new google.maps.LatLng(storage.latitude, storage.longitude)
          );
          // eslint-disable-next-line no-undef
          var infowindow = new google.maps.InfoWindow({
            content: `$${storage.pricePerDay / 100}/day`
          });
          infowindow.setZIndex(zIndex);
          infowindow.open(map, marker);
          // eslint-disable-next-line no-undef
          google.maps.event.addListener(infowindow, 'closeclick', function () {
            infowindow.open(map, marker);
            infowindow.setContent(`$${storage.pricePerDay / 100}/day`);
          });
          infowindow.open(map, marker);
          if (previousStorage !== null && storage.latitude === previousStorage.latitude) {
            // eslint-disable-next-line no-undef
            marker.setPosition({
              lat: (storage.latitude + 0.001),
              lng: (storage.longitude + 0.001)
            });
          }
          previousStorage = storage;
          // eslint-disable-next-line no-undef
          google.maps.event.addListener(infowindow, 'closeclick', function () {
            infowindow.setZIndex(1);
            marker.setZIndex(1);
          });
          // (0.5 * (map.getBounds()))
          var latLongCenter = { lat: storage.latitude + 0.005, lng: storage.longitude };
          marker.addListener('click', function () {
            infowindow.setOptions({
              content: `<a class="map-anchor" href="/listing-detail/${storage.storageId}">` +
                '<div class="d-flex flex-column map-infowindow-div align-items-center">' +
                `<span>${storage.title}</span>` +
                `$${storage.pricePerDay / 100}/day` +
                `<img src='${storage.storagePicturePath}' class="map-infowindow-img"/></div></a>`
            });
            infowindow.setZIndex(++zIndex);
            marker.setZIndex(++zIndex);
            map.setCenter(latLongCenter);
          });
          marker.setMap(map);
          return marker;
        });
        for (var i = 0; i < latlng.length; i++) {
          latlngbounds.extend(latlng[i]);
        }
        map.fitBounds(latlngbounds);
        this.setState({
          searchedResult: jsonData,
          infoWindows: markers
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <ToggleMapList />
        <div id="map" className='google-map-container col-12'></div>
      </div>
    );
  }
}

export default withRouter(ExploreMap);
