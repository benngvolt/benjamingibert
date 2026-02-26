import './About.scss'
import { Link } from 'react-router-dom'
import React, { useRef, useState, useEffect } from 'react'

import NavBar from '../../components/NavBar/NavBar'


import { faPlay } from '@fortawesome/free-solid-svg-icons'

import { useApp } from "../../utils/AppContext";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

 


  return (
    <main className='about'>
      
      
    </main>
  )
}

export default About