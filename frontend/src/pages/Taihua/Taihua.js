import './Taihua.scss'
import { Link } from 'react-router-dom'
import React, { useRef, useState, useEffect } from 'react'
import taihua_artwork from '../../assets/taihua/taihua_artwork.webp'
import taihua_title from '../../assets/taihua/taihua_title.webp'
import taihua_ecume from '../../assets/taihua/taihua_ecume.svg'
import taihua_objetTypoTitre from '../../assets/taihua/taihua_objetTypoTitre.webp'
import taihua_K7recto from '../../assets/taihua/taihua_K7recto.webp'
import taihua_K7verso from '../../assets/taihua/taihua_K7verso.webp'
import taihua_K7_1 from '../../assets/taihua/taihua_K7_1.webp'
import taihua_K7_2 from '../../assets/taihua/taihua_K7_2.webp'
import taihua_K7_3 from '../../assets/taihua/taihua_K7_3.webp'
import taihua_K7_4 from '../../assets/taihua/taihua_K7_4.webp'
import taihua_nfTitle from '../../assets/taihua/taihua_nfTitle.webp'
import taihua_sTitle from '../../assets/taihua/taihua_sTitle.webp'
import taihua_bTitle from '../../assets/taihua/taihua_bTitle.webp'
import taihua_ltcTitle from '../../assets/taihua/taihua_ltcTitle.webp'
import taihua_tgTitle from '../../assets/taihua/taihua_tgTitle.webp'
import taihua_fjgTitle from '../../assets/taihua/taihua_fjgTitle.webp'
import taihua_photo_blackstone from '../../assets/taihua/taihua_photo_blackstone.webp'
import taihua_photo_dolphin from '../../assets/taihua/taihua_photo_dolphin.webp'
import taihua_photo_car from '../../assets/taihua/taihua_photo_car.webp'
import taihua_photo_foam1 from '../../assets/taihua/taihua_photo_foam1.webp'
import taihua_photo_foam2 from '../../assets/taihua/taihua_photo_foam2.webp'
import taihua_photo_forest1 from '../../assets/taihua/taihua_photo_forest1.webp'
import taihua_photo_map from '../../assets/taihua/taihua_photo_map.webp'
import taihua_photo_portrait from '../../assets/taihua/taihua_photo_portrait.webp'

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
import TaihuaDatas from '../../components/TaihuaDatas/TaihuaDatas'
import TaihuaDescription from '../../components/TaihuaDescription/TaihuaDescription'

import taihua_barefootPhoto from '../../assets/taihua/taihua_barefootPhoto.webp'
import taihua_lowtidecavernPhoto from '../../assets/taihua/taihua_lowtidecavernPhoto.webp'
import taihua_nativeforestsPhoto from '../../assets/taihua/taihua_nativeforestsPhoto.webp'
import taihua_tuisgardenPhoto from '../../assets/taihua/taihua_tuisgardenPhoto.webp'
import taihua_shellsPhoto from '../../assets/taihua/taihua_shellsPhoto.webp'
import taihua_videoFjg from '../../assets/taihua/taihua_videoFjg.mp4'

import taihua_photoLive1 from '../../assets/taihua/taihua_photoLive1.webp'
import taihua_photoLive2 from '../../assets/taihua/taihua_photoLive2.webp'
import taihua_photoLive3 from '../../assets/taihua/taihua_photoLive3.webp'
import taihua_photoLive4 from '../../assets/taihua/taihua_photoLive4.webp'

import taihuaTracksTexts from '../../assets/taihua/taihuaTracksTexts.json'
import taihuaMiscTexts from '../../assets/taihua/taihuaMiscTexts.json'

import { faPlay } from '@fortawesome/free-solid-svg-icons'

import { useApp } from "../../utils/AppContext";

function Taihua() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { lang } = useApp();

  const getTrackText = (trackNumber) => {
    const track = taihuaTracksTexts.find(
      (track) => track.trackNumber === trackNumber
    );
  
    return track?.[`trackText_${lang}`] ?? "";
  };

  const backgroundColor = 'black'

  return (
    <main className='taihua'>
      
      <NavBar />

      <div className='taihua_bg'></div>
        <img
          className='taihua_mainDataContainer_title'
          src={taihua_title}
        />
        <div className='taihua_mainDataContainer_ecumeContainer'>
          <img
            className='taihua_mainDataContainer_ecumeContainer_starrysky'
            src={taihua_ecume}
          />
      </div>

      <section className='taihua_mainDataContainer'>
        <TaihuaDatas 
          lang={lang}
        />
        <MusicNetworks />
        <OneMediaContainer
          mediaSrc={taihua_artwork}
          mediaType="image"
        />
        <QuoteBox
          text={taihuaMiscTexts[5][`miscText_${lang}`]}
          author={taihuaMiscTexts[5].author}
        />
        <div className='taihua_mainDataContainer_descriptionContainer'>
          <img
            className='taihua_mainDataContainer_descriptionContainer_objetTypoTitre'
            src={taihua_objetTypoTitre}
          />
          <TaihuaDescription
            lang={lang}
          />
        </div>
      </section>

      <section className='taihua_livePhotosContainer'>
        <OneMediaContainer
          mediaSrc={taihua_photoLive3}
          mediaType="image"
        />
        <div className='taihua_livePhotosContainer_links'>
          <MusicLink
            link='https://on.soundcloud.com/UzEZvxpycAxhJdrop9'
            icon={faPlay}
            name='live at Résidence Alto, Août 2022'
          />
          <MusicLink
            link='https://podcasts.apple.com/be/podcast/sonore-double-format-11-aurus-benjamin-gibert/id1568154247?i=1000522227522&l=fr-FR'
            icon={faPlay}
            name='interview Podcast Sonore'
          />
          <MusicLink
            link='https://www.indiemusic.fr/benjamin-gibert-taihua/'
            icon={faPlay}
            name='IndieMusic'
          />
        </div>
      </section>
      
      <section className='taihua_K7Container'>
        <PhotoGallery
          img1={taihua_K7recto}
          img2={taihua_K7verso}
          img3={taihua_K7_1}
          img4={taihua_K7_2}
          img5={taihua_K7_4}
        />
        <div className='taihua_K7Container_button'>
          <MusicLink
            link='https://benjamingibert.bandcamp.com/album/taihua'
            icon={faPlay}
            name='BUY'
          />
        </div>
      </section>
      <TrackBox
        trackNumber={1}
        imgTitle={taihua_bTitle}
        trackTitle='barefoot'
        trackText={getTrackText(1)}
      />
      <TwoImagesContainer
        photo1={taihua_photo_map}
        photo2={taihua_photo_car}
        photoBackground={taihua_photo_blackstone}
      />
      <QuoteBox
        text={taihuaMiscTexts[3][`miscText_${lang}`]}
        author={taihuaMiscTexts[3].author}
      />
      <TrackBox
        trackNumber={2}
        imgTitle={taihua_ltcTitle}
        trackTitle='low tide cavern'
        trackText={getTrackText(2)}
      />
      <PhotoGallery
        img1={taihua_photo_foam1}
        img2={taihua_barefootPhoto}
        img3={taihua_photo_jardin}
        img4={taihua_photo_dessin}
        img5={taihua_photo_mainportrait}
      />
      <QuoteBox
        text={taihuaMiscTexts[2][`miscText_${lang}`]}
        author={taihuaMiscTexts[2].author}
      />
      <TrackBox
        trackNumber={3}
        imgTitle={taihua_nfTitle}
        trackTitle='native forests'
        trackText={getTrackText(3)}
      />
      <QuoteBox
        text={taihuaMiscTexts[4][`miscText_${lang}`]}
        author={taihuaMiscTexts[4].author}
      />
      <TwoImagesContainer
        photo1={taihua_photo_forest2}
        photo2={taihua_photo_forest1}
        photoBackground={taihua_photo_forestdetail}
        backgroundColor={backgroundColor}
      />
      <TrackBox
        trackNumber={4}
        imgTitle={taihua_tgTitle}
        trackTitle='tuis garden'
        trackText={getTrackText(4)}
      />
      <QuoteBox
        text={taihuaMiscTexts[0][`miscText_${lang}`]}
        author={taihuaMiscTexts[0].author}
      />
      <OneMediaContainer
        mediaSrc={taihua_photo_portrait}
        mediaType="image"
      />
      
      <TrackBox
        trackNumber={5}
        imgTitle={taihua_sTitle}
        trackTitle='shells'
        trackText={getTrackText(5)}
      />

      <TwoImagesContainer
        photo1={taihua_photo_shellphone1}
        photo2={taihua_photo_foam2}
        photoBackground={taihua_shellsPhoto}
        backgroundColor={backgroundColor}
      />

      <TrackBox
        trackNumber={6}
        imgTitle={taihua_fjgTitle}
        trackTitle='franz josef glacier'
        trackText={getTrackText(6)}
      />
      <OneMediaContainer
        mediaSrc={taihua_videoFjg}
        mediaType="video"
      />
      <QuoteBox
        text={taihuaMiscTexts[1][`miscText_${lang}`]}
        author={taihuaMiscTexts[1].author}
      />
      <QuoteBox
        text={taihuaMiscTexts[6][`miscText_${lang}`]}
        author={taihuaMiscTexts[6].author}
      />
    </main>
  )
}

export default Taihua
