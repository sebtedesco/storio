import React from 'react';
import Search from './Search';
import { withRouter } from 'react-router-dom';

class LandingPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container landing">
          <img className="storio-logo" src="./images/storio_logo.jpg" />
          <h1 className="storio-heading">storio</h1>
          <p>Find a place to storio stuff:</p>
          <Search listingSearch={this.props.listingSearch} />
          <h3>Extra storage space?</h3>
          <button className="btn btn-large btn-outline-light list-it-button" onClick={() => this.props.history.push('/host-new-listing')}><h4>List It!</h4></button>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(LandingPage);
