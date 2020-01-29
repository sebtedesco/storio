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
          <Link to={`/explore-list/${this.props.match.params.city}/${this.props.match.params.state}`}>
            <div><i className="fas fa-list-alt navigation-bar-font-color"></i></div>
          </Link>
          <Link to={`/explore-map/${this.props.match.params.city}/${this.props.match.params.state}`}>
            <div><i className="fas fa-map-marked-alt navigation-bar-font-color"></i></div>
          </Link>
          <Link to={`/conversations/${this.props.user.userId}`}>
            <div><i className="fas fa-comment-alt navigation-bar-font-color"></i></div>
          </Link>
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
        </div>
      </>
    );
  }
}

export default withRouter(ListingDetail);
