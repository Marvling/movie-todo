import React from 'react'

class TodoItem extends React.Component{

    render(){

        return (
            <div>
                <input type="checkbox"/>
                <label className = "bg-green-500" >{this.props.movieName} <strong className="bg-green-700">{this.props.movieYear}</strong> </label>
            </div>
            
        )
    }
}



export default TodoItem