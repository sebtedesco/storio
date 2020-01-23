import React from 'react';
import ListingDetail from './listing-detail';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: 'listing-detail'
    };
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const hardCodedData01 = {
      userId: 1,
      firstName: 'Brian',
      lastName: 'Wilson',
      profilePicturePath: './images/users/brian-wilson.jpg',
      storagePicturePath: './images/storages/car-garage.jpg',
      city: 'Laguna Beach',
      state: 'CA',
      title: 'Clean space in lodge of garage',
      longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur luctus justo est, quis posuere lorem ultricies vitae. Sed ut turpis posuere, laoreet diam id, lacinia nisl. Curabitur nec est a metus blandit lobortis.',
      maxValue: 1000000,
      pricePerDay: 300
    };
    return this.state.view === 'listing-detail'
      ? <ListingDetail
        data={hardCodedData01}
      />
      : <h1>{ this.state.message }</h1>;
  }
}
