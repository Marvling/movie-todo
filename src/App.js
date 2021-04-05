import React from 'react'
import TodoItem from './components/TodoItem'
import todoData from './components/todoData'

class App extends React.Component{

    todoItems = todoData.map(
        function (items) {
            return <TodoItem  />
        }
    )
    
    
    render (){

        return(
            
            <div>
                <TodoItem name='The Fog' year='1980'/>
            </div>
        )
    }
}

export default App