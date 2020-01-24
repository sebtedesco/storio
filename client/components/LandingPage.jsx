import React from 'react';
import Search from './Search';

class LandingPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container landing">
          <img className="storio-logo" src="./images/storio_logo.jpg" />
          <h1 className="storio-heading">storio</h1>
          <p>Find a place to storio stuff:</p>
          <Search listingSearch={this.props.listingSearch} />
        </div>
      </React.Fragment>
    );
  }
}

export default LandingPage;
