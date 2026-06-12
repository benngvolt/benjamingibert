import './Nightingales.scss'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet-async";

import React, { useRef, useState, useEffect } from 'react'
import night_artwork from '../../assets/nightingales/night_artwork.webp'
import night_title from '../../assets/nightingales/night_title.webp'
import night_starrysky from '../../assets/nightingales/night_starrysky.svg'
import night_A from '../../assets/nightingales/night_A.webp'
import night_T from '../../assets/nightingales/night_T.webp'
import night_N from '../../assets/nightingales/night_N.webp'
import night_G from '../../assets/nightingales/night_G.webp'
import night1 from '../../assets/nightingales/night1.webp'
import night2 from '../../assets/nightingales/night2.webp'
import night3 from '../../assets/nightingales/night3.webp'
import night4 from '../../assets/nightingales/night4.webp'
import night5 from '../../assets/nightingales/night5.webp'
import night6 from '../../assets/nightingales/night6.webp'
import night_tongue from '../../assets/nightingales/night_tongue.webp'
import night_samples from '../../assets/nightingales/night_samples.webp'
import night_plants from '../../assets/nightingales/night_plants.webp'
import night_plants2 from '../../assets/nightingales/night_plants_3.webp'
import glassbirdsVideo from '../../assets/nightingales/night_glassbirdsvideo.mp4'
import landesVideo from '../../assets/nightingales/night_landes.mp4'
import artworkVideo from '../../assets/nightingales/night_artworkvideo.mp4'
import nightingalesTracksTexts from "../../assets/nightingales/nightingalesTracksTexts.json";
import night_selfphoto from '../../assets/nightingales/night_selfphoto.webp'

import TrackBox from '../../components/TrackBox/TrackBox'
import TwoImagesContainer from '../../components/TwoImagesContainer/TwoImagesContainer'
import MusicLink from '../../components/MusicLink/MusicLink'
import QuoteBox from '../../components/QuoteBox/QuoteBox'
import MusicNetworks from '../../components/MusicNetworks/MusicNetworks'
import PhotoGallery from '../../components/PhotoGallery/PhotoGallery'
import OneMediaContainer from '../../components/OneMediaContainer/OneMediaContainer'
import NightingalesDatas from '../../components/NightingalesDatas/NightingalesDatas'
import NightingalesDescription from '../../components/NightingalesDescription/NightingalesDescription'
import NavBar from '../../components/NavBar/NavBar'


import { useApp } from "../../utils/AppContext";

function Nightingales () {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { lang } = useApp();

  const getTrackText = (trackNumber) => {
    const track = nightingalesTracksTexts.find(
      (track) => track.trackNumber === trackNumber
    );
  
    return track?.[`trackText_${lang}`] ?? "";
  };

  return (
    
    <main className='nightingales'>
      <Helmet>
        <title>Nightingales — Benjamin Gibert</title>
        <link
          rel="canonical"
          href="https://benjamingibert.com/nightingales"
        />
      </Helmet>
      <NavBar/>
      <section className='nightingales_mainDataContainer'>
        <img className='nightingales_mainDataContainer_title' src={night_title}/>
        <div className='nightingales_mainDataContainer_starryskyContainer'>
          <img className='nightingales_mainDataContainer_starryskyContainer_starrysky' src={night_starrysky}/>
        </div>
        
        <NightingalesDatas
          lang={lang}
        />
        {/* <MusicNetworks
            bandcamp="https://benjamingibert.bandcamp.com/album/nightingales"
            spotify="https://open.spotify.com/intl-fr/album/13fj6QY0INOvp0YbSbC86V"
            soundcloud="https://soundcloud.com/benjamin-gibert/sets/nightingales"
            apple="https://music.apple.com/fr/album/nightingales-ep/1835002126"
            deezer="https://www.deezer.com/fr/album/808444401"
            instagram="https://www.instagram.com/bgibertmusic/"
            color=""
        /> */}
        <OneMediaContainer
          mediaSrc={night_artwork}
          mediaType="image"
        />
        <NightingalesDescription
        lang={lang}
        />
        <img className='nightingales_mainDataContainer_samples' src={night_samples}/>
      </section >
      <TrackBox
        trackNumber={1}
        imgTitle={night_G}
        trackTitle='glassbirds II'
        trackText={getTrackText(1)}
        color='night'
      />
      <section className='nightingales_videos'>
        <video
          src={glassbirdsVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
        />
        <video
          src={artworkVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
        />
        <video
          src={landesVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
        />
      </section>

      <TwoImagesContainer
        photo1={night_selfphoto}
        photo2={night_plants2}
        // photoBackground={night3}
      />
      <TrackBox
        trackNumber={2}
        imgTitle={night_N}
        trackTitle='noctambulism'
        trackText={getTrackText(2)}
        color='night'
      />
    
      <OneMediaContainer
        mediaSrc={night_plants}
        mediaType="image"
      />
      
    
      <TrackBox
        trackNumber={3}
        imgTitle={night_A}
        trackTitle='aspérité liquide'
        trackText={getTrackText(3)}
        color='night'
      />
      <OneMediaContainer
        mediaSrc={night_tongue}
        mediaType="image"
      />
      <TrackBox
        trackNumber={4}
        imgTitle={night_T}
        trackTitle='taste of sap'
        trackText={getTrackText(4)}
        color='night'
      />      
      <PhotoGallery
          img1={night2}
          img2={night1}
          img3={night4}
          img4={night5}
          img5={night6}
      />
    </main>
    
  )
}

export default Nightingales
