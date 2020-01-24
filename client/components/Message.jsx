import React from 'react';

class Message extends React.Component {
  render() {
    const messagesHardCoded01 = [
      {
        messageId: 1,
        fromId: 1,
        toId: 2,
        message: 'Hi'
      }, {
        messageId: 2,
        fromId: 2,
        toId: 1,
        message: 'Hello back to you~'
      }, {
        messageId: 3,
        fromId: 1,
        toId: 2,
        message: 'By the way....'
      }, {
        messageId: 5,
        fromId: 1,
        toId: 2,
        message: 'I would like to rent your storio place'
      }, {
        messageId: 10,
        fromId: 2,
        toId: 1,
        message: 'Access Denied!!!'
      }
    ];
    const allMessages = messagesHardCoded01.map(messageObject => {
      return (
        <SingleMessage message={messageObject.message} key={messageObject.messageId} fromId={messageObject.fromId}/>
      );
    });

    return (
      <div>{allMessages}</div>
    );
  }
}

function SingleMessage(props) {
  const loggedInUserId = 1;
  const classToApply = props.fromId === loggedInUserId ? ' message-by-logged-in-user' : ' message-by-other';
  return (
    <div className={`col-12${classToApply}`}>
      <div className='message p-3 my-2'>{props.message}</div>
    </div>
  );
}

export default Message;
