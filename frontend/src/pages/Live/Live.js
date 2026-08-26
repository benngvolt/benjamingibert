import './Live.scss'
import React, { useEffect } from 'react'
import { Helmet } from "react-helmet-async";

import NavBar from '../../components/NavBar/NavBar'
import LiveBox from '../../components/LiveBox/LiveBox'
import LiveDates from '../../components/LiveDates/LiveDates'
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
        <link
          rel="canonical"
          href="https://benjamingibert.com/live"
        />
      </Helmet>
      <NavBar />
      <LiveBox lang={lang} mediaOnly />
      <LiveDates lang={lang} />
    </main>
  )
}

export default Live
