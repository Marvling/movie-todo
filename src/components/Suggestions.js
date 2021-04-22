import React from 'react'

function Suggestions(props) {
    const onClick = e => {
        e.preventDefault()
        console.log(e.target.innerText)
        //TODO: lift state up to the searchbar component
    }

    //defining a varaible for conditional rendering
    let suggestionsListComponent;

    if (props.suggestionArray.length > 0) {

            //spreading the names of the suggestionArray to <li> tag
            const suggested = props.suggestionArray.map(movie => 
            <li onClick={onClick}>{movie.original_title}</li>)
            
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