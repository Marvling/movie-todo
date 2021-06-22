import React, {useState, useCallback} from 'react'
import {Collapse} from 'react-collapse'

import config from '../tmdbApiConfig'

const InfoCanvas = (props) => {

    // react-collapse options
    const [isActorCollapseOpen, setIsActorCollapseOpen] = useState(false);
    const [isDirectorCollapseOpen, setIsDirectorCollapseOpen] = useState(false);
  

    const collapseHandler = (e) => {

        if (e.target.innerHTML === 'Actors')
        setIsActorCollapseOpen(!isActorCollapseOpen)
        else if (e.target.innerHTML === 'Directors')
        setIsDirectorCollapseOpen(!isDirectorCollapseOpen)

    }

    // getting the poster 
    const buildImageUrl = (path, type) => {
        const imgUrl = config[0].images.secure_base_url
        const posterSize = 'w342'
        const profileSize = 'w185'

        if(path){
            if (type === 'poster') {
                return `${imgUrl}${posterSize}${path}`
            } 
            else if (type === 'profile') {
                return `${imgUrl}${profileSize}${path}`
            }
        }else{return '/profile-nan.jpg'}
    }

    // getting actors from movieCredits object
    const actors = props.movieCredits.cast.map((actor) => 
        <li className='mb-2'>
            <div className='flex'>
            <img 
                className='w-10 h-15 rounded-lg mr-2' 
                src={buildImageUrl(actor.profile_path, 'profile')}
                alt = {`Face of ${actor.name}`}/>
            
            <p>{actor.name}<br/>{actor.character}</p>
            </div>
        </li>
    );

    //

    // redo this part, should be more concise, less repeat
    // write a function that creates a filtered array and returns a <li>

    const crew = props.movieCredits.crew

    const Directing = crew.filter(x => x.department === 'Directing')
    const Writing = crew.filter(x => x.department === 'Writing')
    const Art = crew.filter(x => x.department === 'Art')
    const Sound = crew.filter(x => x.department === 'Sound')
    const Production = crew.filter(x => x.department === 'Production')
    const Camera = crew.filter(x => x.department === 'Camera')

    const Directors = Directing.map((crew) => 
        <li className='mb-2'>
            <div className='flex'>
            <img 
                className='w-10 h-15 rounded-lg mr-2' 
                src={buildImageUrl(crew.profile_path, 'profile')}
                alt = {`Face of ${crew.name}`}/>
            <p>{crew.name}<br/>{crew.job}</p>
            </div>
        </li>
    );

    //Art, Sound, Crew, Production, Writing & Directing, Camera

    //deconstructing the movieDetails object
    const {title, poster_path, release_date} = props.movieDetails

    return(
        <div>
            <p
                className='text-2xl'>
                {title}
            </p>
            <p
                className='text-base'>
                {release_date.slice(0,4)}
            </p>
            <img
                className='w-44'
                src={buildImageUrl(poster_path, 'poster')} 
                alt={`Movie Poster for ${title}`}>
            </img>            

            <div>
                <div>
                    <button
                    className='text-bold'
                    aria-controls='accessible-marker-button'
                    aria-expanded={isActorCollapseOpen}
                    onClick={collapseHandler}
                    type="button">
                    Actors
                    </button>
                </div>
                <div
                className = {`${isActorCollapseOpen ? 'h-64' : ''} overflow-auto`}>
                    <Collapse
                    isOpened={isActorCollapseOpen}>
                        <ul>
                            {[...actors]}
                        </ul>
                    </Collapse>
                </div>
            </div>

            <div>
                <div>
                    <button
                    className='text-bold'
                    aria-controls='accessible-marker-button'
                    aria-expanded={isDirectorCollapseOpen}
                    onClick={collapseHandler}
                    type="button">
                    Directors
                    </button>
                </div>
                <div
                className = {`${isDirectorCollapseOpen ? 'h-64' : ''} overflow-auto`}>
                    <Collapse
                    isOpened={isDirectorCollapseOpen}>
                        <ul>
                            {[...Directors]}
                        </ul>
                    </Collapse>
                </div>
            </div>

            <p>Production Companies</p>
            <p>Financial Data</p>
            <p>IMDB ID</p>
            
        </div>
    )
}

export default InfoCanvas