import React from 'react';
import './User.css';
import {LocationSearchInput} from '../../util/LocationSearchInput.js'

export class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.name,
      travelType: this.props.travelType,
      address: this.props.address,
      usercolor: this.props.usercolor,
      id: this.props.id,
      fade: false,
      hover: false,
      clicked: false,
      colorh: this.props.colorh,
      colors: this.props.colors
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleTransportChange = this.handleTransportChange.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.handleHoverOn = this.handleHoverOn.bind(this);
    this.handleHoverOff = this.handleHoverOff.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  //This method handles name changes for individual users
  handleNameChange(event) {
    this.setState({name: event.target.value})
  }

  //This method handles address changes for individual users
  handleAddressChange(event) {
    this.setState({address: event.target.value})
  }

  //This method handles transport type changes for individual users
  handleTransportChange(event) {
    this.setState({travelType: event.target.value})
  }

  fadeOut(){
    // Play the fade out animation!
    this.setState({fade: true});
    setTimeout(() => {
      this.props.onRemove(this.state.id);
    }, 300);
  }

  handleHoverOn(){
    this.setState({ hover: true });
  }

  handleHoverOff(){
    this.setState({ hover: false, click: false });
  }

  handleClick(){
    this.setState({ click: this.state.click ? false : true });
  }

  render() {
    return (
      <div className="User" id="container" onMouseOver={this.handleHoverOn} onMouseOut={this.handleHoverOff}>
        <div className={(this.state.hover ? ' hover' : ' nohover')} id={ this.state.fade ? 'fade' : '' }>
          <div className={"portrait"+(this.state.click ? " clicked" : " notclicked")} style={{backgroundColor: this.state.usercolor}} onClick={this.handleClick}></div>
          <input type="text" id="name" color={("hsl("+this.state.colorh+"%, "+this.state.colors+"%, 20%")}placeholder={this.state.click ? "Their name..." : ""} onChange={this.handleNameChange} />
          <button ref='button' id="closebutton" onClick={this.fadeOut}>{this.state.hover ? 'x' : ''}</button>
        </div>
      </div>
    )
    /*return (
      <div className="User">
        <div className="container">
          <div className="portrait" style={{backgroundColor: this.state.usercolor}}></div>
          <input type="text" id="name" placeholder={this.state.id} onChange={this.handleNameChange} />
        </div>
        <div className="container">
          <LocationSearchInput onChange={this.handleAddressChange}/>
        </div>
        <div className="container">
          <select id="transport" name="transport" onChange={this.handleTransportChange} >
            <option value="car">Car</option>
            <option value="public">Public Transport</option>
            <option value="bike">Bicycle</option>
            <option value="walk">Walking</option>
          </select>
          <img className="icon" src={deleteSrc} alt='delete'/>
          <img className="icon" src={duplicateSrc} alt='duplicate' />
        </div>
      </div>
    )*/
  }
}
