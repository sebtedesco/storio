import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

export default class ListingDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchIconClicked: false
    };
    this.handleSearchIconClick = this.handleSearchIconClick.bind(this);
  }

  handleSearchIconClick() {
    this.setState(previousState => {
      return { searchIconClicked: !previousState.searchIconClicked };
    });
  }

  render() {
    return (
      <>
        <Search extraClass={
          !this.state.searchIconClicked
            ? ' hide-navigation-search col-12'
            : ' show-navigation-search col-12'
        }/>
        <div className="navigation-bar">
          <div onClick={this.handleSearchIconClick} ><i className="fas fa-search" /></div>
          <Link to='/conversations'>
            <div><i className="fas fa-comment-alt navigation-bar-message"></i></div>
          </Link>
          <Link to='/log-in'>
            <div className='navigation-bar-user-profile' >
              {
                this.props.user !== 'guest'
                  ? <img
                    src={this.props.user.profilePicturePath}
                    alt={`${this.props.user.firstName} ${this.props.user.lastName} picture should be here`}
                    className='navigation-bar-user-profile-picture'
                  />
                  : <i className="fas fa-user navigation-bar-user-icon"></i>
              }
            </div>
          </Link>
        </div>
      </>
    );
  }
}
