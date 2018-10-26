import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = address => {
    this.setState({ address });
  };

  componentWillReceiveProps(nextProps){
    this.handleChange(nextProps.initValue);
  }

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .then(results => this.handleNewSelect(address))
      .catch(error => console.error('Error', error));
  };

  handleNewSelect(address){
    this.setState({ address });
    this.props.onChange(address)
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Where they're coming from..",
                className: 'location-search-input',
              })}
            style={{textAlign: 'center', outline: 'none'}}/>
            <div className="autocomplete-dropdown-container" style={{fontSize: '15px'}}>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: 'transparent', cursor: 'pointer' }
                  : { backgroundColor: 'transparent', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
