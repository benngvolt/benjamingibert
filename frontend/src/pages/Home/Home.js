import './Home.scss'
import { Link } from 'react-router-dom'
import React from 'react'

import bandcampLogo from '../../assets/bandcamp.png'
import bandcampLogo2 from '../../assets/bandcamp2.png'
import spotifyLogo from '../../assets/spotify.png'
import spotifyLogo2 from '../../assets/spotify2.png'
import soundcloudLogo from '../../assets/soundcloud.png'
import soundcloudLogo2 from '../../assets/soundcloud2.png'
import appleLogo from '../../assets/apple.png'
import appleLogo2 from '../../assets/apple2.png'
import deezerLogo from '../../assets/deezer.png'
import deezerLogo2 from '../../assets/deezer2.png'
import instagramLogo from '../../assets/instagram.png'
import instagramLogo2 from '../../assets/instagram2.png'

function Home () {
    const networks = [
        {
            url: "https://benjamingibert.bandcamp.com/",
            logo: bandcampLogo,
            logoAlter: bandcampLogo2,
            name: "page Bandcamp de Benjamin Gibert"
        },
        {
            url: "https://open.spotify.com/intl-fr/artist/6QucofyjGzYFvdq4TVQ8kX",
            logo: spotifyLogo,
            logoAlter: spotifyLogo2,
            name: "page Spotify de Benjamin Gibert"
        },
        {
            url: "https://soundcloud.com/benjamin-gibert",
            logo: soundcloudLogo,
            logoAlter: soundcloudLogo2,
            name: "page Soundcloud de Benjamin Gibert"
        },
        {
            url: "https://music.apple.com/fr/artist/benjamin-gibert/1491146372",
            logo: appleLogo,
            logoAlter: appleLogo2,
            name: "page Apple Music de Benjamin Gibert"
        },
        {
            url: "https://www.deezer.com/fr/artist/5685820",
            logo: deezerLogo,
            logoAlter: deezerLogo2,
            name: "page Deezer de Benjamin Gibert"
        },
        {
            url: "https://www.instagram.com/bgibertmusic/",
            logo: instagramLogo,
            logoAlter: instagramLogo2,
            name: "page Instagram de Benjamin Gibert"
        },
    ]

    return (
        <main className='home'>
            <section className='home_menu'>
                <h1 className='home_menu_artistName'>BENJAMIN GIBERT</h1>
                <Link
                    className='home_menu_albumTitle'
                    aria-label="Accéder à la page de Nightingales"
                    to="/Nightingales"
                >
                    NIGHTINGALES
                </Link>
                <ul className='home_menu_networksList'>
                    {networks.map((ntw, index) => (
                        <li className='home_menu_networksList_item' key={index}>
                            <a
                                className='home_menu_networksList_item_link'
                                href={ntw.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className='home_menu_networksList_item_logo white'
                                    src={ntw.logo}
                                    alt={ntw.name}
                                />
                                <img
                                    className='home_menu_networksList_item_logo color'
                                    src={ntw.logoAlter}
                                    alt={ntw.name}
                                />
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Home
