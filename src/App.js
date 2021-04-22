import React from 'react'
import TodoItem from './components/TodoItem'
import SearchBar2 from './components/SearchBar2'
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

            moviesSearched: [],
            movieToAdd: {
                id:'',
                name:'',
                year: '',
                isWatched: false,
                dateWatched: ''
            },

            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            suggestions: []
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
    onChange = event => {

        event.preventDefault()

        const { suggestions } = this.state;
        const userInput = event.target.value

        const filteredSuggestions = suggestions.filter(
            suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        )
        
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions:true,
            typedName: userInput
        })

        
        console.log(this.state.filteredSuggestions);

        // this.searchMovies()

    }

    onClick = event => {

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: true,
            typedName: event.currentTarget.innerText
        })
    }


    handleSubmit = event => {
                
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
        
        event.preventDefault();
    }

    searchMovies = async () => {

        let query = this.state.typedName
        let url = `https://api.themoviedb.org/3/search/movie?api_key=00decbdccac0d50538a8bdbf8085ce4a&language=en-US&query=${query}&page=1&include_adult=false`
        
        try{
            const response = await fetch(url)
            const data = await response.json()

            let suggestions = data.results.slice(0,5)
            suggestions = suggestions.map(movie => movie.original_title)
            

            // const name = data.results[0].original_title
            const year = data.results[0].release_date.slice(0,4)

            this.setState({
                movieToAdd: {
                    id: this.state.todoDataArray.length + 1,
                    name: this.state.typedName,
                    year: year,
                    isWatched: false,
                    dateWatched: ''
                },
                suggestions,
            })

        }catch(err){
            console.error(`this is my error: ${err}`)
        }

        console.log(`state suggestions ${this.state.suggestions}`)

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
        
        // AUTOSUGGEST LOGIC
        let suggestionsListComponent;

        if (this.state.showSuggestions && this.state.typedName) {
            
            if (this.state.filteredSuggestions.length) {
                
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {this.state.filteredSuggestions.map((suggesiton, index) => {
                            let className;

                            // flag the active suggestion with a class
                            if (index === this.state.activeSuggestion) {
                                className = 'suggesion-active'
                            }
                            return (
                                <li className={className} key={suggesiton} onClick={this.onClick}>
                                    {suggesiton}
                                </li>
                            )
                        })}
                    </ul>
                )
            } else {
                suggestionsListComponent = (
                    <div className='no-suggestions'>
                        <em>No Suggestions available</em>
                    </div>
                )
            }
        }

        return(
            <div className='m-2'>

                {todoItemsList}

                <p className='p-2 text-lg text-green-900'>
                    {`Movies Watched: ${this.state.numberOfWatched}/${this.state.todoDataArray.length}`}
                </p>

                {/* <SearchBar
                    handleSubmit={this.handleSubmit} 
                    onChange={this.onChange} 
                    value={this.state.typedName}/> */}
                
                <SearchBar2 
                    handleSubmit={this.handleSubmit} 
                    />

                    {suggestionsListComponent}
            </div>
        )
    }
}

export default App