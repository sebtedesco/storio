import React from 'react';
import { withRouter } from 'react-router-dom';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      messageToSend: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getMessages = this.getMessages.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const messageObject = { message: this.state.messageToSend };
    if (!messageObject.message) {
      // eslint-disable-next-line no-console
      console.log('Cannot send empty string');
      return;
    }
    const currentUserId = this.props.user.userId;
    const hostId = parseInt(this.props.match.params.hostId, 10);
    if (currentUserId === hostId) {
      // eslint-disable-next-line no-console
      console.log('Cannot send message to yourself!!');
      return;
    }
    messageObject.signedInUserId = currentUserId;
    messageObject.correspondentUserId = hostId;
    const headersToSend = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageObject)
    };
    fetch('/api/messages/', headersToSend)
      .then(result => result.json())
      .then(jsonData => {
        this.setState(previousState => {
          var newMessages = previousState.messages;
          newMessages.push(jsonData);
          return ({
            messages: newMessages,
            messageToSend: ''
          });
        });
      })
      .catch(err => console.error(err));
  }

  handleChange(event) {
    const userInput = event.target.value;
    this.setState({ messageToSend: userInput });
  }

  getMessages() {
    fetch(`/api/messages/${this.props.match.params.loggedInUserId}/${this.props.match.params.hostId}`)
      .then(result => result.json())
      .then(jsonData => {
        this.setState({
          messages: jsonData
        });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getMessages();
  }

  render() {
    const allMessages = !this.state.messages
      ? (
        <div>
          <div className="col-12">
            <i
              className="far fa-arrow-alt-circle-left col-12 back-arrow pl-0 ml-0 mb-2"
              onClick={() => {
                this.props.history.goBack();
              }}
            ></i>
          </div>
          <div>No messages to display</div>
          <div onClick={this.getMessages} className='sync-button'>
            <i className="fas fa-sync my-3 sync-button-icon"></i>
          </div>
        </div>
      )
      : this.state.messages.map(messageObject => {
        return (
          <SingleMessage
            message={messageObject.message}
            key={messageObject.messageId}
            fromId={messageObject.fromId}
            loggedInUserId={this.props.user.userId}/>
        );
      });

    return (
      <>
        {!allMessages ? (
          allMessages
        ) : (
          <>
            <div className="col-12 mt-12">
              <i
                className="far fa-arrow-alt-circle-left col-12 back-arrow pl-0 ml-0 mb-2"
                onClick={() => {
                  this.props.history.goBack();
                }}
              ></i>
            </div>
            <div>{allMessages}</div>
            <div onClick={this.getMessages} className="sync-button">
              <i className="fas fa-sync my-3 sync-button-icon cursor-pointer"></i>
            </div>
          </>
        )}
        <form onSubmit={this.handleSubmit} className="col-12 message-form">
          <input
            type="text"
            placeholder="Type message here"
            value={this.state.messageToSend}
            onChange={this.handleChange}
            className="col-10 mx-2 mt-2 message-input"
            cols="32"
          />
          <div onClick={this.handleSubmit}>
            <i className="mt-2 fas fa-arrow-alt-circle-right send-message-button"></i>
          </div>
        </form>
      </>
    );
  }
}

function SingleMessage(props) {
  const messageClassToApply = props.fromId === props.loggedInUserId ? ' message-by-logged-in-user' : ' message-by-other';
  const messageTail = props.fromId === props.loggedInUserId ? ' right-arrow' : ' left-arrow';
  return (
    <div className={`col-12${messageClassToApply}`}>
      <div className='message p-3 my-2'>{props.message}</div>
      <div className={messageTail}></div>
    </div>
  );
}
export default withRouter(Message);
