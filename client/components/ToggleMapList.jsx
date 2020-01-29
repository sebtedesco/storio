import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class ToggleMapList extends React.Component {
  render() {
    var classForListButton = 'toggle-list-map-button';
    var classForMapButton = 'toggle-list-map-button';
    if (this.props.match.path.match(/list/)) {
      classForListButton += ' toggle-list-map-selected';
    } else {
      classForMapButton += ' toggle-list-map-selected';
    }
    return (
      <div className='toggle-list-map col-12'>
        <Link
          to={`/explore-list/${this.props.match.params.city}/${this.props.match.params.state}`}
        >
          <div className={classForListButton}>List</div>
        </Link>
        <Link
          to={`/explore-map/${this.props.match.params.city}/${this.props.match.params.state}`}
        >
          <div className={classForMapButton}>Map</div>
        </Link>
      </div>
    );
  }
}

export default withRouter(ToggleMapList);
