import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      state: '',
      cityError: '',
      stateError: ''
    };
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCityChange(e) {
    this.setState({ city: e.target.value });
  }

  handleStateChange(e) {
    this.setState({ state: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const searchParams = {
      city: this.state.city,
      state: this.state.state
    };
    if (!searchParams.city && !searchParams.state) {
      this.setState({ cityError: 'City required', stateError: 'State required' });
    } else if (!searchParams.city) {
      this.setState({ cityError: 'City required', stateError: '' });
    } else if (!searchParams.state) {
      this.setState({ cityError: '', stateError: 'State required' });
    } else {
      this.props.listingSearch(searchParams);
      this.setState({ cityError: '', stateError: '' });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">

          <form className="row m-2" onSubmit={this.handleSubmit}>
            <div className="col-6 form-group pl-1">
              <label className="sr-only">City</label>
              <input className="form-control" onChange={this.handleCityChange} type="text" value={this.state.city} placeholder="City Name" />
              <small>{this.state.cityError}</small>
            </div>
            <div className="col-4 form-group p-0">
              <label className="sr-only">State</label>
              <input className="form-control" onChange={this.handleStateChange} type="text" placeholder="State" maxLength="2" value={this.state.state} />
              <small>{this.state.stateError}</small>
            </div>
            <div className="col-2 form-group">
              <button className="btn btn-secondary"><i className="fas fa-search" /></button>
            </div>
          </form>

        </div>
      </React.Fragment>
    );
  }
}

export default Search;
