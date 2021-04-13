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

            debugObject: {}
        }
    }

    
    
    countWatchedw = () => {
        let updatedNumber = 0

        this.setState( (prevState)=>{
            for (let item of prevState.todoDataArray) {
            if (item.isWatched) {updatedNumber++};
        }
            return {numberOfWatched: updatedNumber}

        })

    }
    handleInput = (event) => {
        this.setState({typedName: event.target.value})
      }

    handleSubmit = (event) => {
                
        this.setState((prevState) => {

            let updatedTodoDataArray = prevState.todoDataArray

            let newTodoItem = {
                id: prevState.todoDataArray.length + 1,
                name: prevState.typedName,
                year: 1800,
                isWatched: false
            }

            updatedTodoDataArray.push(newTodoItem)
            // .push creates a duplicate item for some reason, bleow line clears the duplicate item
            updatedTodoDataArray = Array.from(new Set(updatedTodoDataArray));

            return {
                todoDataArray: updatedTodoDataArray,
                typedName: ''
            }
        })
        
        event.preventDefault();
      }

      searchMovies = async (event) => {

        event.preventDefault();

        let query = this.state.typedName

        let url = `https://api.themoviedb.org/3/search/movie?api_key=00decbdccac0d50538a8bdbf8085ce4a&language=en-US&query=${query}&page=1&include_adult=false`
        
        try{
        let response = await fetch(url)
        let data = await response.json()

        console.log(data.results[0].original_title)
        }catch(err){console.error(err)}
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
                <p className='p-2 text-lg text-green-900'>
                    {`Typing: ${this.state.typedName}`}
                </p>

                <SearchBar 
                    handleSubmit={this.searchMovies} 
                    handleInput={this.handleInput} 
                    value={this.state.typedName}/>

            </div>
        )
    }
}

export default App