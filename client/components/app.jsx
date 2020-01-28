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
      isLoading: true,
      currentUser: 'guest',
      searchResults: []

    };
    this.listingSearch = this.listingSearch.bind(this);
    // this.postListing = this.postListing.bind(this);
    this.tryLogIn = this.tryLogIn.bind(this);
    this.getListingDetails = this.getListingDetails.bind(this);
    // this.selectOneListing = this.selectOneListing.bind(this);
  }

  componentDidMount() {
    // fetch('/api/health-check')
    //   .then(res => res.json())
    //   .then(data => this.setState({ message: data.message || data.error }))
    //   .catch(err => this.setState({ message: err.message }))
    //   .finally(() => this.setState({ isLoading: false }));
    this.tryLogIn();
  }

  tryLogIn(userObject) {
    // will be passed into log-in page as 'props'
    // userObject will contain 'userName' and 'password'
    // will do fetch request with 'userName' and 'password'
    // upon success, will receive user data object
    // const loggedInUser = {
    //   loggedInUserId: 1,
    //   email: 'hello-universe@gmail.com',
    //   aboutMe: 'Johnny English REBORN!!!! - Mr. Bean -',
    //   profilePicturePath: './images/users/johnny-english-face-resized.jpg',
    //   firstName: 'Johnny',
    //   lastName: 'English'
    // };
    // this.setState({
    //   currentUser: loggedInUser
    // });
    fetch('/api/users/2')
      .then(response => response.json())
      .then(jsonData => {
        this.setState({ currentUser: jsonData });
      });
  }

  allLinks() {
    const loggedInUserId = 2;
    return (
      <div className='d-flex flex-column col-11 mx-2 align-items-center'>
        <Link to='/'>To Home Page</Link>
        <Link to={`/conversations/${loggedInUserId}`}>To Conversations</Link>
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
    fetch(`/api/storages-list/city/${searchParams.city}/state/${searchParams.state}`)
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ searchResults: data });
      })
      .catch(err => {
        return err;
      });
  }

  // postListing(formFields) {
  //   // eslint-disable-next-line no-console
  //   console.log('postListing called: ', formFields);
  // }

  getListingDetails(listingId) {
    fetch(`/api/storage-details/${listingId}`)
      .then(data => {
        return data.json();
      })
      .then(data => {
        return data;
      });
  }

  render() {
    const correspondentId = 5;
    const currentUser = this.state.currentUser;
    return (
      <Router>
        <Route exact={true} path='/'>
          <LandingPage listingSearch={this.listingSearch} />
          {this.allLinks()}
        </Route>
        <Route exact={true} path='/conversations/:loggedInUserId'>
          <Conversations />
          <NavigationBar user={currentUser}/>
        </Route>
        <Route exact={true} path='/create-account'>
          <CreateAccount />
          {this.allLinks()}
        </Route>
        <Route exact={true} path='/explore-list'>
          <ExploreList listings={this.state.searchResults} selectOneListing={this.selectOneListing} />
        </Route>
        <Route exact={true} path='/explore-map'>
          <ExploreMap />
          <NavigationBar user={currentUser} />
        </Route>
        <Route exact={true} path='/host-listings'>
          <HostListings />
          <NavigationBar user={currentUser} />
        </Route>
        <Route exact={true} path='/listing-detail/:storageId'>
          <ListingDetail user={currentUser} getDetails={this.getListingDetails}/>
          <NavigationBar user={currentUser} />
        </Route>
        <Route exact={true} path='/log-in'>
          <LogInPage />
          {this.allLinks()}
        </Route>
        <Route exact={true} path='/message/:hostId/:loggedInUserId' >
          <Message user={currentUser} correspondentId={correspondentId}/>
          <NavigationBar user={currentUser} />
        </Route>
        <Route exact={true} path='/search'>
          <Search listingSearch={this.listingSearch}/>
        </Route>
        <Route exact={true} path='/host-new-listing'>
          <HostNewListing postListing={this.postListing} />
          <NavigationBar user={currentUser} />
        </Route>
      </Router>

    );
  }
}
