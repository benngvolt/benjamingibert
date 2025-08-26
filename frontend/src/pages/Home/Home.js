import './Home.scss'
import { Link } from 'react-router-dom'
import React from 'react'

import MusicNetworks from '../../components/MusicNetworks/MusicNetworks'
import titleImage from '../../assets/nightingales_1ROW_LQ.png'
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
                    className='home_menu_albumTitle'
                    aria-label="Accéder à la page de Nightingales"
                    to="/Nightingales"
                >
                    <img src={titleImage}/>
                </Link>
                <MusicNetworks/>
            </section>
        </main>
    )
}

export default Home
