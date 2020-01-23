import React from 'react';
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Conversations from './Conversations';
import CreateAccount from './CreateAccount';
import ExploreList from './ExploreList';
import ExploreMap from './ExploreMap';
import HostListings from './HostListings';
import LandingPage from './LandingPage';
import ListingDetail from './ListingDetail';
import LogInPage from './LogInPage';
import Message from './Message';
import Search from './Search';

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
    return (
      <Router>
        <Route exact={true} path='/' render={() => (<h1>{this.state.message}</h1>)} />
        <Route exact={true} path='/conversations' component={Conversations} />
        <Route exact={true} path='/create-account' component={CreateAccount} />
        <Route exact={true} path='/explore-list' component={ExploreList} />
        <Route exact={true} path='/explore-map' component={ExploreMap} />
        <Route exact={true} path='/host-listings' component={HostListings} />
        <Route exact={true} path='/landing-page' component={LandingPage} />
        <Route exact={true} path='/listing-detail' component={ListingDetail}/>
        <Route exact={true} path='/log-in' component={LogInPage} />
        <Route exact={true} path='/message' component={Message} />
        <Route exact={true} path='/search' component={Search} />
      </Router>
    );
  }
}
