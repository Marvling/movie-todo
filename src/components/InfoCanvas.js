import React from 'react'
import config from '../tmdbApiConfig'

const InfoCanvas = (props) => {

    const buildPosterUrl = (posterPath) => {
        const imageConfig = config[0].images
        return `${imageConfig.secure_base_url}w300${posterPath}`
    }

    return(
        <div>
            <img
                src={buildPosterUrl(props.movieDisplayed.poster_path)} 
                alt={`Movie Poster for ${props.movieDisplayed.title}`}/>
            <h1>{`Movie Name: ${props.movieDisplayed.title}`}</h1>
            <h2>Year</h2>
            <h2>Director</h2>
            <h2 className={'ml-2'}>Directors Other Movies</h2>
            <h2>Actors</h2>
            <h3 className={'ml-2'}>Actor1</h3>
            <h3 className={'ml-4'}>other movies</h3>
            <h3>Actor2</h3>
            <p>click on multiple actors to see movies that have them both</p>
        </div>
    )
}

export default InfoCanvas