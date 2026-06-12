import './Salar.scss'
import { Link } from 'react-router-dom'
import React, { useRef, useState, useEffect } from 'react'
import salar_artwork from '../../assets/salar/salar_artwork.webp'
import salar_title from '../../assets/salar/salar_title.webp'

import { Helmet } from "react-helmet-async";


import salar_amanecer from '../../assets/salar/salar_amanecer.webp'
import salar_saltscar from '../../assets/salar/salar_saltscar.webp'
import salar_textureofshards from '../../assets/salar/salar_textureofshards.webp'
import salar_revolcadero from '../../assets/salar/salar_revolcadero.webp'
import salar_chanar from '../../assets/salar/salar_chanar.webp'
import salar_altiplano from '../../assets/salar/salar_altiplano.webp'
import salar_stellar from '../../assets/salar/salar_stellar.webp'
import portraitEPK from '../../assets/portraitEPK.webp'

import NavBar from '../../components/NavBar/NavBar'
import TrackBox from '../../components/TrackBox/TrackBox'
import TwoImagesContainer from '../../components/TwoImagesContainer/TwoImagesContainer'
import MusicLink from '../../components/MusicLink/MusicLink'
import QuoteBox from '../../components/QuoteBox/QuoteBox'
import MusicNetworks from '../../components/MusicNetworks/MusicNetworks'
import OneMediaContainer from '../../components/OneMediaContainer/OneMediaContainer'
import PhotoGallery from '../../components/PhotoGallery/PhotoGallery'
import SalarDatas from '../../components/SalarDatas/SalarDatas'
import SalarDescription from '../../components/SalarDescription/SalarDescription'
import salarTracksTexts from '../../assets/salar/salarTracksTexts.json'
import salarMiscTexts from '../../assets/salar/salarMiscTexts.json'
import BioBox from '../../components/BioBox/BioBox'
import LiveBox from '../../components/LiveBox/LiveBox'


import { useApp } from "../../utils/AppContext";

function Salar() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { lang } = useApp();

  const getTrackText = (trackNumber) => {
    const track = salarTracksTexts.find(
      (track) => track.trackNumber === trackNumber
    );
  
    return track?.[`trackText_${lang}`] ?? "";
  };

  // const backgroundColor = '#a69b88'

  return (
    
    <main className='salar'>
    
      <div className='salar_bgImage'>
        {/* <img
          className='salar_mainDataContainer_title'
          src={salar_title}
        />  */}
      
      

      <section className='salar_mainDataContainer'>
        {/* <SalarDatas 
          lang={lang}
        />
        <MusicNetworks
            bandcamp="https://benjamingibert.bandcamp.com"
            spotify="https://open.spotify.com/intl-fr/album/6ZJviIbXhX7oWwPy2TCaiH"
            soundcloud="https://soundcloud.com/benjamin-gibert"
            apple="https://music.apple.com/fr/album/taihua/1491619557"
            deezer="https://www.deezer.com/fr/album/123080572"
            instagram="https://www.instagram.com/bgibertmusic/"
            // color=""
        /> */}

        
        
        <OneMediaContainer
          mediaSrc={salar_artwork}
          mediaType="image"
        />
        <div className='salar_mainDataContainer_descriptionContainer'>
          <SalarDescription
            lang={lang}
          />
        </div>
      </section>
      </div>
      <OneMediaContainer
        mediaSrc={salar_amanecer}
        mediaType="image"
      />
      <TrackBox
        trackNumber={1}
        trackTitle='amanecer'
        trackText={getTrackText(1)}
        color='salar'
      />
      <QuoteBox
        text={salarMiscTexts[0][`miscText_${lang}`]}
        author={salarMiscTexts[0].author}
        color='salar'
      />
      <OneMediaContainer
        mediaSrc={salar_saltscar}
        mediaType="image"
      />
      <TrackBox
        trackNumber={2}
        trackTitle='saltscar'
        trackText={getTrackText(2)}
        color='salar'
      />
      <QuoteBox
        text={salarMiscTexts[1][`miscText_${lang}`]}
        author={salarMiscTexts[1].author}
        color='salar'
      />
      <OneMediaContainer
        mediaSrc={salar_textureofshards}
        mediaType="image"
      />
      <TrackBox
        trackNumber={3}
        trackTitle='texture of shards'
        trackText={getTrackText(3)}
        color='salar'
      />
      <OneMediaContainer
        mediaSrc={salar_revolcadero}
        mediaType="image"
      />
      <TrackBox
        trackNumber={4}
        trackTitle='revolcadero'
        trackText={getTrackText(4)}
        color='salar'
      />
      <QuoteBox
        text={salarMiscTexts[2][`miscText_${lang}`]}
        author={salarMiscTexts[2].author}
        color='salar'
      />
      <OneMediaContainer
        mediaSrc={salar_chanar}
        mediaType="image"
      />
      <TrackBox
        trackNumber={5}
        trackTitle='chañar'
        trackText={getTrackText(5)}
        color='salar'
      />
      <QuoteBox
        text={salarMiscTexts[3][`miscText_${lang}`]}
        author={salarMiscTexts[3].author}
        color='salar'
      />
      <OneMediaContainer
        mediaSrc={salar_altiplano}
        mediaType="image"
      />
      <TrackBox
        trackNumber={6}
        trackTitle='alti plano'
        trackText={getTrackText(6)}
        color='salar'
      />
      <QuoteBox
        text={salarMiscTexts[4][`miscText_${lang}`]}
        author={salarMiscTexts[4].author}
        color='salar'
      />
      <OneMediaContainer
        mediaSrc={salar_stellar}
        mediaType="image"
      />
      <TrackBox
        trackNumber={7}
        trackTitle='stellar'
        trackText={getTrackText(7)}
        color='salar'
      />
      
      <BioBox
        lang={lang}
      />
      <OneMediaContainer
        mediaSrc={portraitEPK}
        mediaType="image"
      />
      
      <LiveBox
        lang={lang}
      />
    
      <NavBar 
        album= "salar"
        tracks={["amanecer","saltscar", "texture of shards", "revolcadero", "chañar", "alti plano", "stellar"]}
        language={lang}
      />
    </main>
    
  )
}

export default Salar
