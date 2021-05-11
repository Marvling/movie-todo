import React, {useState, useCallback} from 'react'
import {Collapse} from 'react-collapse'

import config from '../tmdbApiConfig'

const InfoCanvas = (props) => {

    const buildPosterUrl = (posterPath) => {
        const imageConfig = config[0].images
        return `${imageConfig.secure_base_url}w300${posterPath}`
    }

    const {title, poster_path, release_date} = props.movieDisplayed


    const accessibilityIds = {
        checkbox: 'accessible-marker-example1',
        button: 'accessible-marker-example2'
      };

    const [isCheckboxCollapseOpen, setIsCheckboxCollapseOpen] = useState(false);
    const [isButtonCollapseOpen, setIsButtonCollapseOpen] = useState(false);
  
    const onChange = useCallback(
      ({target: {checked}}) => setIsCheckboxCollapseOpen(checked),
      [setIsCheckboxCollapseOpen]
    );
  
    const onClick = useCallback(
      () => setIsButtonCollapseOpen(!isButtonCollapseOpen),
      [isButtonCollapseOpen]
    );
  

    return(
        <div>
            <img
                src={buildPosterUrl(poster_path)} 
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
                <div className="config">
                    <button
                    aria-controls={accessibilityIds.button}
                    aria-expanded={isButtonCollapseOpen}
                    onClick={onClick}
                    type="button">
                    Reveal content
                    </button>
                </div>

                <Collapse
                    isOpened={isButtonCollapseOpen}>
                    <div className='h-16' id={accessibilityIds.button}>
                        <p>Buraya bakarlar</p>
                    </div>
                </Collapse>

            </div>

            <h2>Actors</h2>
            <p>Crew</p>
            <p>Production Companies</p>
            <p>Financial Data</p>
            <p>IMDB ID</p>
            
        </div>
    )
}

export default InfoCanvas