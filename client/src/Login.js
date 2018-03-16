import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  };

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  };

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post('/auth/login', user)
      .then( result => {
        console.log(result.data)
        localStorage.setItem('mernToken', result.data.token)
        this.props.liftToken(result.data)
    }).catch( err => console.log(err) )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Email: <input type='text' value={this.state.email} onChange={this.handleEmailChange} /><br />
        Password: <input type='password' value={this.state.password} onChange={this.handlePasswordChange} /><br />
        <input type='submit' value='Log In!' />
        <a href="/auth/google">Sign In with Google!</a>
      </form>
    )
  }
}

export default Login;
