// Mood Slide component for catwip

import React from 'react';
import './TransportChanger.css';

export class TransportChanger extends React.Component {
  constructor(props){
    super(props);
    this.state = {choice:this.props.initValue};
    this.handleChange = this.handleChange.bind(this);
    this.props.onChange("car");
  }

  componentWillReceiveProps(nextProps){
    let newChoice = nextProps.initValue;
    this.setState(currentState => ({ choice : newChoice }), () => {});
  }

  handleChange (){
    switch (this.state.choice) {
      case "car":
        this.setState({choice:"public"});
        this.props.onChange("public");
      break;
      case "public":
        this.setState({choice:"bike"});
        this.props.onChange("bike");
      break;
      case "bike":
        this.setState({choice:"walk"});
        this.props.onChange("walk");
      break;
      case "walk":
        this.setState({choice:"car"});
        this.props.onChange("car");
      break;
    }
  }

  render () {
    return (
      <div>
        <figure onClick={this.handleChange} className={this.state.choice}></figure>
      </div>
    );
  }
}
