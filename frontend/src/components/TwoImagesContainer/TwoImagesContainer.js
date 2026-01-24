import "./TwoImagesContainer.scss";
import React, { useEffect, useRef } from "react";


function TwoImagesContainer({ photo1, photo2, photoBackground }) {

  return (
    <section className='galleryContainer'>
        <div className='galleryContainer_gallery'
        style={
            photoBackground
              ? { backgroundImage: `url(${photoBackground})` }
              : {}
          }>
          <img src={photo1}/>
          <img src={photo2}/>
        </div> 
      </section>
  );
}

export default TwoImagesContainer;
