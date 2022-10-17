import React from 'react'
import { urlFor } from '../library/client';

function scrollDown(){

    const main = document.querySelector(".product-container");
    main.scrollIntoView({behavior: "smooth"});

}

const Banner = ({bannerProp}) => {
  return (
    <div className="main-banner-container">
        <div>      
            <h1 className='main-banner-text'>{bannerProp.mainText}</h1>
            <h3 className='small-banner-text'>{bannerProp.smallText}</h3>
            <button className='banner-button' onClick={scrollDown}>{bannerProp.buttonText}</button>
        </div>
    </div>
  )
}

export default Banner