import "./OneMediaContainer.scss";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "../Reveal/Reveal";

function OneMediaContainer({ mediaSrc, mediaType, variant, allowUnmute }) {
  const [muted, setMuted] = useState(true);

  return (
    <section className="taihua_livePhotosContainer">
      {mediaType === "video" && allowUnmute && (
        <Reveal>
          <div className={`taihua_livePhotosContainer_videoWrapper taihua_livePhotosContainer_videoWrapper--${variant}`}>
            <video
              src={mediaSrc}
              autoPlay
              loop
              muted={muted}
              playsInline
              preload="metadata"
              controls={false}
            />
            <button
              type="button"
              className="taihua_livePhotosContainer_muteButton"
              aria-label={muted ? "Activer le son" : "Couper le son"}
              onClick={() => setMuted((m) => !m)}
            >
              <FontAwesomeIcon icon={muted ? faVolumeXmark : faVolumeHigh} />
            </button>
          </div>
        </Reveal>
      )}

      {mediaType === "video" && !allowUnmute && (
        <Reveal>
          <video
            src={mediaSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            controls={false}
            className={`taihua_livePhotosContainer taihua_livePhotosContainer--${variant}`}
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
