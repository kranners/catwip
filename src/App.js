import React, { Component } from 'react';
import './App.css';
import { UserList } from './components/UserList/UserList';
import { MoodSlide } from './components/MoodSlide/MoodSlide';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {selectedUser: {}, userMade: false, userSelected:false, editUser : false};
    this.selectUser = this.selectUser.bind(this);
    this.firstToggle = this.firstToggle.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
  }

  selectUser(user) {
    let newUser = user;
    this.setState(currentState => ({ selectedUser: user, userSelected : true }), () => {});
  }

  firstToggle(arg){
    if (arg === false) {
      this.setState({userSelected:false});
    }
    this.setState({userMade : arg});
  }

  handleUserChange(user){
    this.setState({selectedUser: user, editUser: true});
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <MoodSlide onChange={this.handleUserChange} selectedUser={this.state.selectedUser} userMade={this.state.userMade} userSelected={this.state.userSelected}/>
          <UserList editUser={this.state.editUser} selectedUser={this.state.selectedUser} onSelect={this.selectUser} firstUser={this.firstToggle}/>
        </div>
      </div>
    );
  }
}

export default App;
