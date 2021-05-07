import React, {useState} from 'react'
import TodoCanvas from './components/TodoCanvas'
import InfoCanvas from './components/InfoCanvas'

function App () {

    const [movieDisplayed, setMovieDisplayed] = useState(555)

    const getMovieDetails = async (movieId) =>{
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=00decbdccac0d50538a8bdbf8085ce4a&language=en-US`

        try{
            const response = await fetch(url)
            const data = await response.json()
                if(!data.error){
                    setMovieDisplayed(data)
                }
        }catch(err){
            console.error(`this is my error!: ${err}`)
        }
    }

    return(
        <div className='grid grid-cols-2 gap-2'>
            <TodoCanvas
                revealSidebar = {(e)=> getMovieDetails(e.target.id)}
                showInfo = {(e)=>getMovieDetails(e.target.id)}/>
            <InfoCanvas
                movieDisplayed = {movieDisplayed}/>
        </div>
    )
}

export default App