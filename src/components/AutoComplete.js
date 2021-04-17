import React, {Component, Fragment} from 'react'
import '../style.css'

class AutoComplete extends Component {

    constructor(props){
        super(props);

        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: ''
        }
    }

    onChange = event => {

        const { suggestions } = this.props;
        const userInput = event.target.value

        const filteredSuggestions = suggestions.filter(
            suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        )

        this.setState({
            activeSuggestion: 0,
            filteredSuggsetions: filteredSuggestions,
            showSuggextions:true,
            userInput: event.target.value
        })

    }

    onClick = event => {

        this.setState({
            activeSuggestion: 0,
            filteredSuggsetions: [],
            showSuggextions: true,
            userInput: event.currentTarget.innerText
        })
        
    }

    onKeyDown = event => {
        
        const { activeSuggestion, filteredSuggestions} = this.state;

        if (event.keyCode === 'Enter') {

            this.setState({
              activeSuggestion: 0,
              showSuggestions: false,
              userInput: filteredSuggestions[activeSuggestion]
            });

          } else if (event.keyCode === 'ArrowUp') {
            if (activeSuggestion === 0) {
              return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });

          }
          // User pressed the down arrow, increment the index
          else if (event.keyCode === 'ArrowDown') {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
              return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
          }
        };

    render() {

        //Enabling accesiing varaibles without .this
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
            activeSuggestion,
            filteredSuggestions,
            showSuggestions,
            userInput
            }
        } = this;
        
        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul class="suggestions">
                        {filteredSuggestions.map((suggesiton, index) => {
                            let className;

                            // flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = 'suggesion-active'
                            }
                            return (
                                <li className={className} keyt={suggesiton} onClick={onClick}>
                                    {suggesiton}
                                </li>
                            )
                        })}
                    </ul>
                )
            } else {
                suggestionsListComponent = (
                    <div class='no-suggestions'>
                        <em>No Suggestions available</em>
                    </div>
                )
            }
        }

        return (
            <Fragment>
              <input
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
              />
              {suggestionsListComponent}
            </Fragment>
          );
    }
        
}

export default AutoComplete