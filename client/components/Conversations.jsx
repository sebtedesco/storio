import React from 'react';
import { withRouter } from 'react-router-dom';

class Conversations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correspondents: []
    };
  }

  componentDidMount() {
    fetch(`/api/conversations/signedInUserId/${this.props.match.params.loggedInUserId}`)
      .then(response => response.json())
      .then(jsonData => this.setState({ correspondents: jsonData }))
      .catch(err => console.error(err));
  }

  render() {
    const cards = this.state.correspondents.map(otherPerson => {
      return (
        <div key={otherPerson.userId} className='col-10 mx-auto my-5 conversation-list-single-user'>
          <div className='conversation-list-profile-picture-container'>
            <img
              src={otherPerson.profilePicturePath}
              alt={`Picture of userId=${otherPerson.userId} should be here`}
              className='conversation-list-profile-picture'
            />
          </div>
          <div className='conversation-list-profile-name'>{`${otherPerson.firstName} ${otherPerson.lastName}`}</div>
        </div>
      );
    });
    return (
      <div>{cards}</div>
    );
  }
}

export default withRouter(Conversations);
