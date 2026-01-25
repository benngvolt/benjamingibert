import "./OneMediaContainer.scss";
import React, { useEffect, useRef } from "react";


function OneMediaContainer({ mediaSrc, mediaType }) {
 

  return (
    <section className='taihua_livePhotosContainer'>
        {mediaType && mediaType === "video" &&
          <video
            src={mediaSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        }
        {mediaType && mediaType === "image" && 
          <img src={mediaSrc} />
        }
      </section>
  );
}

export default OneMediaContainer;