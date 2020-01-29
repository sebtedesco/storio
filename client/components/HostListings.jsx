import React from 'react';
import HostListItem from './HostListItem';

class HostListings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hostListings: []
    };
  }

  componentDidMount() {
    fetch(`/api/storages-user/signInUserId/${this.props.user.userId}`)
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ hostListings: data });
      })
      .catch(err => {
        return err;
      });
  }

  createHostListingItems() {
    if (this.state.hostListings.length === 0) {
      return;
    }
    const currentItems = [...this.state.hostListings];
    const hostListingItems = currentItems.map(item => {
      return <HostListItem key={item.storageId} imageUrl={item.storagePicturePath} storageId={item.storageId} title={item.title} />;
    });
    return hostListingItems;
  }

  render() {
    const listingItems = this.createHostListingItems();
    return (
      <React.Fragment>
        <div className="container host-listings">
          <h3>Your Listings</h3>
          <div>
            {this.state.hostListings.length === 0 ? <h5 className="col-12 text-muted">No listings yet...</h5> : listingItems }
          </div>

        </div>
      </React.Fragment>
    );
  }
}
export default HostListings;
