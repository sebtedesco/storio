import React from 'react';

function ListItem(props) {
  return (
    <div className="card list-item">
      <img src={props.imageUrl} className="card-img-top list-item-image" alt="photo for listing" />
      <div className="card-body">
        <p className="card-text">{props.title}</p>
        <div className="card-title">${props.price}/day</div>
        <p className="card-text">{props.height}&apos; &times; {props.width}&apos;</p>
      </div>
    </div>
  );
}

export default ListItem;
