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

function Nightingales () {

    const [nightingalesText, setNightingalesText] = useState('')

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
            "description": ""

        },
        { 
            "index":'02',
            "name":"Noctambulism",
            "length": "5'00''",
            "description": ""
        },
        { 
            "index":'03',
            "name":"Aspérité Liquide",
            "length": "5'36''",
            "description": ""
        },
        { 
            "index":'04',
            "name":"Taste of Sap",
            "length": "5'52''",
            "description": ""
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
        }
    ]

    useEffect(() => {
        fetch('/nightingalesText.txt')
        .then((response) => response.text())
        .then((data) => setNightingalesText(data))
        .catch((err) => console.error('Erreur chargement texte :', err))
    }, [])

    return (
        <main className='nightingales'>
            <section className='nightingales_section'>
                <img
                    className='nightingales_section_artwork'
                    src={nightingalesArtwork}
                    alt="artwork de Nightingales"
                />
                <div className='nightingales_section_text'>
                    <h2 className='nightingales_section_text_title'>NIGHTINGALES</h2>
                    <p className='nightingales_section_text_paragraph'>{nightingalesText}</p>
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
                            <p className='nightingales_section_text_tracklist_line_role'>{track.index}</p>
                            <p className='nightingales_section_text_tracklist_line_name'>{track.name}</p>
                            <p className='nightingales_section_text_tracklist_line_name'>{track.length}</p>  
                        </div>
                    ))}
                    </ul>
                </div>
            </section>
                        
            <section className='nightingales_imagesSection'>
                <ul className='nightingales_imagesSection_grid'>
                    {images.map((image)=>(
                    <li className='nightingales_imagesSection_grid_item'>
                        <img
                        className='nightingales_imagesSection_grid_item_img'
                        src={image.url}
                        alt="artwork de Nightingales"
                        />
                        {/* <figcaption
                        className='nightingales_imagesSection_grid_item_caption'
                        >
                            ©{image.credit}
                        </figcaption> */}
                    </li>
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Nightingales