// User List component for catwip

import React from 'react';
import './UserList.css';
import { User } from '../User/User';

export class UserList extends React.Component {
  constructor(props){
    super(props);
    this.state = {list: [], id:0}
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  randomColor(){
    return "hsl(" + 360 * Math.random() + ',' +
                     (25 + 70 * Math.random()) + '%,' +
                     (85 + 10 * Math.random()) + '%)';
  }

  newUser(){
    return {
      name: "",
      address: "",
      travelType: "",
      usercolor: 0,
      colorh: 360 * Math.random(),
      colors: 25 + 70 * Math.random(),
      colorl: 85 + 10 * Math.random(),
      id: this.state.id,
      usercolor: ""
    }
  }

  addUser(){
    //If I don't do it this way the app actually just fucks itself
    let user = this.newUser();
    user.usercolor = "hsl("+user.colorh+','+user.colors+'%,'+user.colorl+'%)';
    let newList = this.state.list.concat(user);
    this.setState({ list: newList, id:this.state.id+1 });
  }

  removeUser(key){
    let newList = [];
    for(let i=0; i<=this.state.list.length-1; i++){
      if(this.state.list[i].id !== key) {
        newList.push(this.state.list[i]);
      }
    }
    this.setState({ list: newList });
  }

  render () {
    const list = this.state.list.map((user, index)=> {
      return <User name={user.name} travelType={user.travelType} address={user.address} usercolor={user.usercolor} key={user.id} id={user.id} onRemove={this.removeUser}/>
    })
    return (
      <div>
        <div className="list">{list}<button className="button" onClick={this.addUser}>+</button></div>
      </div>
    )
  }
}
