import React from 'react'
import TodoItem from './components/TodoItem'
import todoData from './components/todoData'

class App extends React.Component{

    todoItemsList = todoData.map( 
            (items) => <TodoItem  key={items.id} todoObject={items} /> 
        )
    
    
    render (){

        return(
            
            <div>
               {this.todoItemsList}
            </div>
        )
    }
}

export default App