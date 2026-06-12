import "./LiveBox.scss";
import React from "react";
import { Reveal } from "../Reveal/Reveal";
import aboutLive from '../../assets/aboutLive/aboutLive.json'
import MusicLink from "../MusicLink/MusicLink";
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import live1 from '../../assets/live1.webp'
import live2 from '../../assets/live2.webp'
import live3 from '../../assets/live3.webp'
import live4 from '../../assets/live4.webp'
import live5 from '../../assets/live5.webp'
import live6 from '../../assets/live6.webp'
import live7 from '../../assets/live7.webp'
import live8 from '../../assets/live8.webp'
import videoLive from '../../assets/videoLive.mp4'

function LiveBox({ lang }) {
  const currentLive = aboutLive[lang] || aboutLive.fr;

  return (
    <section className="live" id="live">
      <div className="live_paragraph">
        
          <h3 className="live_paragraph_title">
            {currentLive.title}
          </h3>
        

        <Reveal>
          <p
            className="live_paragraph_texts"
            dangerouslySetInnerHTML={{ __html: currentLive.text }}
          />
        </Reveal>
        <MusicLink
          link='https://soundcloud.com/benjamin-gibert/live-session-at-residence-alto-cordes-sur-ciel-240822?si=ef97ee5c43914dc499c8944d6e0ef2ac&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
          icon={faPlay}
          name={
            lang === 'fr'
              ? "Session live - 21.08.2022"
              : lang === 'en'
              ? 'Live session - 21.08.22'
              : 'ライブ・セッション — 2022.08.21'
          }
        />
        
      </div>
      <div className="live_liveMediaContainer">
          <div className="live_liveMediaContainer_photosGrid" aria-label="Galerie de photos live session">
            <img
              src={live1}
              alt="Live session performance photo 1"
              aria-label="Live session performance photo 1"
            />

            <img
              src={live2}
              alt="Live session performance photo 2"
              aria-label="Live session performance photo 2"
            />

            <img
              src={live3}
              alt="Live session performance photo 3"
              aria-label="Live session performance photo 3"
            />

            <img
              src={live4}
              alt="Live session performance photo 4"
              aria-label="Live session performance photo 4"
            />
          </div>

          <video
            className="live_liveMediaContainer_video"
            src={videoLive}
            autoPlay
            loop
            muted
            playsInline
            controls
            aria-label="Live session video"
          >
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>

          <div className="live_liveMediaContainer_photosGrid" aria-label="Galerie de photos live session deuxième partie">
            <img
              src={live5}
              alt="Live session performance photo 5"
              aria-label="Live session performance photo 5"
            />

            <img
              src={live6}
              alt="Live session performance photo 6"
              aria-label="Live session performance photo 6"
            />

            <img
              src={live7}
              alt="Live session performance photo 7"
              aria-label="Live session performance photo 7"
            />

            <img
              src={live8}
              alt="Live session performance photo 8"
              aria-label="Live session performance photo 8"
            />
          </div>
        </div>
    </section>
  );
}

export default LiveBox;