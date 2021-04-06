import React from 'react'

function ToDoItem(props) {
    return(
    <div>
        <input     
        type='checkbox' 
        id={props.name}
        checked={props.todoObject.isWatched}
        onChange={() => props.handleChange(props.todoObject.id)}
        />

        <label 
            htmlFor={props.todoObject.name}
            >
            {props.todoObject.name} {props.todoObject.year}
        </label>
    </div>)
}

export default ToDoItem