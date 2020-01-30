import React from 'react';
import { withRouter } from 'react-router-dom';
import Search from './Search';
import LogInPage from './LogInPage';

class LandingPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid landing">
          <img className="storio-logo" src="./images/storio_logo.jpg" />
          <h1 className="storio-heading">storio</h1>
          <p>Find a place to storio stuff:</p>
          <Search listingSearch={this.props.listingSearch} />
          <h3>Extra storage space?</h3>
          <button className="btn btn-large btn-outline-light list-it-button" onClick={() => this.props.history.push('/host-new-listing')}><h4>List It!</h4></button>
          <LogInPage user={this.props.user} tryLogIn={this.props.tryLogIn} />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(LandingPage);
