import React from 'react'
import TodoItem from './components/TodoItem'
import todoData from './components/todoData'

class App extends React.Component{
    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        
        let numberWatched = 0;
            for (let i = 0; i <todoData.length; i++) {
            if (todoData[i].isWatched) {numberWatched++};
        }
        
            
        
        this.state = {
            typedName: 'bok',
            todoDataArray: todoData,
            numberOfWatched: numberWatched
        }
    }

    countWatched(){
        let updatedNumber = 0

        this.setState( (prevState)=>{
            for (let i = 0; i < prevState.todoDataArray.length; i++) {
            if (prevState.todoDataArray[i].isWatched) {updatedNumber++};
        }
            return {numberOfWatched: updatedNumber}
            
        })
        
    }
    handleInput(event) {
        this.setState({typedName: event.target.value});
      }
    
    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.typedName);
        

        this.setState((prevState)=> {
            let objectToAdd = {
                id: prevState.todoDataArray[prevState.todoDataArray.length-1].id + 1,
                name: prevState.typedName,
                year: 3000,
                isWatched: false,
                dateWatched: ''
            }

            // let updatedTodoArray = prevState
            // updatedTodoArray.todoDataArray.push(objectToAdd)

            // return{todoDataArray: updatedTodoArray}
        })


        event.preventDefault();
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
                todoDataArray: updatedTodoArray,
            }
        })

        this.countWatched();

        
    }
    
    
    render (){

        const todoItemsList = this.state.todoDataArray.map( 
            (items) => <TodoItem  
                key={items.id} 
                todoObject={items} 
                handleChange = {this.handleChange}
            /> 
        )


        return(
            <div className='m-2'>
                {todoItemsList}
                <p
                    className='p-2 text-lg text-green-900'>
                    Movies Watched : {this.state.numberOfWatched}/{this.state.todoDataArray.length}
                </p>
                <p
                    className='p-2 text-lg text-green-900'>
                    Input : {this.state.typedName}
                </p>

                
                <form onSubmit={this.handleSubmit}> 
                    <label>
                        Name:
                        <input type="text"  onChange={this.handleInput} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

            </div>
        )
    }
}
export default App