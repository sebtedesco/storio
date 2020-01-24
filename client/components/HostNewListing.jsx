import React from 'react';
import LandingPage from './LandingPage';

class HostNewListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listingTitle: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      height: '',
      width: '',
      depth: '',
      price: '',
      about: '',
      photo: ''
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
    this.setState({ listingTitle: e.target.value });
  }

  onAddressChange(e) {
    this.setState({ address: e.target.value });
  }

  onCityChange(e) {
    this.setState({ city: e.target.value });
  }

  onStateChange(e) {
    this.setState({ state: e.target.value });
  }

  onZipChange(e) {
    this.setState({ zip: e.target.value });
  }

  onHeightChange(e) {
    this.setState({ height: e.target.value });
  }

  onWidthChange(e) {
    this.setState({ width: e.target.value });
  }

  onDepthChange(e) {
    this.setState({ depth: e.target.value });
  }

  onPriceChange(e) {
    this.setState({ price: e.target.value });
  }

  onAboutChange(e) {
    this.setState({ about: e.target.value });
  }

  onPhotoUpload(e) {
    this.setState({ photo: e.target.value });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const formValues = this.state;
    this.props.postListing(formValues);
  }

  clearFormValues(e) {
    e.preventDefault();
    this.setState({ listingTitle: '', address: '', city: '', state: '', zip: '', height: '', width: '', depth: '', price: '', about: '', photo: '' });
  }

  render() {
    return (
      <div className="container newListing">
        <div className="row">
          <h1 className="newListingHeading">New Listing</h1>
        </div>
        <div className="row">
          <form className='col' onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="listingTitle">Listing Title</label>
              <input className="form-control" id="listingTitle" type="text" maxLength="40" onChange={this.onListingTitleChange} value={this.state.listingTitle} />
              <small></small>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" className="form-control" id="address" onChange={this.onAddressChange} value={this.state.address} />
              <small></small>
            </div>
            <div className="form-row">
              <div className="col-6">
                <label htmlFor="city">City</label>
                <input type="text" className="form-control" id="city" onChange={this.onCityChange} value={this.state.city} />
                <small></small>
              </div>
              <div className="col-3">
                <label htmlFor="state">State</label>
                <input type="text" className="form-control" maxLength="2" id="state" onChange={this.onStateChange} value={this.state.state} />
                <small></small>
              </div>
              <div className="col-3">
                <label htmlFor="zip">Zip Code</label>
                <input id="zip" type="text" maxLength="5" className="form-control" onChange={this.onZipChange} value={this.state.zip} />
              </div>
            </div>
            <div className="form-group">
              <p className="mt-2">Size</p>
            </div>
            <div className="form-row">
              <div className="col-3">
                <input id="height" className="form-control" type="number" maxLength="6" onChange={this.onHeightChange} value={this.state.height} />
                <label className="col-form-label" htmlFor="height"></label>
                <small>height</small>
              </div>
              <div className="col-1">ft X</div>
              <div className="col-3">
                <input id="width" className="form-control" type="number" maxLength="6" onChange={this.onWidthChange} value={this.state.width} />
                <label className="col-form-label" htmlFor="width"></label>
                <small>width</small>
              </div>
              <div className="col-1">ft X</div>
              <div className="col-3">
                <input id="depth" className="form-control" type="number" maxLength="6" onChange={this.onDepthChange} value={this.state.depth} />
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
                <input type="number" className="form-control" onChange={this.onPriceChange} value={this.state.price} />
              </div>
              <div className="col">Daily Rate</div>
              <div className="col">
                <input type="file" className="form-control-file" id="uploadPhoto" onChange={this.onPhotoUpload} />
              </div>
            </div>
            <div className="form-row">
              <div className="col">
                <label className="mt-2" htmlFor="about">About the Space</label>
                <textarea className="form-control" rows="6" id="about" onChange={this.onAboutChange} value={this.state.about} />
              </div>
            </div>
            <div className="form-row">
              <button className="btn listingButton">Create Listing</button> <button className="btn btn-secondary" onClick={this.clearFormValues}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default HostNewListing;
