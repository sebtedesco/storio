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
import HostNewListing from './HostNewListing';
import NavigationBar from './NavigationBar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true
    };
    this.listingSearch = this.listingSearch.bind(this);
    this.postListing = this.postListing.bind(this);
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
        <Link to='/host-new-listing'>Host New Listing</Link>
      </div>
    );
  }

  listingSearch(searchParams) {
    // eslint-disable-next-line no-console
    console.log(`listingSearch called. city: ${searchParams.city}, state: ${searchParams.state}`);
  }

  postListing(formFields) {
    // eslint-disable-next-line no-console
    console.log('postListing called: ', formFields);
  }

  render() {
    const loggedInUserId = 1;
    const correspondentId = 2;
    return (
      <Router>
        <Route exact={true} path='/'>
          <LandingPage listingSearch={this.listingSearch} />
        </Route>
        <Route exact={true} path='/conversations'>
          <Conversations />
          <NavigationBar />
        </Route>
        <Route exact={true} path='/create-account'>
          <CreateAccount />
        </Route>
        <Route exact={true} path='/explore-list'>
          <ExploreList />
          <NavigationBar />
        </Route>
        <Route exact={true} path='/explore-map'>
          <ExploreMap />
          <NavigationBar />
        </Route>
        <Route exact={true} path='/host-listings'>
          <HostListings />
          <NavigationBar />
        </Route>
        <Route exact={true} path='/listing-detail'>
          <ListingDetail loggedInUserId={loggedInUserId}/>
          <NavigationBar />
        </Route>
        <Route exact={true} path='/log-in'>
          <LogInPage />
        </Route>
        <Route exact={true} path='/message' >
          <Message loggedInUserId={loggedInUserId} correspondentId={correspondentId}/>
          <NavigationBar />
        </Route>
        <Route exact={true} path='/search'>
          <Search searchLocation={this.searchLocation}/>
        </Route>
        <Route exact={true} path='/host-new-listing'>
          <HostNewListing postListing={this.postListing} />
          <NavigationBar />
        </Route>
        <Route path='/' >
          {this.allLinks}
        </Route>
      </Router>

    );
  }
}
