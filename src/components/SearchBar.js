import React, {useState} from 'react'
import Suggestions from './Suggestions'

function SearchBar (props) {

    const [query, setQuery] = useState('')
    const [suggestionArray, setSuggestionArray] = useState([])
    const [tmdbId, setTmdbId] = useState('')

    const searchMovies = async (e) => {
        e.preventDefault()

        let url = `https://api.themoviedb.org/3/search/movie?api_key=00decbdccac0d50538a8bdbf8085ce4a&language=en-US&query=${e.target.value}&page=1&include_adult=false`
        
        try{
            const response = await fetch(url)
            const data = await response.json()
            if(!data.error){
                setSuggestionArray(data.results.splice(0,5))
            }
        }catch(err){
            console.error(`this is my error!: ${err}`)
            //sets suggestion array to empty so it shows 'no suggestions found' if no movies were found
            setSuggestionArray([])}
    }

    const getTmdbId = (e) =>{
        setTmdbId(e.target.id)
    }

    return(
    <>
        <form onSubmit={props.handleSubmit}> 
            <input 
                className='bg-red-400' 
                type="text"
                onChange={e => {setQuery(e.target.value);  searchMovies(e)}}
                value={query}
                id={tmdbId}/>
            <button>Add to List</button>
        </form>
        <Suggestions 
            query={query}
            setQuery={e => {setQuery(e.target.innerText); getTmdbId(e)}}
            suggestionArray = {suggestionArray}/>
        
    </>
    )
}
export default SearchBar