import React from 'react'

function ToDoItem(props) {
    return(
    <div>
        <input         
        type='checkbox' 
        id={props.name}
        />

        <label 
            htmlFor={props.name}
            // Tailwind Styles
            className = "bg-green-500">
                {props.name} {props.year}
        </label>
    </div>)
}

export default ToDoItem