import React from 'react';
import { withRouter } from 'react-router-dom';
import ListItem from './ListItem';
import ToggleMapList from './ToggleMapList';

class ExploreList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      city: null,
      state: null
    };
    this.getStorages = this.getStorages.bind(this);
  }

  getStorages(searchParams) {
    fetch(`/api/storages-list/city/${searchParams.city}/state/${searchParams.state}`)
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({
          searchResults: data,
          city: searchParams.city,
          state: searchParams.state
        });
      })
      .catch(err => {
        return err;
      });
  }

  componentDidUpdate() {
    if (this.state.city === this.props.match.params.city && this.state.state === this.props.match.params.state) {
      return;
    }
    const searchParams = {
      city: this.props.match.params.city,
      state: this.props.match.params.state
    };
    this.getStorages(searchParams);
  }

  componentDidMount() {
    const searchParams = {
      city: this.props.match.params.city,
      state: this.props.match.params.state
    };
    this.getStorages(searchParams);
  }

  render() {
    const searchResults = this.state.searchResults;
    if (searchResults.length === 0) {
      return (
        <React.Fragment>
          <div className="container explore-list">
            <div className="row">
              <div className="col-1 col-md-2"></div>
              <div className="col-10 col-md-8">
                <h3>0 Results Found</h3>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      const results = searchResults.map(item => {
        return (
          <ListItem
            key={item.storageId}
            imageUrl={item.storagePicturePath}
            title={item.title}
            price={item.pricePerDay}
            height={item.height}
            width={item.width}
            depth={item.depth}
            storageId={item.storageId} />
        );
      });

      return (
        <React.Fragment>
          <ToggleMapList />
          <div className="container explore-list">
            <div className="row">
              <div className="col-1 col-md-2"></div>
              <div className="col-10 col-md-8">
                <h3>
                  {this.state.searchResults.length} listings found
                </h3>

              </div>
            </div>
            <div className="row">
              <div className="col-1 col-md-2"></div>
              <div className="col-10 col-md-8">
                {results}
              </div>
              <div className="col-1 col-md-2"></div>
            </div>
          </div>
        </React.Fragment>
      );

    }
  }
}

export default withRouter(ExploreList);
