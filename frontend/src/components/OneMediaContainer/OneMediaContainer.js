import "./OneMediaContainer.scss";
import React from "react";

function OneMediaContainer({ mediaSrc, mediaType }) {
  return (
    <section className="taihua_livePhotosContainer">
      {mediaType === "video" && (
        <video
          src={mediaSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          controls={false}
        />
      )}

      {mediaType === "image" && (
        <img
          src={mediaSrc}
          alt=""
          loading="lazy"
          decoding="async"
        />
      )}
    </section>
  );
}

export default OneMediaContainer;
