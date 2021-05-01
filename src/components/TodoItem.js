import React from 'react'

const TodoItem = (props) => {


    return(
    <li>
        <input     
            type='checkbox' 
            checked={props.todoObject.isWatched}
            onChange={() => props.handleCheckbox(props.todoObject.id)}
        />

        <label
            onClick= {props.revealSidebar}
            htmlFor={props.todoObject.title}
            id={props.todoObject.id}>
            {props.todoObject.title} {props.todoObject.release_date.slice(0, 4)}
        </label>
    </li>)
}

export default TodoItem