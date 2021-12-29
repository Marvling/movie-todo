import React, {useState} from 'react'
import TodoCanvas from './components/TodoCanvas'
import InfoCanvas from './components/InfoCanvas'

function App () {1

    const [movieDetails, setMovieDetails] = useState({release_date: '1234'})
    const [movieCredits, setMovieCredits] = useState({cast: [], crew: []})

    const getMovieDetails = async (movieId) =>{
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=00decbdccac0d50538a8bdbf8085ce4a&language=en-US`

        try{
            const response = await fetch(url)
            const data = await response.json()
                if(!data.error){
                    setMovieDetails(data)
                }
        }catch(err){
            console.error(`this is my error!: ${err}`)
        }
    }

    const getMovieCredits = async (movieId) => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=00decbdccac0d50538a8bdbf8085ce4a&language=en-US`

        try{
            const response = await fetch(url)
            const data = await response.json()
                if(!data.error){
                    setMovieCredits(data);
                }
        }catch(err){
            console.error(`this is my error!: ${err}`)
        }
    }

    return(
        <div className='grid grid-cols-2 gap-4'>
            <div className='border-8'>
            <TodoCanvas
                showInfo = {(e)=>{getMovieDetails(e.target.id); getMovieCredits(e.target.id)}}/>
            </div>   
            <div 
                className='border-8 w-13' >
            <InfoCanvas
                movieDetails = {movieDetails}
                movieCredits = {movieCredits}/>
            </div>
        </div>
    )
}

export default App