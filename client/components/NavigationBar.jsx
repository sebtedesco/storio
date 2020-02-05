import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Search from './Search';

class ListingDetail extends React.Component {
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
          <div onClick={() => {
            this.props.user === 'guest'
              ? this.props.history.push('/')
              : this.props.history.push('/host-listings/');
          }}><i className="fas fa-list-alt navigation-bar-font-color"></i></div>
          <div className='navigation-bar-user-profile' >
            {
              this.props.user !== 'guest'
                ? <img
                  src={this.props.user.profilePicturePath}
                  alt={`${this.props.user.firstName} ${this.props.user.lastName} picture should be here`}
                  className='navigation-bar-user-profile-picture navigation-bar-font-color'
                />
                : <i className="fas fa-user navigation-bar-user-icon"></i>
            }
          </div>
          <div
            onClick={() => {
              this.props.user === 'guest'
                ? this.props.history.push('/')
                : this.props.history.push(`/conversations/${this.props.user.userId}`);
            }}
          >
            <i className="fas fa-comment-alt navigation-bar-font-color"></i></div>
          <Link to={'/'}>
            <div><i className="fas fa-warehouse navigation-bar-font-color"></i></div>
          </Link>
        </div>
      </>
    );
  }
}

export default withRouter(ListingDetail);
