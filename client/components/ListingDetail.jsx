import React from 'react';

export default class ListingDetail extends React.Component {
  render() {
    // const data = this.props.data;
    const hardCodedData01 = {
      userId: 1,
      firstName: 'Brian',
      lastName: 'Wilson',
      profilePicturePath: './images/users/brian-wilson.jpg',
      storagePicturePath: './images/storages/car-garage.jpg',
      city: 'Laguna Beach',
      state: 'CA',
      title: 'Clean space in lodge of garage',
      longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur luctus justo est, quis posuere lorem ultricies vitae. Sed ut turpis posuere, laoreet diam id, lacinia nisl. Curabitur nec est a metus blandit lobortis.',
      maxValue: 1000000,
      pricePerDay: 300
    };
    const data = hardCodedData01;
    return (
      <div className='col-12 list-detail my-auto'>
        <div className='col-12 storage-image-container'>
          <img
            className='list-detail-storage-image'
            src={data.storagePicturePath}
            alt='storage-image should be here'
          />
        </div>
        <div className='list-detail-title'>{data.title}</div>
        <div className='location-and-user-profile'>
          <div className='list-detail-address'>{`${data.city}, ${data.state}`}</div>
          <div className='list-detail-host-profile'>
            <div className='host-image-container'>
              <img
                className='list-detail-host-picture'
                src={data.profilePicturePath}
                alt='host-profile-image should be here'
              />
            </div>
            <div className='list-detail-host-full-name'>{`${data.firstName} ${data.lastName}`}</div>
          </div>
        </div>
        <div className='storage-details'>
          <div className='long-description-title'>About the space</div>
          <div className='long-description'>{data.longDescription}</div>
          <div className='max-coverage'>
            <div className='list-detail-max-coverage-title'>Maximum value allowed: </div>
            <div className='max-value'>{` $ ${(data.maxValue / 100)}`}</div>
          </div>
          <div className='price-container'>
            <div className='list-detail-price'>Price:</div>
            <div>{`$${(data.pricePerDay * 7 / 100).toFixed(2)}/wk, $${(data.pricePerDay * 30 / 100).toFixed(2)}/month`}</div>
          </div>
        </div>
      </div>
    );
  }
}
