import './NavBar.scss'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faEarth, faBars, faXmark} from '@fortawesome/free-solid-svg-icons'

import taihua_icon from '../../assets/taihua/taihua_icon.webp'
import gemmes_icon from '../../assets/gemmes/gemmes_icon.webp'
import night_icon from '../../assets/nightingales/night_icon.webp'
import { useApp } from "../../utils/AppContext";
 
function NavBar() {

    const { lang, setLang } = useApp();
    
    const [isLangsListOpened, setIsLangsListOpened] = useState(false)
    const [isNavbarOpened, setIsNavbarOpened] = useState(false)

    return  (      
        <div className='navBar' >
            <button
                className='navBar_burger'
                onClick={() => setIsNavbarOpened(!isNavbarOpened)}
                >
                <FontAwesomeIcon
                    className='navBar_langList_icon'
                    icon={isNavbarOpened ? faXmark : faBars}
                />
            </button>

            <div className={`navBar_nav ${isNavbarOpened ? 'navBar_nav--open' : 'navBar_nav--closed'}`}>
                <Link
                        className='navBar_link navBar_link--home'
                        aria-label="Accéder à la page d'Accueil'"
                        to="/"
                    >
                        <p><FontAwesomeIcon icon={faHouse} /></p>
                </Link>
                <div className='navBar_albums'>
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
                <div className='navBar_langList'>
                    <FontAwesomeIcon className='navBar_langList_icon' icon={faEarth}
                    onClick={() => setIsLangsListOpened(isLangsListOpened? false : true)} />
                    <div 
                        className={
                            isLangsListOpened === false
                            ? 'navBar_langList_itemsList navBar_langList_itemsList--closed'
                            : 'navBar_langList_itemsList navBar_langList_itemsList--open'
                        }
                        >
                        <button
                            className={lang !== "fr" ? 'navBar_langList_itemsList_fr' : 'navBar_langList_itemsList_fr--selected'}
                            onClick={() => {
                            setLang('fr')
                            setIsLangsListOpened(false)
                            setIsNavbarOpened(false)
                            }}
                        >
                            FR
                        </button>

                        <button
                            className={lang !== "en" ? 'navBar_langList_itemsList_en' : 'navBar_langList_itemsList_en--selected'}
                            onClick={() => {
                            setLang('en')
                            setIsLangsListOpened(false)
                            setIsNavbarOpened(false)
                            }}
                        >
                            EN
                        </button>

                        <button
                            className={lang !== "jp" ? 'navBar_langList_itemsList_jp' : 'navBar_langList_itemsList_jp--selected'}
                            onClick={() => {
                            setLang('jp')
                            setIsLangsListOpened(false)
                            setIsNavbarOpened(false)
                            }}
                        >
                            JP
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default NavBar