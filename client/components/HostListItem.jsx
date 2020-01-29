import React from 'react';
import { Link } from 'react-router-dom';

function HostListItem(props) {
  return (
    <div className="card host-list-item">
      <Link to={`/listing-detail/${props.storageId}`}>
        <div className="row d-flex">
          <div className="col-4">
            <img src={props.imageUrl} className="card-img host-list-image" alt="host listing photo"/>
          </div>
          <div className="col-8">
            <div className="card-body">
              <p className="card-title">{props.title}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HostListItem;
