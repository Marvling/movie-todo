import React, {useState} from 'react'
import Suggestions from './Suggestions'

function SearchBar (props) {

    const [query, setQuery] = useState('')
    const [suggestionArray, setSuggestionArray] = useState([ ])
    const [tmdbId, setTmdbId] = useState('')

    const searchMovies = async (e) => {
        e.preventDefault()

        let url

        //prevents error when the textbox is empty
        if (e.target.value !== ''){
            url = `https://api.themoviedb.org/3/search/movie?api_key=00decbdccac0d50538a8bdbf8085ce4a&language=en-US&query=${e.target.value}&page=1&include_adult=false`
        }else{
            setSuggestionArray([ ])
        }
        
        try{
            const response = await fetch(url)
            const data = await response.json()
            setSuggestionArray(data.results)

        }catch(err){
            console.error(`this is my error!: ${err}`)
            }
    }

    const getTmdbId = (e) =>{
        setTmdbId(e.target.id)
    }

    return(
    <>
        <form onSubmit={props.handleSubmit}> 
            <input 
                className='border-2 placeholder-red-500 text-italic'
                placeholder='search here'
                type="text"
                onChange={e => {setQuery(e.target.value);  searchMovies(e)}}
                value={query}
                id={tmdbId}/>
            <button
                className = 'ml-2'>
                Add
            </button>
        </form>
        <Suggestions 
            query={query}
            setQuery={e => {setQuery(e.target.innerText.slice(0,-10)); getTmdbId(e)}}
            addToList={props.addToList}
            showInfo={props.showInfo}
            suggestionArray = {suggestionArray}/>
        
    </>
    )
}
export default SearchBar