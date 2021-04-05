import React from 'react'

function ToDoItem(props) {
    return(
    <div>
        <input         
        type='checkbox' 
        id={props.name}
        checked={props.todoObject.isWatched}
        />

        <label 
            htmlFor={props.todoObject.name}
            // Tailwind Styles
            className = "bg-green-500">
                {props.todoObject.name} {props.todoObject.year}
        </label>
    </div>)
}

export default ToDoItem