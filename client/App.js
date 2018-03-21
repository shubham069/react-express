import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import { Link } from 'react-router-dom';
import CreateEvent  from './CreateEvent';

class App extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    fetch('/login')
      .then(res => res.json())
      .then(users => this.setState({ users }));
      <CreateEvent/>
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p>Respon</p>
        <p className="App-intro">{this.state.response}</p>
        <a href ="http://localhost:3001/login">Visit W3Schools</a>
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
        
      </div>

    );
  }
}

export default App;
