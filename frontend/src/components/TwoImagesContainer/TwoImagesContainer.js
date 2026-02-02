import "./TwoImagesContainer.scss";
import React from "react";
import { Reveal } from "../Reveal/Reveal";

function TwoImagesContainer({ photo1, photo2, photoBackground }) {
  const isVideo = (src) => {
    if (!src) return false;
    return /\.(mp4|webm|ogg|mov)$/i.test(src);
  };

  const renderMedia = (src) => {
    if (!src) return null;

    return isVideo(src) ? (
  
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          controls={false}
          className="galleryContainer_media"
        />

    ) : (

        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className="galleryContainer_media"
        />
    
    );
  };

  return (
   
      <section className="galleryContainer">
         <Reveal>
            <div
              className="galleryContainer_gallery"
              style={photoBackground ? { backgroundImage: `url(${photoBackground})` } : {}}
            >
              {renderMedia(photo1)}
              {renderMedia(photo2)}
            </div>
          </Reveal>
      </section>
  );
}

export default TwoImagesContainer;
