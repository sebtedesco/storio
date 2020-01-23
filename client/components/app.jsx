import React from 'react';

// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
// import ListingDetail from './listing-detail';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true
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
    return this.state.isLoading
      ? <h1>Testing connections...</h1>
      : <h1>{this.state.message}</h1>;
  }

  // render() {
  //   return (
  //     <Router>
  //       <Route exact={true} path='/' render={() => (
  //         <h1>{this.state.message}</h1>
  //         // <Link to={'/landing'}>{'To landing Page'}</Link>
  //       )} />
  //       <Route exact={true} path='/landing' render={() => (
  //         <h1>This is landing page</h1>
  //       )} />
  //       <Route path='/listing-detail' component={ListingDetailFunc}/>
  //     </Router>
  //   );
  // }
}

// Peter
// const ListingDetailFunc = () => {
//   const hardCodedData01 = {
//     userId: 1,
//     firstName: 'Brian',
//     lastName: 'Wilson',
//     profilePicturePath: './images/users/brian-wilson.jpg',
//     storagePicturePath: './images/storages/car-garage.jpg',
//     city: 'Laguna Beach',
//     state: 'CA',
//     title: 'Clean space in lodge of garage',
//     longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur luctus justo est, quis posuere lorem ultricies vitae. Sed ut turpis posuere, laoreet diam id, lacinia nisl. Curabitur nec est a metus blandit lobortis.',
//     maxValue: 1000000,
//     pricePerDay: 300
//   };
//   return (<ListingDetail data={hardCodedData01} />);
// };
