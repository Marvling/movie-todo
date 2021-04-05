import React from 'react'
import TodoItem from './components/TodoItem'

class App extends React.Component{
    render (){

        return(
            
            <div>
                <h3 className="text-gray-900">The List </h3>
                <TodoItem movieName='The Fog' movieYear='1980'/>
            </div>
        )
    }
}

export default App