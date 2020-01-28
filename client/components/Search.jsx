import React from 'react';
import { withRouter } from 'react-router-dom';

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

  formatCity(cityName) {
    cityName = cityName.toLowerCase();
    const cityNameArr = cityName.split('');
    for (let i = 0; i < cityNameArr.length; i++) {
      if (i === 0 || cityNameArr[i - 1] === ' ') {
        cityNameArr[i] = cityNameArr[i].toUpperCase();
      }
    }
    const result = cityNameArr.join('');
    return result;
  }

  handleSubmit(e) {
    e.preventDefault();
    let state = this.state.state;
    let city = this.state.city;
    if (!city && !state) {
      this.setState({ cityError: 'City required', stateError: 'State required' });
    } else if (!city) {
      this.setState({ cityError: 'City required', stateError: '' });
    } else if (!state) {
      this.setState({ cityError: '', stateError: 'State required' });
    } else {
      city = this.formatCity(city);
      state = state.toUpperCase();
      const searchParams = {
        city: city,
        state: state
      };
      this.props.listingSearch(searchParams);
      this.setState({ cityError: '', stateError: '', city: '', state: '' });
      this.props.history.push('/explore-list');

    }
  }

  render() {
    return (
      <React.Fragment>
        <div className={`container${this.props.extraClass}`}>

          <form className="row m-2" onSubmit={this.handleSubmit}>
            <div className="col-6 form-group pl-1">
              <label className="sr-only">City</label>
              <input className="form-control" onChange={this.handleCityChange} type="text" value={this.state.city} placeholder="City Name" />
              <small className="validation-error-message">{this.state.cityError}</small>
            </div>
            <div className="col-4 form-group p-0">
              <label className="sr-only">State</label>
              <input className="form-control" onChange={this.handleStateChange} type="text" placeholder="State" maxLength="2" value={this.state.state} />
              <small className="validation-error-message">{this.state.stateError}</small>
            </div>
            <div className="col-2 form-group">
              <button className="btn btn-outline-light"><i className="fas fa-search" /></button>
            </div>
          </form>

        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Search);
