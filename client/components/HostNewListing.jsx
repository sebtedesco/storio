import React from 'react';
// import LandingPage from './LandingPage';

class HostNewListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: {
        street1: '',
        street2: null,
        city: '',
        state: '',
        zip: '',
        latitude: '',
        longitude: ''
      },
      newListing: {
        width: '',
        height: '',
        depth: '',
        storagePicturePath: '',
        pricePerDay: '',
        maxValue: '',
        title: '',
        longDescription: '',
        hostId: ''
      }
    };

    this.onListingTitleChange = this.onListingTitleChange.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.onZipChange = this.onZipChange.bind(this);
    this.onHeightChange = this.onHeightChange.bind(this);
    this.onWidthChange = this.onWidthChange.bind(this);
    this.onDepthChange = this.onDepthChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.onAboutChange = this.onAboutChange.bind(this);
    this.onPhotoUpload = this.onPhotoUpload.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.clearFormValues = this.clearFormValues.bind(this);
  }

  onListingTitleChange(e) {
    const newListing = { ...this.state.newListing };
    newListing.title = e.target.value;
    this.setState({ newListing });
  }

  onAddressChange(e) {
    const address = { ...this.state.address };
    address.street1 = e.target.value;
    this.setState({ address });
  }

  onCityChange(e) {
    const address = { ...this.state.address };
    address.city = e.target.value;
    this.setState({ address });
  }

  onStateChange(e) {
    const address = { ...this.state.address };
    address.state = e.target.value;
    this.setState({ address });
  }

  onZipChange(e) {
    const address = { ...this.state.address };
    address.zip = e.target.value;
    this.setState({ address });
  }

  onHeightChange(e) {
    const newListing = { ...this.state.newListing };
    newListing.height = e.target.value;
    this.setState({ newListing });
  }

  onWidthChange(e) {
    const newListing = { ...this.state.newListing };
    newListing.width = e.target.value;
    this.setState({ newListing });
  }

  onDepthChange(e) {
    const newListing = { ...this.state.newListing };
    newListing.depth = e.target.value;
    this.setState({ newListing });
  }

  onPriceChange(e) {
    const newListing = { ...this.state.newListing };
    newListing.price = e.target.value;
    this.setState({ newListing });
  }

  onAboutChange(e) {
    const newListing = { ...this.state.newListing };
    newListing.longDescription = e.target.value;
    this.setState({ newListing });
  }

  onPhotoUpload(e) {
    const newListing = { ...this.state.newListing };
    newListing.storagePicturePath = e.target.value;
    this.setState({ newListing });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const formValues = this.state;
    this.props.postListing(formValues);
    // FETCH POSTTT HEERERRRREEE
  }

  clearFormValues(e) {
    e.preventDefault();
    const newState = { ...this.state };
    newState.address.street1 = '';
    newState.address.city = '';
    newState.address.state = '';
    newState.address.zip = '';
    newState.newListing.height = '';
    newState.newListing.width = '';
    newState.newListing.depth = '';
    newState.newListing.price = '';
    newState.newListing.longDescription = '';
    newState.newListing.storagePicturePath = '';
    this.setState({ newState });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1 className="new-listing-heading">New Listing</h1>
        </div>
        <div className="row">
          <form className='col'>
            <div className="form-group">
              <label htmlFor="listingTitle">Listing Title</label>
              <input className="form-control" id="listingTitle" type="text" maxLength="40" onChange={this.onListingTitleChange} value={this.state.newListing.title} />
              <small></small>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" className="form-control" id="address" onChange={this.onAddressChange} value={this.state.address.street1} />
              <small></small>
            </div>
            <div className="form-row">
              <div className="col-6">
                <label htmlFor="city">City</label>
                <input type="text" className="form-control" id="city" onChange={this.onCityChange} value={this.state.address.city} />
                <small></small>
              </div>
              <div className="col-3">
                <label htmlFor="state">State</label>
                <input type="text" className="form-control" maxLength="2" id="state" onChange={this.onStateChange} value={this.state.address.state} />
                <small></small>
              </div>
              <div className="col-3">
                <label htmlFor="zip">Zip Code</label>
                <input id="zip" type="text" maxLength="5" className="form-control" onChange={this.onZipChange} value={this.state.address.zip} />
              </div>
            </div>
            <div className="form-group">
              <p className="mt-2">Size</p>
            </div>
            <div className="form-row">
              <div className="col-3">
                <input id="height" className="form-control" type="number" maxLength="6" onChange={this.onHeightChange} value={this.state.newListingheight} />
                <label className="col-form-label" htmlFor="height"></label>
                <small>height</small>
              </div>
              <div className="col-1">ft X</div>
              <div className="col-3">
                <input id="width" className="form-control" type="number" maxLength="6" onChange={this.onWidthChange} value={this.state.newListing.width} />
                <label className="col-form-label" htmlFor="width"></label>
                <small>width</small>
              </div>
              <div className="col-1">ft X</div>
              <div className="col-3">
                <input id="depth" className="form-control" type="number" maxLength="6" onChange={this.onDepthChange} value={this.state.newListing.depth} />
                <label className="col-form-label" htmlFor="depth"></label>
                <small>depth</small>
              </div>
              <div className="col-1">ft</div>
            </div>
            <div className="form-group">
              <p className="mt-2">Price</p>
            </div>
            <div className="form-row">
              <div className="col-1">$</div>
              <div className="col-4">
                <input type="number" className="form-control" onChange={this.onPriceChange} value={this.state.newListing.price} />
              </div>
              <div className="col">Daily Rate</div>
              <div className="col">
                <input type="file" className="form-control-file" id="uploadPhoto" onChange={this.onPhotoUpload} />
              </div>
            </div>
            <div className="form-row">
              <div className="col">
                <label className="mt-2" htmlFor="about">About the Space</label>
                <textarea className="form-control" rows="6" id="about" onChange={this.onAboutChange} value={this.state.newListing.longDescription} />
              </div>
            </div>
            <div className="form-row">
              <button className="btn listing-button" onClick={this.handleFormSubmit}>Create Listing</button> <button className="btn btn-secondary" onClick={this.clearFormValues}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default HostNewListing;
