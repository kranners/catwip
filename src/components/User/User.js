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
      clicked: 'nothing',
      onSelect: this.props.onSelect,
      editing: false,
      edittext: ""
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleTransportChange = this.handleTransportChange.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.handleHoverOn = this.handleHoverOn.bind(this);
    this.handleHoverOff = this.handleHoverOff.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState(currentState => ({
      name: nextProps.name,
      address: nextProps.address,
      travelType: nextProps.travelType,
      editing: nextProps.edited
    }), () => {});
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
    var user = {
      name:this.state.name,
      address:this.state.address,
      travelType:this.state.travelType,
      usercolor:this.state.usercolor,
      id:this.state.id
    };
    this.props.onSelect(user);
  }

  render() {
    return (
      <div className="User" id="container" onMouseOver={this.handleHoverOn} onMouseOut={this.handleHoverOff}>
        <div className={(this.state.hover ? ' hover' : ' nohover')} id={ this.state.fade ? 'fade' : '' }>
          <div className={"portrait "+(this.state.click)} style={{backgroundColor: this.state.usercolor}} onClick={this.handleClick}><a id="name">{this.state.name+this.state.edittext}</a></div>
          <button ref='button' id="closebutton" onClick={this.fadeOut}>{this.state.hover ? 'x' : ''}</button>
        </div>
      </div>
    )
  }
}
