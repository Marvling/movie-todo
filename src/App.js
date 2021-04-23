import React from 'react'
import TodoItem from './components/TodoItem'
import SearchBar from './components/SearchBar'
import todoData from './components/todoData'

class App extends React.Component{
    constructor(props){
        super(props)

        let numberWatched = 0;
            for (let movie of todoData) {
            if (movie.isWatched) {numberWatched++};
        }

        this.state = {
            typedName: '',
            todoDataArray: todoData,
            numberOfWatched: numberWatched,

            movieToAdd: {
                id:'',
                name:'',
                year: '',
                isWatched: false,
                dateWatched: ''
            },
        }
    }

    
    
    countWatched = () => {
        let updatedNumber = 0

        this.setState( (prevState)=>{
            for (let item of prevState.todoDataArray) {
            if (item.isWatched) {updatedNumber++};
        }
            return {numberOfWatched: updatedNumber}

        })

    }
   

    handleSubmit = e => {
                
        this.setState((prevState) => {

            let updatedTodoDataArray = prevState.todoDataArray
            let newTodoItem = this.state.movieToAdd

            updatedTodoDataArray.push(newTodoItem)
            // .push creates a duplicate item for some reason, bleow line clears the duplicate item
            updatedTodoDataArray = Array.from(new Set(updatedTodoDataArray));

            return {
                todoDataArray: updatedTodoDataArray,
                typedName: ''
            }
        })
        console.log(e.target[0].id)
        //TODO: 1- find the movie from e.target[0].id 2- get the necessary data from the found movie 3- add it to todo array
        e.preventDefault();
    }


    handleCheckbox = (id) => {
        this.setState(prevState => { 
            const updatedTodoArray = prevState.todoDataArray.map(todo => {
                if (todo.id === id) {
                    return{
                        ...todo,
                        isWatched: !todo.isWatched
                    }}

                return todo
            })
            return {todoDataArray: updatedTodoArray}
        })

        this.countWatched();
    }
   

    render (){

        //TODO ITEM LOGIC
        const todoItemsList = this.state.todoDataArray.map((items) => 
            <TodoItem  
                key={items.id} 
                todoObject={items} 
                handleCheckbox = {this.handleCheckbox}/> 
            )
        return(
            <div className='m-2'>

                {todoItemsList}

                <p className='p-2 text-lg text-green-900'>
                    {`Movies Watched: ${this.state.numberOfWatched}/${this.state.todoDataArray.length}`}
                </p>

                <SearchBar
                    handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default App