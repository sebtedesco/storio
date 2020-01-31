import React from 'react';
import { withRouter, Link } from 'react-router-dom';

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
    const others = this.state.correspondents.map(otherPerson => {
      return (
        <Link key={otherPerson.userId} to={`/message/${this.props.match.params.loggedInUserId}/${otherPerson.userId}`}>
          <div className='col-10 mx-auto my-1 conversation-list-single-user'>
            <div className='conversation-list-profile-picture-container'>
              <img
                src={otherPerson.profilePicturePath}
                alt={`Picture of userId=${otherPerson.userId} should be here`}
                className='conversation-list-profile-picture'
              />
            </div>
            <div className='conversation-list-profile-name'>{`${otherPerson.firstName} ${otherPerson.lastName}`}</div>
          </div>
        </Link>
      );
    });
    return (
      <>
        <p className="text-muted" onClick={() => this.props.history.goBack()}>&lt; Back</p>
        <div className="d-flex flex-column conv">{others.length === 0 ? <h3>No conversations to list</h3> : others}</div>
      </>
    );
  }
}

export default withRouter(Conversations);
