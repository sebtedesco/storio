import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Conversations from './Conversations';
import ExploreList from './ExploreList';
import ExploreMap from './ExploreMap';
import HostListings from './HostListings';
import LandingPage from './LandingPage';
import ListingDetail from './ListingDetail';
import Message from './Message';
import HostNewListing from './HostNewListing';
import NavigationBar from './NavigationBar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      currentUser: 'guest'
    };
    this.tryLogIn = this.tryLogIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  tryLogIn(email) {
    if (email === '') {
      // eslint-disable-next-line no-console
      console.log('user email is empty!!!!!!!!');
      return false;
    }
    fetch(`/api/users/${email}`)
      .then(response => response.json())
      .then(jsonData => {
        if (!jsonData) {
          // eslint-disable-next-line
          console.log(`there is no user with email address=${email}!!`);
          return false;
        }
        this.setState({ currentUser: jsonData });
      })
      .catch(err => console.error(err));
  }

  signOut() {
    this.setState({ currentUser: 'guest' });
  }

  render() {
    const currentUser = this.state.currentUser;
    return (
      <Router>
        <Route exact={true} path='/'>
          <LandingPage tryLogIn={this.tryLogIn} user={currentUser} signOut={this.signOut} />
        </Route>
        <Route exact={true} path='/conversations/:loggedInUserId'>
          <Conversations />
          <NavigationBar user={currentUser}/>
        </Route>
        <Route exact={true} path='/explore-list/:city/:state'>
          <ExploreList user={currentUser} />
          <NavigationBar user={currentUser} />
        </Route>
        <Route exact={true} path='/explore-map/:city/:state'>
          <ExploreMap user={currentUser} />
          <NavigationBar user={currentUser} />
        </Route>
        <Route exact={true} path='/host-listings'>
          <HostListings user={currentUser} />
          <NavigationBar user={currentUser} />
        </Route>
        <Route exact={true} path='/listing-detail/:storageId'>
          <ListingDetail user={currentUser} />
          <NavigationBar user={currentUser} />
        </Route>
        <Route exact={true} path='/message/:loggedInUserId/:hostId' >
          <Message user={currentUser}/>
          <NavigationBar user={currentUser} />
        </Route>
        <Route exact={true} path='/host-new-listing'>
          <HostNewListing user={currentUser} />
          <NavigationBar user={currentUser} />
        </Route>
      </Router>

    );
  }
}
