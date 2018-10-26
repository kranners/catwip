// User List component for catwip

import React from 'react';
import './UserList.css';
import { User } from '../User/User';

export class UserList extends React.Component {
  constructor(props){
    super(props);
    this.state = {list: [], id:0, button: ' show', newUserInfo:{}};
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  componentWillReceiveProps(nextProps){
    let newUser = nextProps.selectedUser;
    let oldList = this.state.list;
    let pos = oldList.map(function(e) {
      return e.id;
    }).indexOf(newUser.id);
    if (pos > -1){
      for(let i=0; i<oldList.length; i++){
        if(i === pos){
          oldList[pos] = newUser;
          oldList[pos].edited = true;
        } else {
          oldList[i].edited = false;
        }
      }
    }
    if (oldList !== this.state.list){
      this.setState({list: oldList});
    }
  }

  newUser(){
    return {
      name: "",
      address: "",
      travelType: "car",
      usercolor: "hsl("+(360 * Math.random())+','+(25 + 70 * Math.random())+'%,'+(85 + 10 * Math.random())+'%)',
      id: this.state.id,
      edited: false
    }
  }

  addUser(){
    //If I don't do it this way the app actually just fucks itself
    let user = this.newUser();
    let newList = this.state.list.concat(user);
    this.setState({ list: newList, id:this.state.id+1 });
    if(this.state.list.length >= 19) {
      this.setState ({ button: " noshow" });
    } else {
      this.setState ({ button: " show" });
    }
    this.props.firstUser(true);
  }

  removeUser(key){
    let newList = [];
    for(let i=0; i<=this.state.list.length-1; i++){
      if(this.state.list[i].id !== key) {
        newList.push(this.state.list[i]);
      }
    }
    this.setState({ list: newList, button: " show" });
    if(this.state.list.length == 0){
      this.props.firstUser(false);
    }
  }

  render () {
    const list = this.state.list.map((user, index)=> {
      return <User edited={user.edited} name={user.name} travelType={user.travelType} address={user.address} usercolor={user.usercolor} key={user.id} id={user.id} onRemove={this.removeUser} onSelect={this.props.onSelect}/>
    })
    return (
      <div>
        <div className="list">{list}<button className={"button"+(this.state.button)} onClick={this.addUser}>+</button></div>
      </div>
    )
  }
}
