import './Nightingales.scss'
// import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import React, { useContext, useState, useEffect } from 'react'
import nightingalesArtwork from '../../assets/nightingales/nightingales.webp'
import night1 from '../../assets/nightingales/night1.webp'
import night2 from '../../assets/nightingales/night2.webp'
import night3 from '../../assets/nightingales/night3.webp'
import night4 from '../../assets/nightingales/night4.webp'
import night5 from '../../assets/nightingales/night5.webp'
import night6 from '../../assets/nightingales/night6.webp'
import audioGlassbirdsII from '../../assets/glassbirds2.mp3'
import audioNoctambulism from '../../assets/noctambulism.mp3'
import audioTasteofsap from '../../assets/tasteofsap.mp3'
import ImageBox from '../../components/ImageBox/ImageBox'
import live1 from '../../assets/live1.webp'
import live2 from '../../assets/live2.webp'
import live3 from '../../assets/live3.webp'

function Nightingales () {

    const [nightingalesText, setNightingalesText] = useState('')
    const [glassbirdsIIText, setGlassbirdsIIText] = useState('')

    const [handleDisplayImage, setHandleDisplayImage] = useState(false);
    const [imageBoxUrl, setImageBoxUrl] = useState('');

    const handleImageDisplay = (imageUrl) => {
        console.log(handleDisplayImage)
        if (handleDisplayImage===true) {
            setHandleDisplayImage(false);
        } else {
            setHandleDisplayImage(true);
        }
        setImageBoxUrl(imageUrl)
    };

    const credits = [ 
            { 
                "role":"composition, arrangements and production",
                "name": "Benjamin Gibert"
            },
            {
                "role":"mastering",
                "name": "Guillaume"
            },
            {
                "role":"artwork",
                "name": "Florian Langellier",
                "url":"https://florianlangellier.com/"
            },
            {
                "role":"genres",
                "name": "IDM, organic house, electronic experimental, ambient"
            },
            {
                "role":"length",
                "name": "21'20''"
            }
        ]

    const tracks = [ 
        { 
            "index":'01',
            "name":"Glassbirds II",
            "length": "4'52''",
            "description": "",
            "audio":audioGlassbirdsII

        },
        { 
            "index":'02',
            "name":"Noctambulism",
            "length": "5'00''",
            "description": "",
            "audio":audioNoctambulism
        },
        { 
            "index":'03',
            "name":"Aspérité Liquide",
            "length": "5'36''",
            "description": "",
            "audio":audioNoctambulism
        },
        { 
            "index":'04',
            "name":"Taste of Sap",
            "length": "5'52''",
            "description": "",
            "audio":audioTasteofsap
        },
        
    ]

    const images = [
        {
            "url": night1,
            "credit":"Florian Langellier"
        },
        {
            "url": night2,
            "credit":"Florian Langellier"
        },
        {
            "url": night3,
            "credit":"Florian Langellier"
        },
        {
            "url": night4,
            "credit":"Florian Langellier"
        },
        {
            "url": night5,
            "credit":"Florian Langellier"
        },
        {
            "url": night6,
            "credit":"Florian Langellier"
        },
        {
            "url": live3,
            "credit":"Florian Langellier"
        },
        {
            "url": live1,
            "credit":"Florian Langellier"
        },
        {
            "url": live2,
            "credit":"Florian Langellier"
        }
    ]

    const tracksInfos = [
        {
            "name":"Glassbirds II",
            "description":glassbirdsIIText,
            "style":"Electronica, IDM, Leftfield House, Techno",
            "bpm":"130 bpm",
            "scale":"C Major",
            "references":"Aphex Twin, Oneohtrix Point Never, Mount Kimbie, LFO, DJ Luck & MC Neat"
        },
        {
            "name":"Noctambulism",
            "description":glassbirdsIIText,
            "style":"Electronica, IDM, Leftfield House, Techno",
            "bpm":"130 bpm",
            "scale":"C Major",
            "references":"Aphex Twin, Oneohtrix Point Never, Mount Kimbie, LFO, DJ Luck & MC Neat"
        },
        {
            "name":"Aspérité Liquide",
            "description":glassbirdsIIText,
            "style":"Electronica, IDM, Leftfield House, Techno",
            "bpm":"130 bpm",
            "scale":"C Major",
            "references":"Aphex Twin, Oneohtrix Point Never, Mount Kimbie, LFO, DJ Luck & MC Neat"
        },
        {
            "name":"Taste of Sap",
            "description":glassbirdsIIText,
            "style":"Electronica, IDM, Leftfield House, Techno",
            "bpm":"130 bpm",
            "scale":"C Major",
            "references":"Aphex Twin, Oneohtrix Point Never, Mount Kimbie, LFO, DJ Luck & MC Neat"
        }
    ]

    useEffect(() => {
        const fetchTexts = async () => {
            try {
                const [nightingalesRes, glassbirdsIIRes] = await Promise.all([
                    fetch('/nightingalesText.txt'),
                    fetch('/glassbirdsII.txt')
                ])
    
                const [nightingalesText, glassbirdsIIText] = await Promise.all([
                    nightingalesRes.text(),
                    glassbirdsIIRes.text()
                ])
    
                setNightingalesText(nightingalesText)
                setGlassbirdsIIText(glassbirdsIIText)
            } catch (err) {
                console.error('Erreur lors du chargement des textes :', err)
            }
        }
    
        fetchTexts()
    }, [])

    return (
        <main className='nightingales'>
            <Link
                className='nightingales_backButton'
                aria-label="Accéder à la page d'accueil'"
                to="/"
            >
                BACK
            </Link>
            <section className='nightingales_section'>
                <img
                    className='nightingales_section_artwork'
                    src={nightingalesArtwork}
                    alt="artwork de Nightingales"
                />
                <div className='nightingales_section_text'>
                    <h2 className='nightingales_section_text_title'>NIGHTINGALES</h2>
                    <p className='nightingales_section_text_paragraph'>{nightingalesText || ''}</p>
                    <div className='nightingales_section_text_credits'>
                    {credits.map((credit)=>(
                        <div className='nightingales_section_text_credits_line'>
                            <p className='nightingales_section_text_credits_line_role'>{credit.role}</p>
                            {credit.url &&
                                <a className='nightingales_section_text_credits_line_name' href={credit.url} target="_blank" rel="noreferrer">{credit.name}</a>
                            }
                            {!credit.url &&
                                <p className='nightingales_section_text_credits_line_name'>{credit.name}</p>
                            }
                        </div>
                    ))}
                    </div>
                    <ul className='nightingales_section_text_tracklist'>
                    {tracks.map((track)=>(
                        <div className='nightingales_section_text_tracklist_line'>
                            <p className='nightingales_section_text_tracklist_line_index'>{track.index}</p>
                            <p className='nightingales_section_text_tracklist_line_trackname'>{track.name}</p>
                            <p className='nightingales_section_text_tracklist_line_tracklength'>{track.length}</p>  
                            <audio controls>
                                <source src={track.audio} type="audio/mpeg"/>
                            </audio>
                        </div>
                    ))}
                    </ul>
                </div>
            </section>
            <div className='nightingales_secondContainer'>  
                <section className='nightingales_imagesSection'>
                    <ul className='nightingales_imagesSection_grid'>
                        {images.map((image)=>(
                        <li className='nightingales_imagesSection_grid_item'>
                            <img
                            onClick={() => handleImageDisplay(image.url)}
                            className='nightingales_imagesSection_grid_item_img'
                            src={image.url}
                            alt="artwork de Nightingales"
                            />
                        </li>
                        ))}
                    </ul>
                    {handleDisplayImage===true &&
                    <div className='imageGallery_imageBox' onClick={() => setHandleDisplayImage(false)}>
                        <ImageBox imageUrl={imageBoxUrl} setHandleDisplayImage={setHandleDisplayImage}/>
                    </div>
                    }
                </section>
                <section className='nightingales_tracksInfos'>
                    <ul className='nightingales_tracksInfos_list'>
                        {tracksInfos.map((trackInfo)=>(
                        <li className='nightingales_tracksInfos_list_item'>
                            <h3 className='nightingales_tracksInfos_list_item_title'>{trackInfo.name}</h3>
                            <p className='nightingales_tracksInfos_list_item_description'>{trackInfo.description}</p>
                            <p className='nightingales_tracksInfos_list_item_style'>Genre: {trackInfo.style}</p>
                            <p className='nightingales_tracksInfos_list_item_references'>References: {trackInfo.references}</p>
                            <p className='nightingales_tracksInfos_list_item_bpm'>{trackInfo.bpm}</p>
                            <p className='nightingales_tracksInfos_list_item_scale'>{trackInfo.scale}</p>
                        </li>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    )
}

export default Nightingales