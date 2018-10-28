import React, { Component } from 'react';
import './App.css';
import { UserList } from './components/UserList/UserList';
import { MoodSlide } from './components/MoodSlide/MoodSlide';
import { EventWindow } from './components/EventWindow/EventWindow';
import { Yelp } from './util/Yelp';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {lat: 0, lng: 0, selectedUser: {}, userMade: false, userSelected:false, editUser : false, mood:"bar", makeNow:false, categories:"", showWindow:" hidewindow initialwindow", business: {}, businessFound:false};
    this.selectUser = this.selectUser.bind(this);
    this.firstToggle = this.firstToggle.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.makeEvent = this.makeEvent.bind(this);
    this.pushEvent = this.pushEvent.bind(this);
    this.handleMoodChange = this.handleMoodChange.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.hideWindow = this.hideWindow.bind(this);
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

  handleMoodChange(newMood){
    this.setState({mood:newMood});
  }

  makeEvent(newMood){
    this.setState({mood:newMood, makeNow:true, showWindow : this.state.showWindow == " show" ? " hidewindow" : " show"});
  }

  hideWindow(){
    this.setState({showWindow:" hidewindow"});
    setTimeout(this.setState({businessFound:false, business:{}}), 300);
  }

  pushEvent(userList){
    this.setState({makeNow:false});
    let list = userList;
    let latlng = list.map(a => a.lat === undefined ? [0,0] : [a.lat, a.lng]);
    let travel = list.map(a => a.travelType);
    let weightedList = [];
    for(let i=0; i<list.length; i++){
      if(latlng[i][0] == 0){
        console.log("Pwogwam made a fucky wucky");
      } else {
        if(travel[i] === "car"){
          weightedList.push(latlng[i]);
        } else if(travel[i] === "public"){
          weightedList.push(latlng[i]);
          weightedList.push(latlng[i]);
        } else if(travel[i] === "bike"){
          weightedList.push(latlng[i]);
          weightedList.push(latlng[i]);
          weightedList.push(latlng[i]);
        } else if(travel[i] === "walk"){
          weightedList.push(latlng[i]);
          weightedList.push(latlng[i]);
          weightedList.push(latlng[i]);
          weightedList.push(latlng[i]);
        }
      }
    }
    let avglat = 0;
    let avglng = 0;
    let result = "";
    for(let i=0; i<weightedList.length; i++){
      avglat += weightedList[i][0];
      avglng += weightedList[i][1];
    }
    if(weightedList.length < 1){
      console.log("No valid address!!");
      alert("I can't find you a place to go if I don't know where you are!");
      this.hideWindow();
    } else {
      avglat = avglat/weightedList.length;
      avglng = avglng/weightedList.length;
      Yelp.search(this.state.mood, avglat, avglng).then(businesses => {
        this.handleEventChange(businesses[0]);
      });
    }
  }

  handleEventChange(newBusiness){
    console.log("This ran, business is :"+newBusiness.name);
    this.setState({business: newBusiness, businessFound: true})
  }

  render() {
    return (
      <div className="App">
        <div className={"eventWindow"+this.state.showWindow}><EventWindow business={this.state.business} businessFound={this.state.businessFound} /></div>
          <div className="container">
            <MoodSlide moodChange={this.handleMoodChange} makeEvent={this.makeEvent} onChange={this.handleUserChange} selectedUser={this.state.selectedUser} userMade={this.state.userMade} userSelected={this.state.userSelected}/>
            <UserList pushEvent={this.pushEvent} makeNow={this.state.makeNow} editUser={this.state.editUser} selectedUser={this.state.selectedUser} onSelect={this.selectUser} firstUser={this.firstToggle}/>
          </div>
        <div onClick={this.hideWindow} className={"filter"+(this.state.showWindow === " show" ? " fade" : " hidefilter")}></div>
      </div>
    );
  }
}

export default App;
