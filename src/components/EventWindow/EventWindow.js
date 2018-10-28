import React from 'react';
import './EventWindow.css';

export class EventWindow extends React.Component {
  constructor(props){
    super(props);
    this.state = {business:{imageSrc:"https://images.unsplash.com/photo-1525747489694-0e01dd364620?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=200&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=4deba8ca59a6c023d0fd62a028c2dab9"}, placeholderText:"Performing witchcraft...", businessFound:true};
    this.getImage = this.getImage.bind(this);
    this.openMap = this.openMap.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState(currentState => ({
      businessFound: nextProps.businessFound,
      business : nextProps.business,
      placeholderText: nextProps.businessFound ? "  Is this your card?" : "  Performing witchcraft...",
    }), () => {});
  }

  getImage(){
    if (this.state.businessFound){
      console.log("Image: "+this.state.business.imageSrc);
      return {
        background: `url(${this.state.business.imageSrc})`,
        backgroundSize: 'cover'
      }
    } else {
      return {}
    }
  }

  openMap(){
    window.open(`https://www.google.com/maps/search/?api=1&query=${this.state.business.latitude},${this.state.business.longitude}`, '_blank');
  }

  render () {
    return (
      <div className={"main "+this.state.businessFound}>
        <div className="placeholdertext">{this.state.placeholderText}</div>
        <div className="infoContainer">
          <div className="leftOne" style={this.getImage()}></div>
          <div className={"rightOne"+(this.state.businessFound ? "" : " hidden")}>
            <div className="businessName">{this.state.business.name}</div>
            <div className="businessCategory">{this.state.business.category}</div>
            <div className="businessAddress">{this.state.business.address}</div>
            <div className="businessAddress2">{this.state.business.state+" "+this.state.business.city+" "+this.state.business.zipCode}</div>
            <div className="businessReviews">{this.state.business.rating+"⭐ - "+this.state.business.reviewCount+" review"+(this.state.business.reviewCount > 1 ? "s" : "")}</div>
            <div className="mapEmoji"><div onClick={this.openMap}>🗺️</div>️</div>
          </div>
        </div>
      </div>
    )
  }
}
