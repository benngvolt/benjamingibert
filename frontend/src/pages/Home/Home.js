import './Home.scss'
import { Link } from 'react-router-dom'
import React from 'react'
import { Helmet } from "react-helmet-async";


import MusicNetworks from '../../components/MusicNetworks/MusicNetworks'
import titleNightingales from '../../assets/nightingales/night_title_menu.webp'
import titleTaihua from '../../assets/taihua/taihua_title_menu.webp'
import titleGemmes from '../../assets/gemmes/gemmes_title_menu.webp'
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
            <div className="home_video">
                <video autoPlay muted loop playsInline preload="metadata">
                    <source src={video} type="video/mp4" />
                </video>
            </div>

            <div className='home_title'>
                BENJAMIN GIBERT
            </div>

            <section className='home_menu'>
                <div className='home_menu_flex'>
                    <div className='home_menu_flex_main'>
                        <div className='home_menu_flex_row home_menu_flex_row--nav'>
                            <div className='home_menu_flex_cell home_menu_flex_cell--about'>
                                <Link aria-label="Accéder à la page À propos" to="/about">
                                    {lang === 'jp' ? 'バイオ' : 'Bio'}
                                </Link>
                            </div>
                            <div className='home_menu_flex_cell home_menu_flex_cell--live'>
                                <Link aria-label="Accéder à la page Live" to="/live">
                                    {lang === 'jp' ? 'ライブ' : 'Live'}
                                </Link>
                            </div>
                        </div>

                        <div className='home_menu_flex_row home_menu_flex_row--albums'>
                            <div className='home_menu_flex_cell home_menu_flex_cell--album home_menu_flex_cell--gemmes'>
                                <Link aria-label="Accéder à la page de Gemmes" to="/Gemmes">
                                    <img src={titleGemmes}/>
                                </Link>
                            </div>
                            <div className='home_menu_flex_cell home_menu_flex_cell--album'>
                                <Link aria-label="Accéder à la page de Taihua" to="/Taihua">
                                    <img src={titleTaihua}/>
                                </Link>
                            </div>
                            <div className='home_menu_flex_cell home_menu_flex_cell--album'>
                                <Link aria-label="Accéder à la page de Nightingales" to="/Nightingales">
                                    <img src={titleNightingales}/>
                                </Link>
                            </div>
                        </div>

                        <div className='home_menu_flex_row home_menu_flex_row--social'>
                            <MusicNetworks
                                bandcamp="https://benjamingibert.bandcamp.com/"
                                spotify="https://open.spotify.com/intl-fr/artist/6QucofyjGzYFvdq4TVQ8kX"
                                soundcloud="https://soundcloud.com/benjamin-gibert"
                                apple="https://music.apple.com/fr/artist/benjamin-gibert/1491146372"
                                deezer="https://www.deezer.com/fr/artist/5685820"
                                instagram="https://www.instagram.com/bgibertmusic/"
                                color=""
                                direction="row"
                            />
                        </div>
                    </div>

                    <div className='home_menu_flex_langs'>
                        <button className={lang==='fr'? 'home_menu_langBtn home_menu_langBtn--selected':'home_menu_langBtn'} onClick={() => setLang('fr')}>
                            FR
                        </button>
                        <button className={lang==='en'? 'home_menu_langBtn home_menu_langBtn--selected':'home_menu_langBtn'} onClick={() => setLang('en')}>
                            EN
                        </button>
                        <button className={lang==='jp'? 'home_menu_langBtn home_menu_langBtn--selected':'home_menu_langBtn'} onClick={() => setLang('jp')}>
                            JP
                        </button>
                    </div>
                </div>
            </section>
        </main>
        
    )
}

export default Home
