import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class ListingDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storageDetail: null,
      isMessageButtonVisible: true
    };
  }

  componentDidMount() {
    const currentStorageId = this.props.match.params.storageId;
    fetch(`/api/storage-details/${currentStorageId}`)
      .then(data => {
        return data.json();
      })
      .then(data => {
        if (data.hostId === this.props.user.userId) {
          this.setState({ isMessageButtonVisible: false });
        }
        this.setState({ storageDetail: data });
      })
      .catch(err => {
        return err;
      });
  }

  render() {
    const data = this.state.storageDetail;
    if (!data) {
      return (
        <div>Loading...........</div>
      );
    }
    return (
      <div className="container-fluid detail-container">
        <div className="container col-12 list-detail my-auto m-0">
          <i
            className="far fa-arrow-alt-circle-left col-12 back-arrow"
            onClick={() => {
              this.props.history.goBack();
            }}
          ></i>
          {/* </div> */}
          <div className="col-12 storage-image-container">
            <img
              className="list-detail-storage-image"
              src={data.storagePicturePath}
              alt="storage-image should be here"
            />
          </div>
          <div className="list-detail-title">{data.title}</div>
          <div className="location-and-user-profile">
            <div className="list-detail-address">{`${data.city}, ${data.state}`}</div>
            <div className="list-detail-host-profile">
              <div className="host-image-container">
                <img
                  className="list-detail-host-picture"
                  src={data.profilePicturePath}
                  alt="host-profile-image should be here"
                />
              </div>
              <div className="list-detail-host-full-name">{`${data.firstName} ${data.lastName}`}</div>
            </div>
          </div>
          <div className="storage-details">
            <div className="long-description-title">About the space</div>
            <div className="long-description">{data.longDescription}</div>
            <div className="max-coverage">
              <div className="list-detail-max-coverage-title">
                Maximum value allowed:{' '}
              </div>
              <div className="max-value">{` $ ${data.maxValue / 100}`}</div>
            </div>
            <div className="price-container">
              <div className="list-detail-price">Price:</div>
              <div>{`$${((data.pricePerDay * 7) / 100).toFixed(2)}/wk, $${(
                (data.pricePerDay * 30) /
                100
              ).toFixed(2)}/month`}</div>
            </div>
          </div>
          <div className="form-row col-12 d-flex justify-content-center detail-button-row">
            <Link to={`/message/${this.props.user.userId}/${data.hostId}`}>
              <button
                className={`btn listing-button ${
                  this.state.isMessageButtonVisible === true ? '' : 'd-none'
                }`}
              >
                Message Host
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ListingDetail);
