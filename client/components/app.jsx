import React from 'react';
// import Search from './Search';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true
    };
    // this.searchForListings = this.searchForListings.bind(this);
  }

  // searchForListings(searchParams) {
  //   console.log('searchForListings called', searchParams);
  // }

  componentDidMount() {

  }

  render() {
    return null;
    //   // <Search listingSearch={this.searchForListings} />
    // );
  }
}
