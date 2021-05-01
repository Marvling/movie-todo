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
            <h2>Actors</h2>
        </div>
    )
}

export default InfoCanvas