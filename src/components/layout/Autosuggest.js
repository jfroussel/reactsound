import React from 'react'
import Autosuggest from 'react-autosuggest';
import SearchIcon from '../../assets/search.svg'




const names = [
    'Jazz',
    'Funk',
    'Blues',
    'Pop',
    'Rock',
    'Hard rock',
    'Classique',
    'Country',
    'Reggae',
    'Ambient',
    'Ballade',
    'Cinematic',
    'Drum n bass',
    'Easy listening',
    'Electro',
    'Epic trailer',
    'Folk',
    'Hip-hop',
    'Latin',
    'Metal',
    'Orchestral',
    'World music',  
  ];


// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return names.filter(name => regex.test(name));
}

const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => suggestion;

const renderInputComponent = inputProps => (
  <div className="inputContainer">
    <img className="icon" src={SearchIcon} alt='finder' />
    <input {...inputProps} />
  </div>
);

class AutoSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }

  

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "   Search By Genre or Mood ...",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        renderInputComponent={renderInputComponent}
      />
    );
  }
}

export default AutoSearch