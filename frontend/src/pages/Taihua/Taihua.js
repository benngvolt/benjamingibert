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

import GemmesTrackBox from '../../components/GemmesTrackBox/GemmesTrackBox'
import NavBar from '../../components/NavBar/NavBar'
import TaihuaTrackBox from '../../components/TaihuaTrackBox/TaihuaTrackBox'
import TwoImagesContainer from '../../components/TwoImagesContainer/TwoImagesContainer'
import MusicLink from '../../components/MusicLink/MusicLink'
import QuoteBox from '../../components/QuoteBox/QuoteBox'
import MusicNetworks from '../../components/MusicNetworks/MusicNetworks'
import PhotoGallery from '../../components/PhotoGallery/PhotoGallery'

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

function Taihua() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const getTrackText = (trackNumber) => {
    return (
      taihuaTracksTexts.find((track) => track.trackNumber === trackNumber)
        ?.trackText ?? ''
    )
  }

  const backgroundColor = 'black'

  return (
    <main className='taihua'>
      <NavBar />
      <section className='taihua_mainDataContainer'>
        <div className='taihua_mainDataContainer_firstContainer'>
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
          <div className='taihua_mainDataContainer_datas'>
            <p>released November 04, 2019.</p>
            <ul>
              <li>01 barefoot</li>
              <li>02 low tide cavern I</li>
              <li>03 native forests</li>
              <li>04 tūīs garden</li>
              <li>05 glassbirds (feat.SVQO)</li>
              <li>06 low tide cavern II</li>
              <li>07 shells</li>
              <li>08 low tide cavern III</li>
              <li>09 franz josef glacier</li>
              <li>10 gemme IV + tūīs garden (hurricane version)</li>
            </ul>
            <p>
              Tracks 1, 2, 3, 4, 6, 7, 8, 9 composed, played and produced by
              Benjamin Gibert, recorded in Muriwai (new zealand), 2019. Samples
              of nature sounds by Benjamin Gibert. <br />
              <br />
              Track 9 composed by Benjamin Gibert & SVQO, produced by SVQO,
              recorded in Lyon (France) and Porto Alegre (Brasil), 2013-2021.
              <br />
              Track 10 composed and produced by Benjamin Gibert, recorded in
              Muriwai (New Zealand) and l'Abbaye Royale de Fontevraud & the
              forest of Meygal (France), 2021.
              <br />
              <br />
              Artwork by Thomas Vaillant & Benjamin Gibert
              <br />
              Recorded, mixed and mastered by Benjamin Gibert at Earthskin
              Muriwai Residency, New Zealand
              <br />
            </p>
            <MusicNetworks />
          </div>
        </div>
        <img className='taihua_mainDataContainer_artwork' src={taihua_artwork} />
        <QuoteBox
          text={taihuaMiscTexts[5].miscText}
          author={taihuaMiscTexts[5].author}
        />
        <div className='taihua_mainDataContainer_descriptionContainer'>
          <img
            className='taihua_mainDataContainer_descriptionContainer_objetTypoTitre'
            src={taihua_objetTypoTitre}
          />
          <div className='taihua_mainDataContainer_descriptionContainer_descriptions'>
            <p className='taihua_mainDataContainer_descriptionContainer_descriptions_1'>
              Antechamber of the ocean.
            </p>
            <p className='taihua_mainDataContainer_descriptionContainer_descriptions_2'>
              Taihua refers to the intertidal zone, area between the limits of
              low and high-tide.
            </p>
            <p className='taihua_mainDataContainer_descriptionContainer_descriptions_3'>
              We strode along many 'taihuas' in new Zealand, searching for sounds
              and noises, shells, outlooks to native forests or distant islands.
              <br />
              <br />
              We strolled by a mighty and often restless ocean. we surfed on
              rising tide waves and ran barefoot in the wet ‘taihua’ of the
              Muriwai beach. We witnessed dusk there, and we photographed pink
              skies, the surface of the water as a mirror. We captured the echo
              of caves we could only enter at low-tide. We examined sand covered
              in shells that chimed like winds, and arranged them by note,
              depending on their size.
              <br />
              <br />
              Then, we went deeper in the land, along the streams, still
              barefoot. We threw ourselves into native forests, surrounded by
              chatty endemic birds.All pieces of ‘taihua’ are about hyper
              locality. they hold sounds harvested on site, from the crazy
              melodic phrases of the tui or the piwakawaka, to the upbeat
              rhythmical patterns of the insects. Humans also have a role in
              this story, they simply made sure they took off their shoes.
            </p>
          </div>
        </div>
      </section>
      <section className='taihua_livePhotosContainer'>
        <img src={taihua_photoLive3} />
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
      <TaihuaTrackBox
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
        text={taihuaMiscTexts[3].miscText}
        author={taihuaMiscTexts[3].author}
      />
      <TaihuaTrackBox
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
        text={taihuaMiscTexts[2].miscText}
        author={taihuaMiscTexts[2].author}
      />
      <TaihuaTrackBox
        trackNumber={3}
        imgTitle={taihua_nfTitle}
        trackTitle='native forests'
        trackText={getTrackText(3)}
      />
      <QuoteBox
        text={taihuaMiscTexts[4].miscText}
        author={taihuaMiscTexts[4].author}
      />
      <TwoImagesContainer
        photo1={taihua_photo_forest2}
        photo2={taihua_photo_forest1}
        photoBackground={taihua_photo_forestdetail}
        backgroundColor={backgroundColor}
      />
      <TaihuaTrackBox
        trackNumber={4}
        imgTitle={taihua_tgTitle}
        trackTitle='tuis garden'
        trackText={getTrackText(4)}
      />
      <QuoteBox
        text={taihuaMiscTexts[1].miscText}
        author={taihuaMiscTexts[1].author}
      />
      <section className='taihua_livePhotosContainer'>
          <img src={taihua_photo_portrait} />
      </section>
      <div className='taihua_doubleTracksContainer'>
        <TaihuaTrackBox
          trackNumber={5}
          imgTitle={taihua_sTitle}
          trackTitle='shells'
          trackText={getTrackText(5)}
        />

        <TwoImagesContainer
          photo1={taihua_photo_shellphone1}
          photo2={taihua_photo_foam2}
          photoBackground={taihua_photo_dolphin}
          backgroundColor={backgroundColor}
        />

        <TaihuaTrackBox
          trackNumber={6}
          imgTitle={taihua_fjgTitle}
          trackTitle='franz josef glacier'
          trackText={getTrackText(6)}
        />
      </div>
      <section className='taihua_livePhotosContainer'>
          <video
            src={taihua_videoFjg}
            autoPlay
            loop
            muted
            playsInline
          />
      </section>
      <QuoteBox
        text={taihuaMiscTexts[6].miscText}
        author={taihuaMiscTexts[6].author}
      />
    </main>
  )
}

export default Taihua
