import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import {   fetchNotes } from "../actions";

import gv from '../util/globalVariable'


const serverURL = gv.SERVER_PATH || "http://localhost:9000/";
// const LOGIN_PATH = "auth/login";

// const cv = require('../util/globalVariable')

const initialUser = {
  username: '',
  password: '',
};

 class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { ...initialUser },
      message: '',
    };
  }

  inputHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ user: { ...this.state.user, [name]: value } });
  }

  submitHandler = (event) => {
    event.preventDefault();

// console.log('Login submitHandler process.env.SERVER_PATH =',    process.env.SERVER_PATH);
    axios.post(`${serverURL}${gv.LOGIN_PATH}`, this.state.user)
      .then((res) => {
        if (res.status === 200 && res.data) {
            console.log('login.js token = ', res.data); 
            
          localStorage.setItem('secret_token', res.data);
          
          this.props.handleLogin();

          this.props.history.push('/');
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        this.setState({
          message: 'Authentication failed.',
        
        });
      });


      
  }

  render() {
  
    return (
      <div className = "login">
           { this.state.message
          ? (<h4>{this.state.message}</h4>)
          : undefined
        }
        <form onSubmit={this.submitHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={this.state.user.username}
            onChange={this.inputHandler}
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={this.state.user.password}
            onChange={this.inputHandler}
          />
          <button type="submit">Submit</button>
        </form>
   
      </div>

    );
  }
}



export default Login

