import React, {useState, useCallback} from 'react'
import {Collapse} from 'react-collapse'

import config from '../tmdbApiConfig'

const InfoCanvas = (props) => {

    // react-collapse options
    const [isButtonCollapseOpen, setIsButtonCollapseOpen] = useState(false);
  
    const onClick = useCallback(
      () => setIsButtonCollapseOpen(!isButtonCollapseOpen),
      [isButtonCollapseOpen]
    );

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

    //deconstructing the movieDetails object
    const {title, poster_path, release_date} = props.movieDetails

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
    )
    


    return(
        <div>
            <img
                src={buildImageUrl(poster_path, 'poster')} 
                alt={`Movie Poster for ${title}`}/>
            <p
                className='text-2xl'>
                {title}
            </p>
            
            <h2
                className=' mb-2 text-lg'>
                {release_date.slice(0,4)}
            </h2>

            <h2>Directors & Writers</h2>

            <div>                
                <div>
                    <button
                    className='text-bold'
                    aria-controls='accessible-marker-button'
                    aria-expanded={isButtonCollapseOpen}
                    onClick={onClick}
                    type="button">
                    Actors
                    </button>
                </div>

                <Collapse
                    isOpened={isButtonCollapseOpen}>
                    <ul>
                        {[...actors]}
                    </ul>
                </Collapse>
            </div>

            <p>Crew</p>
            <p>Production Companies</p>
            <p>Financial Data</p>
            <p>IMDB ID</p>
            
        </div>
    )
}

export default InfoCanvas