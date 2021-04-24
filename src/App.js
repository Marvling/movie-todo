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
            movieToAdd: {}

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

    findMovieFromId = async (id) =>{
        
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=00decbdccac0d50538a8bdbf8085ce4a&language=en-US`
        
        try{
            const response = await fetch(url)
            const data = await response.json()
            this.setState({movieToAdd: data})
        }catch(err){console.error(err)}
    }
   

    handleSubmit = async (e) => {
        e.preventDefault();

        //Setting movieToAdd in state
        const url = `https://api.themoviedb.org/3/movie/${e.target[0].id}?api_key=00decbdccac0d50538a8bdbf8085ce4a&language=en-US`
        
        try{
            const response = await fetch(url)
            const data = await response.json()
            this.setState({movieToAdd: data})
        }catch(err){console.error(err)}

        //adding movieToAdd(set on the above line) to the To-Do array
        this.setState((prevState) => {

            let updatedTodoDataArray = prevState.todoDataArray
            let newTodoItem = prevState.movieToAdd

            updatedTodoDataArray.push(newTodoItem)
            // .push creates a duplicate item for some reason, bleow line clears the duplicate item
            updatedTodoDataArray = Array.from(new Set(updatedTodoDataArray));

            return {
                todoDataArray: updatedTodoDataArray,
                typedName: ''
            }
        })
       
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
                    handleSubmit={(e) => {; 
                        this.handleSubmit(e)}}
                    />
            </div>
        )
    }
}

export default App