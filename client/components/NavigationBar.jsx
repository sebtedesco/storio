import React from 'react';

export default class ListingDetail extends React.Component {
  render() {
    return (
      <div className="navigation-bar">
        <div><i className="fas fa-search" /></div>
        <div><i className="fas fa-comment-alt"></i></div>
        <div><i className="fas fa-user"></i></div>
      </div>
    );
  }
}
