import React from 'react';
import { Link } from 'react-router-dom';

export default class ListingDetail extends React.Component {
  render() {
    return (
      <div className="navigation-bar">
        <Link to='/search'>
          <div><i className="fas fa-search" /></div>
        </Link>
        <Link to='/conversations'>
          <div><i className="fas fa-comment-alt"></i></div>
        </Link>
        <Link to='/log-in'>
          <div className='navigation-bar-user-profile'>
            {
              this.props.user !== 'guest'
                ? <img src={this.props.user.profilePicturePath} alt={`${this.props.user.firstName} ${this.props.user.lastName} picture should be here`}/>
                : <i className="fas fa-user navigation-bar-user-icon"></i>
            }
          </div>
        </Link>
      </div>
    );
  }
}
