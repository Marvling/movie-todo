import React from 'react'

function Suggestions(props) {

    //defining a varaible for conditional rendering
    let suggestionsListComponent;

    //If .fetch returned any results the array will be populated
    if (props.suggestionArray.length > 0) {

            //spreading the names of the suggestionArray to <li> tag
            const suggested = props.suggestionArray.map((movie, index) => 

            //onClick calls the setQuery function which updates the query state to the list innerText
            <li 
                className={'hover:bg-purple-700 hover:text-white'}
                onClick={props.setQuery}
                key = {index}
                id = {movie.id}>
                {movie.original_title} - {movie.release_date.slice(0, 4)}
            </li>)
            
            //setting the listComponent with the <li> tags
            suggestionsListComponent = (
            <ul>
                {[...suggested]}
            </ul>)
            
        } else {

            //setting the listComponent to display a message
            suggestionsListComponent = (
                <div className='no-suggestions'>
                    <em>No Suggestions available</em>
                </div>
            )
        }
        

    return(
        suggestionsListComponent
    )
}

export default Suggestions