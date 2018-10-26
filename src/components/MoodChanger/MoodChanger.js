import React from 'react';
import './MoodChanger.css';

const icon = 'https://image.flaticon.com/icons/png/128/2/2046.png';

export class MoodChanger extends React.Component {
  constructor(props){
    super(props);
    this.state = {choice:"A... crazy night out", spin: ""}
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (){
    this.setState({spin:"spin"});
    setTimeout(() => {
          this.setState({
            spin: ""
          })
        }, 500);
    switch(this.state.choice){
      case "A... crazy night out":
        this.setState({choice:"A... romantic date"});
        this.props.onChange("date");
        break;
      case "A... romantic date":
        this.setState({choice:"A... party with friends"});
        this.props.onChange("party");
        break;
      case "A... party with friends":
        this.setState({choice:"A... casual lunch out"});
        this.props.onChange("lunch");
        break;
      case "A... casual lunch out":
        this.setState({choice:"A... family gathering"});
        this.props.onChange("gathering");
        break;
      case "A... family gathering":
        this.setState({choice:"A... crazy night out"});
        this.props.onChange("club");
        break;
    }
  }

  render () {
    return (
      <div className="megawrapper">
        <a className="moodtext" style={{opacity: 0.5, userSelect:'none'}}>Change the mood!</a>
        <div className="moodwrapper">
          <div className="left"><figure className={this.state.spin} onClick={this.handleClick}></figure></div>
          <div className="right"><a className="textbox">{this.state.choice}</a></div>
        </div>
      </div>
    );
  }
}
