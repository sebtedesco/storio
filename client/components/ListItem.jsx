import React from 'react';
import { Link } from 'react-router-dom';

function ListItem(props) {
  return (
    <Link to={`/listing-detail/${props.storageId}`}>
      <div className="card list-item">
        <img src={props.imageUrl} className="card-img-top list-item-image" alt="photo for listing" />
        <div className="card-body">
          <p className="card-text">{props.title}</p>
          <div className="card-title">${(props.price / 100).toFixed(2)}/day</div>
          <p className="card-text">{props.height}&apos; &times; {props.width}&apos;</p>
        </div>
      </div>
    </Link>
  );
}

export default ListItem;
