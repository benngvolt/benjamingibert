import './Home.scss'
import { Link } from 'react-router-dom'
import React from 'react'
import { Helmet } from "react-helmet-async";


import MusicNetworks from '../../components/MusicNetworks/MusicNetworks'
import titleNightingales from '../../assets/nightingales/night_title.webp'
import titleTaihua from '../../assets/taihua/taihua_title.webp'
import titleGemmes from '../../assets/gemmes/gemmes_title.webp'
import video from '../../assets/videoLive.mp4'
import { useApp } from "../../utils/AppContext";


function Home () {
    
    const { lang, setLang } = useApp();

    return (
        
        <main className='home'>
            <Helmet>
                <title>Benjamin Gibert</title>
                <link
                rel="canonical"
                href="https://benjamingibert.com/"
                />
            </Helmet>
            <section className='home_menu'>
                <div className="home_video">
                <video autoPlay muted loop playsInline preload="metadata">
                    <source src={video} type="video/mp4" />
                </video>
                </div>
                <h1 className='home_menu_artistName'>BENJAMIN GIBERT</h1>
              
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
                {/* <Link
                    className='home_menu_albumTitle home_menu_about'
                    aria-label="Accéder à la À propos"
                    to="/about"
                >
                    <h2>ABOUT</h2>
                </Link> */}
                <MusicNetworks
                    bandcamp="https://benjamingibert.bandcamp.com/"
                    spotify="https://open.spotify.com/intl-fr/artist/6QucofyjGzYFvdq4TVQ8kX"
                    soundcloud="https://soundcloud.com/benjamin-gibert"
                    apple="https://music.apple.com/fr/artist/benjamin-gibert/1491146372"
                    deezer="https://www.deezer.com/fr/artist/5685820"
                    instagram="https://www.instagram.com/bgibertmusic/"
                    color=""
                />
                <div className="home_menu_langChoice">
                    <button className={lang==='fr'? 'home_menu_langChoice_fr home_menu_langChoice_fr--selected':'home_menu_langChoice_fr'} onClick={() => setLang('fr')}>
                        FR
                    </button>
                    <button className={lang==='en'? 'home_menu_langChoice_en home_menu_langChoice_en--selected':'home_menu_langChoice_en'} onClick={() => setLang('en')}>
                        EN
                    </button>
                    <button className={lang==='jp'? 'home_menu_langChoice_jp home_menu_langChoice_jp--selected':'home_menu_langChoice_jp'} onClick={() => setLang('jp')}>
                        JP
                    </button>
                </div>
            </section>
        </main>
        
    )
}

export default Home
