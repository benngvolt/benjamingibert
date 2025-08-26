import './Nightingales.scss'
import { Link } from 'react-router-dom'
import React, { useRef, useState, useEffect } from 'react'
import nightingalesArtwork from '../../assets/nightingales/nightingales.webp'
import night1 from '../../assets/nightingales/night1.webp'
import night2 from '../../assets/nightingales/night2.webp'
import night3 from '../../assets/nightingales/night3.webp'
import night4 from '../../assets/nightingales/night4.webp'
import night5 from '../../assets/nightingales/night5.webp'
import night6 from '../../assets/nightingales/night6.webp'
import ImageBox from '../../components/ImageBox/ImageBox'
import live1 from '../../assets/live1.webp'
import live2 from '../../assets/live2.webp'
import live3 from '../../assets/live3.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import titleImage from '../../assets/nightingales_2ROW_LQ.png'
import MusicNetworks from '../../components/MusicNetworks/MusicNetworks'

function Nightingales () {
  const audioRefs = useRef([])

  const [nightingalesText, setNightingalesText] = useState('')
  const [nightingalesENText, setNightingalesENText] = useState('')
  const [glassbirdsIIText, setGlassbirdsIIText] = useState('')
  const [asperiteliquideText, setAsperiteliquideText] = useState('')
  const [noctambulismText, setNoctambulismText] = useState('')
  const [tasteOfSapText, setTasteOfSapText] = useState('')
  const [bioText, setBioText] = useState('')

  const [glassbirdsIIENText, setGlassbirdsIIENText] = useState('')
  const [asperiteliquideENText, setAsperiteliquideENText] = useState('')
  const [noctambulismENText, setNoctambulismENText] = useState('')
  const [tasteOfSapENText, setTasteOfSapENText] = useState('')
  const [bioENText, setBioENText] = useState('')

  const [language, setLanguage] = useState('french')

  const [handleDisplayImage, setHandleDisplayImage] = useState(false)
  const [imageBoxUrl, setImageBoxUrl] = useState('')

  const handleImageDisplay = (imageUrl) => {
    setHandleDisplayImage(prev => !prev)
    setImageBoxUrl(imageUrl)
  }

  const credits = [
    { role: 'composition, arrangements and production', name: 'Benjamin Gibert' },
    { role: 'mastering', name: 'Yohm', url: 'https://music-action.com/' },
    { role: 'artwork', name: 'Florian Langellier', url: 'https://florianlangellier.com/' },
    { role: 'length', name: "21'20''" }
  ]

  const tracks = [
    {
      index: '01',
      name: 'Glassbirds II',
      length: "4'52''",
      audio: `<iframe width="100%" height="20" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2115927099%3Fsecret_token%3Ds-nYSvUH6NqoF&color=%237c9cca&inverse=true&auto_play=false&show_user=true"></iframe>`
    },
    {
      index: '02',
      name: 'Noctambulism',
      length: "5'00''",
      audio: `<iframe width="100%" height="20" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2115926964%3Fsecret_token%3Ds-YPspoGmdTLK&color=%23789ac8&inverse=true&auto_play=false&show_user=true"></iframe>`
    },
    {
      index: '03',
      name: 'Aspérité Liquide',
      length: "5'36''",
      audio: `<iframe width="100%" height="20" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2101468242%3Fsecret_token%3Ds-oyv2LY8z4CM&color=%236d85a8&inverse=true&auto_play=false&show_user=true"></iframe>`
    },
    {
      index: '04',
      name: 'Taste of Sap',
      length: "5'52''",
      audio: `<iframe width="100%" height="20" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2115926505%3Fsecret_token%3Ds-4JORrhnnE1a&color=%23789ac8&inverse=true&auto_play=false&show_user=true"></iframe>`
    }
  ]

  const images = [night1, night2, night3, night4, night5, night6, live3, live1, live2].map(url => ({
    url,
    credit: 'Florian Langellier'
  }))

  const tracksInfos = [
    {
      name: '01 Glassbirds II',
      description: glassbirdsIIText,
      descriptionEN: glassbirdsIIENText,
      style: 'Electronica, IDM, Leftfield House, Dance, Frutiger Aero, Experimental ',
      bpm: '130 bpm',
      scale: 'C Major',
      references: 'Oneohtrix Point Never, Aphex Twin, DJ Luck & MC Neat'
    },
    {
      name: '02 Noctambulism',
      description: noctambulismText,
      descriptionEN: noctambulismENText,
      style: 'Fieldrecording, Electronica, IDM, Synthesizer, Experimental',
      bpm: '120 bpm',
      scale: 'Ab Major',
      references: 'Aphex Twin, Tarwater, Kettel, Yosi Horikawa, '
    },
    {
      name: '03 Aspérité Liquide',
      description: asperiteliquideText,
      descriptionEN: asperiteliquideENText,
      style: 'Organic House, Leftfield House, Experimental',
      bpm: '123 bpm',
      scale: 'F Major',
      references: 'Four Tet, Tristan Arp, Crystal Waters, Oneohtrix Point Never'
    },
    {
      name: '04 Taste of Sap',
      description: tasteOfSapText,
      descriptionEN: tasteOfSapENText,
      style: 'Electronica, Vocal Experimentation, Experimental',
      bpm: '74 bpm',
      scale: 'D Major',
      references: 'Björk, Holly Herndon'
    }
  ]

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const [
          nightingalesRes,
          nightingalesENRes,
          glassbirdsIIRes,
          glassbirdsIIENRes,
          asperiteliquideRes,
          asperiteliquideENRes,
          noctambulismRes,
          noctambulismENRes,
          tasteOfSapRes,
          tasteOfSapENRes,
          bioRes,
          bioENRes
        ] = await Promise.all([
          fetch('/nightingalesText.txt'),
          fetch('/nightingalesTextEN.txt'),
          fetch('/glassbirdsII.txt'),
          fetch('/glassbirdsIIEN.txt'),
          fetch('/asperiteliquide.txt'),
          fetch('/asperiteliquideEN.txt'),
          fetch('/noctambulism.txt'),
          fetch('/noctambulismEN.txt'),
          fetch('/tasteofsap.txt'),
          fetch('/tasteofsapEN.txt'),
          fetch('/bio.txt'),
          fetch('/bioEN.txt')
        ])
  
        const [
          nightingalesText,
          nightingalesENText,
          glassbirdsIIText,
          glassbirdsIIENText,
          asperiteliquideText,
          asperiteliquideENText,
          noctambulismText,
          noctambulismENText,
          tasteOfSapText,
          tasteOfSapENText,
          bioText,
          bioENText
        ] = await Promise.all([
          nightingalesRes.text(),
          nightingalesENRes.text(),
          glassbirdsIIRes.text(),
          glassbirdsIIENRes.text(),
          asperiteliquideRes.text(),
          asperiteliquideENRes.text(),
          noctambulismRes.text(),
          noctambulismENRes.text(),
          tasteOfSapRes.text(),
          tasteOfSapENRes.text(),
          bioRes.text(),
          bioENRes.text()
        ])
  
        setNightingalesText(nightingalesText)
        setNightingalesENText(nightingalesENText)
        setGlassbirdsIIText(glassbirdsIIText)
        setGlassbirdsIIENText(glassbirdsIIENText)
        setAsperiteliquideText(asperiteliquideText)
        setAsperiteliquideENText(asperiteliquideENText)
        setNoctambulismText(noctambulismText)
        setNoctambulismENText(noctambulismENText)
        setTasteOfSapText(tasteOfSapText)
        setTasteOfSapENText(tasteOfSapENText)
        setBioText(bioText)
        setBioENText(bioENText)
      } catch (err) {
        console.error('Erreur lors du chargement des textes :', err)
      }
    }
  
    fetchTexts()
  }, [])

  return (
    <main className='nightingales'>
      <Link className='nightingales_backButton' aria-label="Accéder à la page d'accueil" to="/">BACK</Link>

      <section className='nightingales_section'>
        <img className='nightingales_section_artwork' src={nightingalesArtwork} alt="artwork de Nightingales" />
        <div className='nightingales_section_text'>
          {/* <h2 className='nightingales_section_text_title'>nightingales</h2> */}
          <img className='nightingales_section_text_title' src={titleImage}/>
          <div className='nightingales_section_text_networksContainer'>
            <MusicNetworks/>
          </div>
          <div className='nightingales_section_text_language'>
            <button onClick={() => setLanguage('french')} className={language==='french'?'nightingales_section_text_language_button nightingales_section_text_language_button--selected':'nightingales_section_text_language_button nightingales_section_text_language_button--notSelected'}>FR</button>
            <p className='nightingales_section_text_language_button'>|</p>
            <button onClick={() => setLanguage('english')} className={language==='english'?'nightingales_section_text_language_button nightingales_section_text_language_button--selected':'nightingales_section_text_language_button nightingales_section_text_language_button--notSelected'}>EN</button>
          </div>
          {language==='french' && 
            <p className='nightingales_section_text_paragraph' dangerouslySetInnerHTML={{ __html: nightingalesText }} />
          }
           {language==='english' && 
            <p className='nightingales_section_text_paragraph' dangerouslySetInnerHTML={{ __html: nightingalesENText }} />
          }
          <div className='nightingales_section_text_credits'>
            {credits.map((credit, idx) => (
              <div className='nightingales_section_text_credits_line' key={idx}>
                <p className='nightingales_section_text_credits_line_role'>{credit.role}</p>
                {credit.url ? (
                  <a className='nightingales_section_text_credits_line_name' href={credit.url} target="_blank" rel="noreferrer">
                    {credit.name} <FontAwesomeIcon className='nightingales_section_text_credits_line_icon' icon={faArrowUpRightFromSquare} />
                  </a>
                ) : (
                  <p className='nightingales_section_text_credits_line_name'>{credit.name}</p>
                )}
              </div>
            ))}
          </div>
          <ul className='nightingales_section_text_tracklist'>
            {tracks.map((track, index) => (
              <div className='nightingales_section_text_tracklist_line' key={index}>
                <p className='nightingales_section_text_tracklist_line_index'>{track.index}</p>
                <p className='nightingales_section_text_tracklist_line_trackname'>{track.name}</p>
                <p className='nightingales_section_text_tracklist_line_tracklength'>{track.length}</p>
                {/* <div className='nightingales_section_text_tracklist_line_audio' dangerouslySetInnerHTML={{ __html: track.audio }} /> */}
              </div>
            ))}
          </ul>
        </div>
      </section>

      <div className='nightingales_secondContainer'>
        <section className='nightingales_tracksInfos'>
          <ul className='nightingales_tracksInfos_list'>
            {tracksInfos.map((trackInfo, idx) => (
              <li className='nightingales_tracksInfos_list_item' key={idx}>
                <h3 className='nightingales_tracksInfos_list_item_title'>{trackInfo.name}</h3>

                {language==='french' && 
                  <p className='nightingales_tracksInfos_list_item_description' dangerouslySetInnerHTML={{ __html: trackInfo.description }} />
                }
                 {language==='english' && 
                  <p className='nightingales_tracksInfos_list_item_description' dangerouslySetInnerHTML={{ __html: trackInfo.descriptionEN }} />
                }
                <p className='nightingales_tracksInfos_list_item_style'>Genre: {trackInfo.style}</p>
                <p className='nightingales_tracksInfos_list_item_bpm'>{trackInfo.bpm}</p>
                <p className='nightingales_tracksInfos_list_item_references'>References: {trackInfo.references}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className='nightingales_imagesSection'>
          <ul className='nightingales_imagesSection_grid'>
            {images.map((image, idx) => (
              <li className='nightingales_imagesSection_grid_item' key={idx}>
                <img
                  onClick={() => handleImageDisplay(image.url)}
                  className='nightingales_imagesSection_grid_item_img'
                  src={image.url}
                  alt="artwork de Nightingales"
                />
              </li>
            ))}
          </ul>
          {handleDisplayImage && (
            <div className='imageGallery_imageBox' onClick={() => setHandleDisplayImage(false)}>
              <ImageBox imageUrl={imageBoxUrl} setHandleDisplayImage={setHandleDisplayImage} />
            </div>
          )}
        </section>

        {/* SECTION BIO */}
        <section className='nightingales_bioSection'>
          <div className='nightingales_bioSection_container'>
          {language==='french' && 
            <h2 className='nightingales_bioSection_container_title'>À propos</h2>
          }
          {language==='english' && 
            <h2 className='nightingales_bioSection_container_title'>About</h2>
          }
          {language==='french' && 
            <div
              className='nightingales_bioSection_container_paragraph'
              dangerouslySetInnerHTML={{ __html: bioText }}
            />
          }
          {language==='english' && 
            <div
              className='nightingales_bioSection_container_paragraph'
              dangerouslySetInnerHTML={{ __html: bioENText }}
            />
          }
          </div>
        </section>
      </div>
    </main>
  )
}

export default Nightingales
