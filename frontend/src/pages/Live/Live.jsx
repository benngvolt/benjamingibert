import './Live.scss'
import React, { useEffect } from 'react'
import { Helmet } from "react-helmet-async";

import NavBar from '../../components/NavBar/NavBar'
import LiveBox from '../../components/LiveBox/LiveBox'
import LiveDates from '../../components/LiveDates/LiveDates'
import LiveVideos from '../../components/LiveVideos/LiveVideos'
import liveHero from '../../assets/live_hero.webp'
import { useApp } from "../../utils/AppContext";

function Live() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { lang } = useApp();

  return (
    <main className='live-page'>
      <Helmet>
        <title>Benjamin Gibert — Live</title>
        <meta name="description" content="Live de Benjamin Gibert : un set électronique immersif en flux continu, entre IDM, ambient et trance, avec création vidéo. Dates et extraits." />
        <link
          rel="canonical"
          href="https://benjamingibert.com/live"
        />
      </Helmet>
      <NavBar />
      <img
        className="live-page__hero"
        src={liveHero}
        width="3360"
        height="1890"
        alt="Benjamin Gibert en live, devant des projections de paysages de montagne"
        fetchPriority="high"
      />
      <LiveVideos lang={lang} />
      <LiveBox lang={lang} mediaOnly />
      <LiveDates lang={lang} />
    </main>
  )
}

export default Live
