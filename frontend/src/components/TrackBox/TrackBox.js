import "./TrackBox.scss";
import React from "react";
import { Reveal } from "../Reveal/Reveal";

function TrackBox({ trackText, trackTitle, imgTitle, trackNumber, color }) {
  return (
    <section className={`taihua_tracks taihua_tracks${trackNumber}`} id={trackTitle}>
      <div className="taihua_tracks_track">
        <img
          className={`taihua_tracks_track_imgTitle taihua_tracks_track_imgTitle--${color}`}
          src={imgTitle}
          loading="lazy"
          decoding="async"
          alt=""
        />

        <div className="taihua_tracks_track_texts">
          <Reveal>
            <p className={`taihua_tracks_track_texts_title taihua_tracks_track_texts_title--${color}`}>
              {trackTitle}
            </p>
          </Reveal>

          <Reveal>
            <p
              className={`taihua_tracks_track_texts_text taihua_tracks_track_texts_text--${color}`}
              dangerouslySetInnerHTML={{ __html: trackText }}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default TrackBox;