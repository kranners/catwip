import React, { Component } from 'react';
import './App.css';
import { UserList } from './components/UserList/UserList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>catwip</h1>
        <UserList className="App"/>
      </div>
    );
  }
}

export default App;
