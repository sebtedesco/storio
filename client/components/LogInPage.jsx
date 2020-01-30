import React from 'react';

class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const userName = event.target.value;
    this.setState({ userName: userName });
  }

  render() {
    return (
      this.props.user === 'guest'
        ? (
          <div className='mt-5'>
            <div className='mb-3'>You are {`${this.props.user}`}. Would you like to log in?</div>
            <form
              onSubmit={event => {
                event.preventDefault();
                this.props.tryLogIn(this.state.userName);
              }}
              className='d-flex flex-column col-4 mx-auto'
            >
              <input
                type="text"
                name='user-name'
                id='user-name'
                value={this.state.userName}
                // placeholder='Enter your user name'
                placeholder='Enter your email address'
                onChange={this.handleChange}
                className='form-control'
              />
              <button
                onClick={() => { this.props.tryLogIn(this.state.userName); }}
                className='btn btn-large btn-outline-light list-it-button mt-3'
              >
                Log In!
              </button>
            </form>
          </div>
        )
        : <h3>Welcome Back ! {`${this.props.user.userName}`}</h3>
    );
  }
}

export default LogInPage;
