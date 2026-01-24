import './Nightingales.scss'
import { Link } from 'react-router-dom'
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
import glassbirdsVideo from '../../assets/nightingales/night_glassbirdsvideo.mp4'
import landesVideo from '../../assets/nightingales/night_landes.mp4'
import artworkVideo from '../../assets/nightingales/night_artworkvideo.mp4'

import NavBar from '../../components/NavBar/NavBar'
import NightingalesShaderGradient from '../../components/NightingalesShaderGradient/NightingalesShaderGradient'

function Nightingales () {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className='nightingales'>
      {/* <NightingalesShaderGradient/> */}
      <NavBar/>
      <section className='nightingales_mainDataContainer'>
        <img className='nightingales_mainDataContainer_title' src={night_title}/>
        <div className='nightingales_mainDataContainer_starryskyContainer'>
          <img className='nightingales_mainDataContainer_starryskyContainer_starrysky' src={night_starrysky}/>
        </div>
        <div className='nightingales_mainDataContainer_datas'>
          <p>
            released August 22, 2025.
          </p>
          <ul>
            <li>
              01 glassbirds II
            </li>
            <li>
              02 noctambulism
            </li>
            <li>
              03 aspérité liquide
            </li>
            <li>
              04 taste of sap
            </li>
          </ul>
          <p>
            Tracks 1, 2, 3, 4 composed, played and produced by Benjamin Gibert, recorded in Toulouse, 2025. Samples of nature sounds by Benjamin Gibert. <br/><br/>
            Mixed and mastered by Guillaume Saint-Etienne & Benjamin Gibert at Music Action, Toulouse. music-action.com Photography by Florian Langellier www.florianlangellier.com Artwork by Florian Langellier & Benjamin Gibert.
          </p>
        </div>
        <img className='nightingales_mainDataContainer_artwork' src={night_artwork}/>
        <div className='nightingales_mainDataContainer_description'>
          <p className='nightingales_mainDataContainer_description_1'>
            Nightingales is a musical fiction in four tracks, a secret rave born in the heart of the trees, a place where chimeras and streams improvise together in a shared language.
          </p>
          <p className='nightingales_mainDataContainer_description_2'>
            The nightingale, emblematic bird of the title, is known for its nocturnal song. Here, it becomes the symbol of a liminal space: between wakefulness and sleep, between nature and synthesis.
          </p>
          <p className='nightingales_mainDataContainer_description_3'>
            It is an imaginary ecosystem made of concrete textures, layers, rhythms and harmonic intertwinings, a space in which one dives to dance. I cultivate a fascination for everything that happens naturally, for what is accidental and escapes me—whether in the environment or in my own mind.<br/>
            The impulse was born from a walk in the forest, on the morning after a house festival. In the contrast between the echoes of a festive night and the morning calm, a question arose: what if I invented my own sanctuary for dance? My favorite activity: venturing into immersion, always on the edge between introspection and excitement for external phenomena.<br/>
            Here appear fragments inherited from the electronic scene of the 90s and 2000s: patterns borrowed from house, IDM, UK garage, ending in a futuristic vocal polyphony before sunrise.<br/>
            A distinctive feature of the EP is the gradual emergence of the human voice, without words or language, in the form of phonemes, breaths and improvised fragments. Used as raw material, it gradually seeps into the tracks, not aiming to signify, but simply to resonate with the other elements.<br/>
          </p>
        </div>
        <img className='nightingales_mainDataContainer_samples' src={night_samples}/>
      </section >
      <section className='nightingales_tracks'>
        <div className='nightingales_tracks_container'>
          <div className='nightingales_tracks_container_glassbirdsContainer'>
            <img src={night_G}/>
            <p>Glassbirds II sounds like a gradual awakening at nightfall. Glass birds fly through the canopy, shattering and reforming in a shimmering sonic environment (a word that guided the entire composition, from sound design to the track's dynamics).<br/><br/>
              The track is built on a framework of melodic patterns created from glass impacts and shards, laid over a rhythm that starts off simple and binary. This raw material, left aside for a long time, was later entirely reworked: the initial pulse gave way to a more fluid, syncopated rhythm inspired by UK garage and brokenbeat patterns.<br/><br/>
              The DX7 synthesizer steers the piece toward a Frutiger Aero aesthetic, creating a play of contrasts with organic sounds. The track gradually shifts toward a more assertive form, culminating in a conclusion clearly shaped by house music codes.<br/><br/>
              Halfway between the organic and the programmatic, Glassbirds II explores the mutation of materials, a chimera of genres.
            </p>
          </div>   
          <div className='nightingales_tracks_container_noctambulismContainer'>
            <img src={night_N}/>
            <p>Noctambulism is arguably the most grounded track on the EP, rooted in a lush, fictional jungle. It opens with a soundscape of birds and insects, recorded in various real-world locations and then drastically transformed — pitched, multiplied, and phase-shifted to create a surreal and uncanny environment.<br/><br/>
              This living mass becomes an autonomous space, a sonic ecosystem crossed by organic sound objects. A modified citation from the track Tui’s Garden (from the previous album Taihua) acts as an anchor — pitched downward, it functions like the memory of a living organism that has mutated.<br/><br/>
              At the heart of this sci-fi setting lies a subtle, continuous rhythmic motif — a fake maraca crafted from insect sounds — slowly leading into the second part. More structured and melodic, this section reintroduces DX7 pads and harmonic experiments derived from field recordings, forming a kind of immersive trance.<br/><br/>
              At the intersection of field recording, IDM, and synthwave, Noctambulism charts a slower path through the forest — just before the dance resumes in the next track.
            </p>
          </div> 
        </div>  
        <img className='nightingales_tracks_plantsImage' src={night_plants}/>
        <div className='nightingales_tracks_container'>
          <div className='nightingales_tracks_container_asperiteContainer'>
            <img src={night_A}/>
            <p>Aspérité Liquide is the most clearly organic house track on the EP. Two elements form its foundation: xylophone patterns played on a handmade instrument found at a flea market, and sliding synth loops that open the piece. These two layers shape a soundscape that evokes a forest crossed by a stream.<br/><br/>
              Once this setting is established, the track evolves in successive touches, gradually referencing ’90s house more explicitly, with a gimmick reminiscent of iconic bass ghosts of the era, followed by a bassline that reinforces the groove.<br/><br/>
              The rhythm relies on a combination of TR-808 and field recordings, captured from natural materials collected in the forest. The piece is punctuated by pitched birds and ghostly choirs, evoking ambiguous life forms.<br/><br/>
              The different layers slide over one another like water, without rigid structure. The result is a sense of fluid continuity.<br/><br/>
              As with the rest of the EP, the approach remains the same: set an environment, settle into it, and let the dance emerge from within.
            </p>
          </div> 
          <div className='nightingales_tracks_container_tasteContainer'>
            <img src={night_T}/>
            <p>Taste of Sap is an immersive vocal experiment, born from a long improvisation session with a harmonizer. The title is evocative. The piece thickens gradually, like sap itself—fluid, viscous, enveloping. Imagined as an end-of-night chant around a fire, it searches, structures itself, and eventually takes the form of a ceremonial hymn at dawn.<br/><br/>
              No language is used: only raw vocal matter, spontaneous phonemes, organic and visceral. The voice is the main instrument.<br/><br/>
              I have a voice I struggled to accept for a long time—until the day I told myself: “after all, it’s my voice, my breath; it is beautiful in its monstrosity, its accidents and its flaws.” I never shaped it or explored it in depth. For a long time, I wanted to let it flow, but I needed a sanctuary, a safe space to welcome it. Taste of Sap became that cradle, that temple of (re)birth. Here I let go: my voice flows like sap—archaic, untamed, beyond words, without measure or grid. Just phonemes, pulsations, from the gut. There is something deeply pleasurable for me in this piece, which fits into no category. It brings me back to my own prehistory.<br/><br/>
              A small vintage, portable Casio synthesizer punctuates the whole, in a playful dialogue with the vocal improvisations. Taste of Sap conjures a primal, ancestral imagery, and prepares the arrival of the sun at dawn.
            </p>
          </div> 
        </div>
      </section>
      <img className='nightingales_tongueImage' src={night_tongue}/>
      {/* <div className='nightingales_photoCredit'>
        <p>Florian Langellier<br/><br/>
        
        </p>
      </div> */}
      <section className='nightingales_videos'>
        
          <video
            src={glassbirdsVideo}
            autoPlay
            muted
            loop
            playsInline
          />

          <video
            src={artworkVideo}
            autoPlay
            muted
            loop
            playsInline
          />

          <video
            src={landesVideo}
            autoPlay
            muted
            loop
            playsInline
          />
        
      </section>
      <section className='nightingales_gallery'>
        <img src={night2}/>
        <img src={night3}/>
        <img src={night4}/>
        <img src={night5}/>
        <img src={night6}/>
      </section>
    </main>
  )
}

export default Nightingales
