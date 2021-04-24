import React from 'react'

const ToDoItem = (props) => {


    return(
    <div>
        <input     
        type='checkbox' 
        checked={props.todoObject.isWatched}
        onChange={() => props.handleCheckbox(props.todoObject.id)}
        />

        <label htmlFor={props.todoObject.title}>
            {props.todoObject.title} {props.todoObject.release_date.slice(0, 4)}
        </label>
    </div>)
}

export default ToDoItem