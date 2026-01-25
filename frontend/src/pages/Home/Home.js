import './Home.scss'
import { Link } from 'react-router-dom'
import React from 'react'

import MusicNetworks from '../../components/MusicNetworks/MusicNetworks'
import titleNightingales from '../../assets/nightingales/night_title1.webp'
import titleTaihua from '../../assets/taihua/taihua_title.webp'
import titleGemmes from '../../assets/gemmes/gemmes_title.webp'
import video from '../../assets/videoLive.mp4'

function Home () {
    

    return (
        <main className='home'>
            <section className='home_menu'>
                <div class="home_video">
                    <video autoPlay muted loop>
                        <source src={video} type="video/mp4"/>
                    </video>
                </div>
                <h1 className='home_menu_artistName'>BENJAMIN GIBERT</h1>
                {/* <div className='home_menu_albumTitle'>
                    <img src={titleImage}/>
                </div> */}
                <Link
                    className='home_menu_albumTitle home_menu_albumTitle--nightingales'
                    aria-label="Accéder à la page de Nightingales"
                    to="/Nightingales"
                >
                    <img src={titleNightingales}/>
                </Link>
                <Link
                    className='home_menu_albumTitle home_menu_albumTitle--taihua'
                    aria-label="Accéder à la page de Taihua"
                    to="/Taihua"
                >
                    <img src={titleTaihua}/>
                </Link>
                <Link
                    className='home_menu_albumTitle home_menu_albumTitle--gemmes'
                    aria-label="Accéder à la page de Gemmes"
                    to="/Gemmes"
                >
                    <img src={titleGemmes}/>
                </Link>
                <MusicNetworks/>
            </section>
        </main>
    )
}

export default Home
