import "./OneMediaContainer.scss";
import React from "react";
import { Reveal } from "../Reveal/Reveal";

function OneMediaContainer({ mediaSrc, mediaType }) {
  return (
    <section className="taihua_livePhotosContainer">
      {mediaType === "video" && (
        <Reveal>
          <video
            src={mediaSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            controls={false}
          />
        </Reveal>
      )}

      {mediaType === "image" && (
        <Reveal>
          <img
            src={mediaSrc}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </Reveal>
      )}
    </section>
  );
}

export default OneMediaContainer;
