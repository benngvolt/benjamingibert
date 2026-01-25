import './Gemmes.scss'
import { Link } from 'react-router-dom'
import React, { useRef, useState, useEffect } from 'react'
import gemmes_title from '../../assets/gemmes/gemmes_title.webp'
import gemmes_artwork from '../../assets/gemmes/gemmes_artwork.webp'
import gemmes_snowflakes from '../../assets/gemmes/gemmes_snowflakes.svg'
import gemmes_video1 from '../../assets/gemmes/gemmes_video1.mp4'
import gemmes_video2 from '../../assets/gemmes/gemmes_video2.mp4'
import gemmes_video3 from '../../assets/gemmes/gemmes_video3.mp4'
import gemmes_video_g2 from '../../assets/gemmes/gemmes_video_g2.mp4'

import gemmes_video_g4_1LQ from '../../assets/gemmes/gemmes_video_g4_1LQ.mp4'
import gemmes_video_g4_2LQ from '../../assets/gemmes/gemmes_video_g4_2LQ.mp4'
import gemmes_video_g4_3LQ from '../../assets/gemmes/gemmes_video_g4_3LQ.mp4'


import gemmes_photo_arduino from '../../assets/gemmes/gemmes_photo_arduino.webp'
import gemmes_photo_autoharp from '../../assets/gemmes/gemmes_photo_autoharp.webp'
import gemmes_photo_baies from '../../assets/gemmes/gemmes_photo_baies.webp'
import gemmes_photo_baies2 from '../../assets/gemmes/gemmes_photo_baies2.webp'
import gemmes_photo_chardons from '../../assets/gemmes/gemmes_photo_chardons.webp'
import gemmes_photo_ciel from '../../assets/gemmes/gemmes_photo_ciel.webp'
import gemmes_photo_facade from '../../assets/gemmes/gemmes_photo_facade.webp'
import gemmes_photo_fenetre from '../../assets/gemmes/gemmes_photo_fenetre.webp'
import gemmes_photo_myself1 from '../../assets/gemmes/gemmes_photo_myself1.webp'
import gemmes_photo_myself2 from '../../assets/gemmes/gemmes_photo_myself2.webp'
import gemmes_photo_myself3 from '../../assets/gemmes/gemmes_photo_myself3.webp'
import gemmes_photo_plan from '../../assets/gemmes/gemmes_photo_plan.webp'
import gemmes_photo_ruche1 from '../../assets/gemmes/gemmes_photo_ruche1.webp'
import gemmes_photo_ruche2 from '../../assets/gemmes/gemmes_photo_ruche2.webp'
import gemmes_photo_ruche3 from '../../assets/gemmes/gemmes_photo_ruche3.webp'
import gemmes_photo_toit from '../../assets/gemmes/gemmes_photo_toit.webp'
import gemmes_photo_arcade from '../../assets/gemmes/gemmes_photo_arcade.webp'
import gemmes_title_track1 from '../../assets/gemmes/gemmes_title_track1.webp'
import gemmes_title_track2 from '../../assets/gemmes/gemmes_title_track2.webp'
import gemmes_title_track3 from '../../assets/gemmes/gemmes_title_track3.webp'
import gemmes_title_track4 from '../../assets/gemmes/gemmes_title_track4.webp'
import gemmes_title_track5 from '../../assets/gemmes/gemmes_title_track5.webp'

import gemmesTracksTexts from "../../assets/gemmes/gemmesTracksTexts.json";
import taihua_photo_mainportrait from '../../assets/taihua/taihua_photo_mainportrait.webp'
import taihua_photo_forest2 from '../../assets/taihua/taihua_photo_forest2.webp'
import taihua_photo_forestdetail from '../../assets/taihua/taihua_photo_forestdetail.webp'
import taihua_photo_shellphone1 from '../../assets/taihua/taihua_photo_shellphone1.webp'
import taihua_photo_jardin from '../../assets/taihua/taihua_photo_jardin.webp'
import taihua_photo_dessin from '../../assets/taihua/taihua_photo_dessin.webp'

import NavBar from '../../components/NavBar/NavBar'
import TrackBox from '../../components/TrackBox/TrackBox'
import TwoImagesContainer from '../../components/TwoImagesContainer/TwoImagesContainer'
import MusicLink from '../../components/MusicLink/MusicLink'
import QuoteBox from '../../components/QuoteBox/QuoteBox'
import MusicNetworks from '../../components/MusicNetworks/MusicNetworks'
import PhotoGallery from '../../components/PhotoGallery/PhotoGallery'
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

  const backgroundColor = 'black'

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
        <MusicNetworks />
        <OneMediaContainer
          mediaSrc={gemmes_artwork}
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
        trackTitle='gemme I'
        trackText={getTrackText(1)}
      />
      <TwoImagesContainer
        photo1={gemmes_video1}
        photo2={gemmes_video2}
        photoBackground={gemmes_photo_ruche1}
      />
      <TrackBox
        trackNumber={2}
        imgTitle={gemmes_title_track2}
        trackTitle='gemme II'
        trackText={getTrackText(2)}
      />
      <TwoImagesContainer
        photo1={gemmes_photo_arduino}
        photo2={gemmes_photo_autoharp}
        photoBackground={gemmes_photo_facade}
      />
      
      <TrackBox
        trackNumber={3}
        imgTitle={gemmes_title_track3}
        trackTitle='gemme III'
        trackText={getTrackText(3)}
      />
      
      <OneMediaContainer
          mediaSrc={gemmes_video_g4_2LQ}
          mediaType="video"
      />
      <TrackBox
        trackNumber={4}
        imgTitle={gemmes_title_track4}
        trackTitle='gemme IV'
        trackText={getTrackText(4)}
      />
      <OneMediaContainer
          mediaSrc={gemmes_photo_arcade}
          mediaType="image"
      />
      <TrackBox
        trackNumber={5}
        imgTitle={gemmes_title_track5}
        trackTitle='gemme V'
        trackText={getTrackText(5)}
      />
      <OneMediaContainer
          mediaSrc={gemmes_video_g4_1LQ}
          mediaType="video"
      />
    </main>
  )
}

export default Gemmes
