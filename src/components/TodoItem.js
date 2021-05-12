import React from 'react'

const TodoItem = (props) => {




    return(
    <li>
        <input
            className='mr-2'
            type='checkbox' 
            checked={props.todoObject.isWatched}
            onChange={() => props.handleCheckbox(props.todoObject.id)}/>
        <label
            onClick= {props.showInfo}
            htmlFor={props.todoObject.title}
            id={props.todoObject.id}>
            {props.todoObject.title} - {props.todoObject.release_date.slice(0, 4)}
        </label>
        <p>{props.todoObject.genres.map((genre) => <span>{`${genre.name} `}</span>)}</p>
    </li>)
}

export default TodoItem