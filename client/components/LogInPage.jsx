import React from 'react';

class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const email = event.target.value;
    this.setState({ email: email });
  }

  render() {
    return (
      this.props.user === 'guest'
        ? (
          <div className='mt-5'>
            <div className='mb-3'>You are logged in as{`${this.props.user}`}. Would you like to log in?</div>
            <form
              onSubmit={event => {
                event.preventDefault();
                this.setState({ email: '' });
                this.props.tryLogIn(this.state.email);
              }}
              className='d-flex flex-column mx-auto col-12 align-items-center'
            >
              <input
                type="text"
                name='user-name'
                id='user-name'
                value={this.state.email}
                placeholder='Enter your email address'
                onChange={this.handleChange}
                className='form-control col-6'
              />
              <button
                onClick={() => { this.props.tryLogIn(this.state.email); }}
                className='btn btn-large btn-outline-light list-it-button mt-3 col-4'
              >
                Log In!
              </button>
            </form>
          </div>
        )
        : (
          <div>
            <h3 className='mt-5'>Welcome Back ! {`${this.props.user.userName}`}</h3>
            <button
              onClick={() => { this.props.signOut(); }}
              className='btn btn-large btn-outline-light list-it-button mt-3 col-4'
            >
              Good Bye~
            </button>
          </div>
        )
    );
  }
}

export default LogInPage;
