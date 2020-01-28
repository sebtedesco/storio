import React from 'react';
import ListItem from './ListItem';

class ExploreList extends React.Component {

  render() {
    if (this.props.listings.length === 0) {
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
      const results = this.props.listings.map(item => {
        return <ListItem key={item.storageId} imageUrl={item.storagePicturePath} title={item.title} price={item.pricePerDay} height={item.height} width={item.width} depth={item.depth} storageId={item.storageId} />;
      });

      return (
        <React.Fragment>
          <div className="container explore-list">
            <div className="row">
              <div className="col-1 col-md-2"></div>
              <div className="col-10 col-md-8">
                <h3>
                  {this.props.listings.length} listings found
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

export default ExploreList;
