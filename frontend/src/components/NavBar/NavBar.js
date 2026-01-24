import './NavBar.scss'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse} from '@fortawesome/free-solid-svg-icons'

import taihua_icon from '../../assets/taihua/taihua_icon.webp'
import gemmes_icon from '../../assets/gemmes/gemmes_icon.webp'
import night_icon from '../../assets/nightingales/night_icon.webp'

 
function NavBar({imageUrl, setHandleDisplayImage}) {

    return  (      
        <div className='navBar' >
            <Link
                    className='navBar_link navBar_link--home'
                    aria-label="Accéder à la page d'Accueil'"
                    to="/"
                >
                    <p><FontAwesomeIcon icon={faHouse} /></p>
            </Link>
            <Link
                    className='navBar_link navBar_link--night'
                    aria-label="Accéder à la page de Nightingales'"
                    to="/nightingales"
                >
                    <img src={night_icon}/>
            </Link>
            <Link
                    className='navBar_link navBar_link--taihua'
                    aria-label="Accéder à la page de Taihua'"
                    to="/taihua"
                >
                    <img src={taihua_icon}/>
            </Link>
            <Link
                    className='navBar_link navBar_link--gemmes'
                    aria-label="Accéder à la page de Gemmes'"
                    to="/gemmes"
                >
                    <img src={gemmes_icon}/>
            </Link>
           
        </div>
    )
}

export default NavBar