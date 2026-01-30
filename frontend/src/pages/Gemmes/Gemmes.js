import './Gemmes.scss'
import { Link } from 'react-router-dom'
import React, { useRef, useState, useEffect } from 'react'
import gemmes_title from '../../assets/gemmes/gemmes_title.webp'
import gemmes_snowflakes from '../../assets/gemmes/gemmes_snowflakes.svg'
import gemmes_video1 from '../../assets/gemmes/gemmes_video1.mp4'
import gemmes_video2 from '../../assets/gemmes/gemmes_video2.mp4'
import gemmes_video_g4_1LQ from '../../assets/gemmes/gemmes_video_g4_1LQ.mp4'
import gemmes_video_g4_2LQ from '../../assets/gemmes/gemmes_video_g4_2LQ.mp4'

import gemmes_window from '../../assets/gemmes/gemmes_window.webp'
import gemmes_photo_arduino from '../../assets/gemmes/gemmes_photo_arduino.webp'
import gemmes_photo_autoharp from '../../assets/gemmes/gemmes_photo_autoharp.webp'
import gemmes_photo_baies from '../../assets/gemmes/gemmes_photo_baies.webp'
import gemmes_photo_facade from '../../assets/gemmes/gemmes_photo_facade.webp'
import gemmes_photo_fenetre from '../../assets/gemmes/gemmes_photo_fenetre.webp'
import gemmes_photo_myself3 from '../../assets/gemmes/gemmes_photo_myself3.webp'
import gemmes_photo_ruche1 from '../../assets/gemmes/gemmes_photo_ruche1.webp'
import gemmes_photo_arcade from '../../assets/gemmes/gemmes_photo_arcade.webp'
import gemmes_title_track1 from '../../assets/gemmes/gemmes_title_track1.webp'
import gemmes_title_track2 from '../../assets/gemmes/gemmes_title_track2.webp'
import gemmes_title_track3 from '../../assets/gemmes/gemmes_title_track3.webp'
import gemmes_title_track4 from '../../assets/gemmes/gemmes_title_track4.webp'
import gemmes_title_track5 from '../../assets/gemmes/gemmes_title_track5.webp'

import gemmesTracksTexts from "../../assets/gemmes/gemmesTracksTexts.json";

import NavBar from '../../components/NavBar/NavBar'
import TrackBox from '../../components/TrackBox/TrackBox'
import TwoImagesContainer from '../../components/TwoImagesContainer/TwoImagesContainer'
import MusicNetworks from '../../components/MusicNetworks/MusicNetworks'
import OneMediaContainer from '../../components/OneMediaContainer/OneMediaContainer'
import GemmesDatas from '../../components/GemmesDatas/GemmesDatas'
import GemmesDescription from '../../components/GemmesDescription/GemmesDescription'

import { faPlay } from '@fortawesome/free-solid-svg-icons'

import { useApp } from "../../utils/AppContext";

function Gemmes() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { lang } = useApp();

  const getTrackText = (trackNumber) => {
    const track = gemmesTracksTexts.find(
      (track) => track.trackNumber === trackNumber
    );
  
    return track?.[`trackText_${lang}`] ?? "";
  };


  return (
    <main className='gemmes'>
      
      <NavBar />

      <div className='gemmes_bg'></div>
        <img
          className='gemmes_mainDataContainer_title'
          src={gemmes_title}
        />
        <div className='gemmes_mainDataContainer_snowflakesContainer'>
          <img className='gemmes_mainDataContainer_snowflakesContainer_snowflakes' src={gemmes_snowflakes}/>
        </div>

      <section className='gemmes_mainDataContainer'>
        <GemmesDatas 
          lang={lang}
        />
        <MusicNetworks
                    bandcamp="https://benjamingibert.bandcamp.com/album/gemmes"
                    spotify="https://open.spotify.com/intl-fr/album/5sCrdaKMtz4SbzHGT8osDc"
                    soundcloud="https://soundcloud.com/benjamin-gibert/sets/gemmes"
                    apple="https://music.apple.com/fr/album/gemmes-ep/1491626463"
                    deezer="https://www.deezer.com/fr/album/123097352"
                    instagram="https://www.instagram.com/bgibertmusic/"
                    color="black"
                />
        <OneMediaContainer
          mediaSrc={gemmes_window}
          mediaType="image"
        />
        <div className='gemmes_mainDataContainer_descriptionContainer'>
          <GemmesDescription
            lang={lang}
          />
        </div>
      </section>
      <TwoImagesContainer
        photo1={gemmes_photo_fenetre}
        photo2={gemmes_photo_myself3}
        photoBackground={gemmes_photo_baies}
      />
      <TrackBox
        trackNumber={1}
        imgTitle={gemmes_title_track1}
        trackTitle={
          lang === "fr"
            ? "demi sommeil"
            : lang === "en"
            ? "half sleep"
            : lang === "jp"
            ? "半眠"
            : ""
        }
        trackText={getTrackText(1)}
        color="gemmes"
      />
      <TwoImagesContainer
        photo1={gemmes_video1}
        photo2={gemmes_video2}
        photoBackground={gemmes_photo_ruche1}
      />
      <TrackBox
        trackNumber={2}
        imgTitle={gemmes_title_track2}
        trackTitle={
          lang === "fr"
            ? "pluie froide"
            : lang === "en"
            ? "cold rain"
            : lang === "jp"
            ? "冷たい雨"
            : ""
        }
        trackText={getTrackText(2)}
        color="gemmes"
      />
      <TwoImagesContainer
        photo1={gemmes_photo_arduino}
        photo2={gemmes_photo_autoharp}
        photoBackground={gemmes_photo_facade}
      />
      
      <TrackBox
        trackNumber={3}
        imgTitle={gemmes_title_track3}
        trackTitle={
          lang === "fr"
            ? "vent du nord"
            : lang === "en"
            ? "northern wind"
            : lang === "jp"
            ? "北風"
            : ""
        }
        trackText={getTrackText(3)}
        color="gemmes"
      />
      
      <OneMediaContainer
          mediaSrc={gemmes_video_g4_2LQ}
          mediaType="video"
      />
      <TrackBox
        trackNumber={4}
        imgTitle={gemmes_title_track4}
        trackTitle={
          lang === "fr"
            ? "lumières nocturnes"
            : lang === "en"
            ? "nocturnal lights"
            : lang === "jp"
            ? "夜の灯り"
            : ""
        }
        trackText={getTrackText(4)}
        color="gemmes"
      />
      <OneMediaContainer
          mediaSrc={gemmes_photo_arcade}
          mediaType="image"
      />
      <TrackBox
        trackNumber={5}
        imgTitle={gemmes_title_track5}
        trackTitle={
          lang === "fr"
            ? "cheminées"
            : lang === "en"
            ? "fireplaces"
            : lang === "jp"
            ? "暖炉"
            : ""
        }
        trackText={getTrackText(5)}
        color="gemmes"
      />
      <OneMediaContainer
          mediaSrc={gemmes_video_g4_1LQ}
          mediaType="video"
      />
    </main>
  )
}

export default Gemmes
