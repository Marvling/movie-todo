import React from 'react'

function SearchBar (props) {
   return(
   <form onSubmit={props.handleSubmit}> 
        <label>
            Name: <input 
            className='bg-red-400' 
            type="text"
            onChange={props.handleInput}
            value={props.value}
            />
        </label>
        <button>Add to List</button>
    </form>
    )
}
export default SearchBar