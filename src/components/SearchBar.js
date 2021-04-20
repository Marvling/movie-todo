import React from 'react'

function SearchBar (props) {

   return(
    <div>
        <form onSubmit={props.handleSubmit}> 
        <input 
            className='bg-red-400' 
            type="text"
            onChange={props.onChange}
            value={props.value}/>
        <button>Add to List</button>
        </form>
    </div>
    )
}
export default SearchBar