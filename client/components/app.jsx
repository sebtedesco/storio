import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
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
    this.allLinks = this.allLinks.bind(this);
    this.searchLocation = this.searchLocation.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  allLinks() {
    return (
      <div className='d-flex flex-column col-11 mx-2 align-items-center'>
        <Link to='/'>To Home Page</Link>
        <Link to='/conversations'>To Conversations</Link>
        <Link to='/create-account'>To CreateAccount</Link>
        <Link to='/explore-list'>To ExploreList</Link>
        <Link to='/explore-map'>To ExploreMap</Link>
        <Link to='/host-listings'>To HostListings</Link>
        <Link to='/listing-detail'>To Listing Detail</Link>
        <Link to='/log-in'>To LogInPage</Link>
        <Link to='/message'>To Message</Link>
        <Link to='/search'>To Search</Link>
      </div>
    );
  }

  searchLocation(some) {
    // eslint-disable-next-line no-console
    console.log(some);
  }

  render() {
    return (
      <Router>
        <Route exact={true} path='/' >
          <LandingPage searchLocation={this.searchLocation} />
        </Route>
        <Route exact={true} path='/conversations'>
          <Conversations />
        </Route>
        <Route exact={true} path='/create-account'>
          <CreateAccount />
        </Route>
        <Route exact={true} path='/explore-list'>
          <ExploreList />
        </Route>
        <Route exact={true} path='/explore-map'>
          <ExploreMap />
        </Route>
        <Route exact={true} path='/host-listings'>
          <HostListings />
        </Route>
        <Route exact={true} path='/listing-detail'>
          <ListingDetail />
        </Route>
        <Route exact={true} path='/log-in'>
          <LogInPage />
        </Route>
        <Route exact={true} path='/message' >
          <Message />
        </Route>
        <Route exact={true} path='/search'>
          <Search searchLocation={this.searchLocation}/>
        </Route>
        <Route path='/' >
          {this.allLinks}
        </Route>
      </Router>
    );
  }
}
