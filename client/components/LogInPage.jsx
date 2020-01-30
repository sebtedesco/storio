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
            <div className='mb-3'>You are logged in as a {`${this.props.user}`}. Would you like to log in?</div>
            <form
              onSubmit={event => {
                event.preventDefault();
                this.setState({ userName: '' });
                this.props.tryLogIn(this.state.userName);
              }}
              className='d-flex flex-column mx-auto col-12 align-items-center'
            >
              <input
                type="text"
                name='user-name'
                id='user-name'
                value={this.state.userName}
                // placeholder='Enter your user name'
                placeholder='Enter your email address'
                onChange={this.handleChange}
                className='form-control col-6'
              />
              <button
                onClick={() => { this.props.tryLogIn(this.state.userName); }}
                className='btn btn-large btn-outline-light list-it-button mt-3 col-4'
              >
                Log In!
              </button>
            </form>
          </div>
        )
        : (
          <>
            <h3>Welcome Back ! {`${this.props.user.userName}`}</h3>
            <button
              onClick={() => { this.props.signOut(); }}
              className='btn btn-large btn-outline-light list-it-button mt-3 col-4'
            >
              Good Bye~
            </button>
          </>
        )
    );
  }
}

export default LogInPage;
