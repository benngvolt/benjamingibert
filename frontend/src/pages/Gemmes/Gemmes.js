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

import NavBar from '../../components/NavBar/NavBar'
import TwoImagesContainer from '../../components/TwoImagesContainer/TwoImagesContainer'

import GemmesTrackBox from '../../components/GemmesTrackBox/GemmesTrackBox'
import GemmesShaderGradient from '../../components/GemmesShaderGradient/GemmesShaderGradient'

function Gemmes () {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getTrackText = (trackNumber) => {
    
    return gemmesTracksTexts.find(
      (track) => track.trackNumber === trackNumber
    )?.trackText ?? "";
  };

  const backgroundColor='rgb(202, 214, 246)'

  return (
    <main className='gemmes'>
      
      <GemmesShaderGradient/>
      <NavBar/>

      <section className='gemmes_mainDataContainer'>
        <img className='gemmes_mainDataContainer_title' src={gemmes_title}/>
        <div className='gemmes_mainDataContainer_snowflakesContainer'>
          <img className='gemmes_mainDataContainer_snowflakesContainer_snowflakes' src={gemmes_snowflakes}/>
        </div>
        <div className='gemmes_mainDataContainer_datas'>
          <p>
            released February 25, 2019.
          </p>
          <ul>
            <li>
              01 gemme I
            </li>
            <li>
              02 gemme II
            </li>
            <li>
              03 gemme III
            </li>
            <li>
              04 gemme IV
            </li>
            <li>
              05 gemme V
            </li>
          </ul>
          <p>
            Tracks 1, 2, 3, 4, 5 composed, played and produced by Benjamin Gibert, recorded in L'Abbaye Royale de Fontevraud, 2018. Samples of nature sounds by Benjamin Gibert. <br/><br/>
            Mixed and mastered by Benjamin Gibert, Lyon. Artwork by Benjamin Gibert.
          </p>
        </div>
        <img className='gemmes_mainDataContainer_artwork' src={gemmes_artwork}/>
      </section >

      <section className='gemmes_descriptionContainer'>
        <p>
        The first days were filled with excitement: everything felt possible. They were also tinged with a certain apprehension, as I had to produce something ambitious within a single month. Instinctively, I connected to what I was discovering while wandering through the forest and along the nearby riverbanks. I felt the need to gather material from the surrounding environment, as if music were a form of cooking, made from local ingredients—always different depending on experiences, encounters, and discoveries.
        </p>
        <p>
        I don’t feel particularly connected to the tradition of Christmas. Instead, I wanted to compose around the winter solstice, or more precisely around the transition from autumn to winter. This transition is beautiful to observe in nature: the drop in temperature, the shifting birdsongs, that exact moment when the soft amber light gives way to November drizzle. I didn’t see any snow during those days, the region isn’t especially suited for it. But I spent time walking through the forest, watching the leaves change color, and starting to layer my clothes.<br/><br/>
        The five pieces of Gemmes emerged from this gradual transformation.
        </p>
      </section>
      <div className='gemmes_arcadeImage'>
        <img src={gemmes_photo_arcade}/>
      </div>

      <section className='gemmes_videos'> 
          <video className='gemmes_videos_video'
            src={gemmes_video1}
            autoPlay
            muted
            loop
            playsInline
            reverse
          />
          <video className='gemmes_videos_video'
            src={gemmes_video2}
            autoPlay
            muted
            loop
            playsInline
          />
      </section>

      <GemmesTrackBox
        trackNumber={1}
        imgSrc={gemmes_photo_chardons}
        imgTitle={gemmes_title_track1}
        trackTitle="first chills"
        trackText={getTrackText(1)}
      />

      <TwoImagesContainer
        photo1={gemmes_photo_fenetre}
        photo2={gemmes_photo_myself3}
        photoBackground={gemmes_photo_baies}
        backgroundColor={backgroundColor}
      />

      <GemmesTrackBox
        trackNumber={2}
        videoSrc={gemmes_video_g2}
        imgTitle={gemmes_title_track2}
        trackTitle="cold water"
        trackText={getTrackText(2)}
      />

      <GemmesTrackBox
        trackNumber={3}
        videoSrc={gemmes_video_g4_1LQ}
        imgTitle={gemmes_title_track3}
        trackTitle="days of strong wind"
        trackText={getTrackText(3)}
      />

      <TwoImagesContainer
        photo1={gemmes_photo_arduino}
        photo2={gemmes_photo_autoharp}
        photoBackground={gemmes_photo_facade}
        backgroundColor={backgroundColor}
      />
  
      <GemmesTrackBox
        trackNumber={4}
        imgSrc={gemmes_photo_ciel}
        imgTitle={gemmes_title_track4}
        trackTitle="fairy lights in the dark"
        trackText={getTrackText(3)}
      />

      <section className='gemmes_videosG4'>
          <video className='gemmes_videosG4_video'
            type="video/mp4"
            src={gemmes_video_g4_3LQ}
            autoPlay
            muted
            loop
            playsInline
          />
          <video className='gemmes_videosG4_video'
            type="video/mp4"
            src={gemmes_video_g4_2LQ}
            autoPlay
            muted
            loop
            playsInline
          />
      </section>

      <GemmesTrackBox
        trackNumber={5}
        imgSrc={gemmes_photo_toit}
        imgTitle={gemmes_title_track5}
        trackTitle="fireplaces"
        trackText={getTrackText(5)}
      />

    </main>
  )
}

export default Gemmes
