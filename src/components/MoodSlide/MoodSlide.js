// Mood Slide component for catwip

import React from 'react';
import './MoodSlide.css';
import {LocationSearchInput} from '../../util/LocationSearchInput';
import {TransportChanger} from '../TransportChanger/TransportChanger';
import {MoodChanger} from '../MoodChanger/MoodChanger';

export class MoodSlide extends React.Component {
  constructor(props){
    super(props);
    this.state = {transportChoice:"car", selectedUser:this.props.selectedUser, mood:'bar', workingOn:'user'}
    this.handleTransportChange = this.handleTransportChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleMoodChange = this.handleMoodChange.bind(this);
    this.handleEventMade = this.handleEventMade.bind(this);
  }

  componentWillReceiveProps(nextProps){
    let newUser = nextProps.selectedUser;
    this.setState(currentState => ({ selectedUser: newUser }), () => {});
  }

  handleMoodChange(newMood){
    this.setState(currentState => ({ mood : newMood }), () => {});
    this.props.moodChange(newMood);
  }

  handleTransportChange(choice){
    let newUser = this.state.selectedUser;
    newUser.travelType = choice;
    this.setState({transportChoice:choice, selectedUser:newUser});
    this.props.onChange(this.state.selectedUser);
  }

  handleNameChange(event){
    let newUser = this.state.selectedUser;
    newUser.name = event.target.value;
    this.setState({selectedUser:newUser});
    this.props.onChange(this.state.selectedUser);
  }

  handleAddressChange(address, lat, lng){
    let newUser = this.state.selectedUser;
    newUser.address = address;
    newUser.lat = lat;
    newUser.lng = lng;
    this.setState({selectedUser:newUser});
    this.props.onChange(this.state.selectedUser);
  }

  handleEventMade(){
    this.props.makeEvent(this.state.mood);
  }

  render() {
    return (
      <div className="wrapper" style={{backgroundColor : (this.state.selectedUser.usercolor ? this.state.selectedUser.usercolor : "f1f1f1")}}>
      <div className={"slide"+(this.props.userSelected ? " pause" : "")}>
        <a className="title" style={{fontFamily: 'Gilroy-ExtraBold'}}>catwip.</a>
        <div className={"inputForm"+(this.props.userSelected && this.props.userMade ? "" : " hidden")}>
          <div><input className="name" placeholder="Their name.." value={this.props.userSelected ? this.state.selectedUser.name : this.value} onChange={this.handleNameChange.bind(this)}></input></div>
          <LocationSearchInput initValue={this.state.selectedUser.address} onChange={this.handleAddressChange}/>
          <div className="transport"><TransportChanger initValue={this.state.selectedUser.travelType} onChange={this.handleTransportChange}/></div>
        </div>
        <div className="centerText"><a>{this.props.userMade ? "" : "Start by adding someone!"}</a></div>
        <div className={"moodForm"+(this.props.userSelected && this.props.userMade ? "" : " hidden")}>
          <MoodChanger onChange={this.handleMoodChange}/>
        </div>
        <div className="buttonWrapper">
          <button className={"goButton"+(this.props.userSelected && this.props.userMade ? "" : " hidden")} onClick={this.handleEventMade}>{"Let's go!"}</button>
        </div>
      </div>
      <a className="subtitle">Made with ❤️ by Aaron Pierce</a>
      </div>
    )
  }
}
