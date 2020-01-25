import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: null,
      messageToSend: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const messageObject = { message: this.state.messageToSend };
    if (!messageObject.message) {
      // eslint-disable-next-line no-console
      console.log('Cannot send empty string');
      return;
    }
    messageObject.fromId = this.props.loggedInUserId;
    messageObject.toId = this.props.correspondentId;
    const headers = {
      method: 'POST',
      'Content-Type': 'application/JSON',
      body: JSON.stringify(messageObject)
    };
    fetch('/api/message/', headers)
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

  componentDidMount() {
    fetch(`/api/messages/${this.props.loggedInUserId}/${this.props.correspondentId}`)
      .then(result => result.json())
      .then(jsonData => {
        this.setState({
          messages: jsonData
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const allMessages = !this.state.messages
      ? <div>No messages to display</div>
      : this.state.messages.map(messageObject => {
        return (
          <SingleMessage message={messageObject.message} key={messageObject.messageId} fromId={messageObject.fromId} loggedInUserId={this.props.loggedInUserId}/>
        );
      });

    return (
      <>
        {
          !allMessages
            ? allMessages
            : <div>{allMessages}</div>
        }
        <form onSubmit={this.handleSubmit} className="col-12 message-form">
          <input
            type="text"
            placeholder="Type message here"
            value={this.state.messageToSend}
            onChange={this.handleChange}
            className='col-10 mr-4'/>
          <div onClick={this.handleSubmit}><i className="fas fa-arrow-alt-circle-right send-message-button"></i></div>
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

export default Message;
