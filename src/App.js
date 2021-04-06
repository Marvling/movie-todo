import React from 'react'
import TodoItem from './components/TodoItem'
import todoData from './components/todoData'

class App extends React.Component{
    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)

        this.state = {
            todoDataArray: todoData
        }
    }

    handleChange(id){
        this.setState(prevState => { 
            const updatedTodoArray = prevState.todoDataArray.map(todo => {
                if (todo.id === id) {
                    return{
                        ...todo,
                        isWatched: !todo.isWatched
                    }
                }
                return todo
            })
            return {
                todoDataArray: updatedTodoArray
            }
        })
    }
    
    render (){

        const todoItemsList = this.state.todoDataArray.map( 
            (items) => <TodoItem  
                key={items.id} 
                todoObject={items} 
                increaseButton={this.debugCounter}
                handleChange = {this.handleChange}
            /> 
        )

        return(
            <div>
               {todoItemsList}
            </div>
        )
    }
}

export default App