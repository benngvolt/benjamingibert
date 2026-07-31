import "./NavBar.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faEarth, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import MusicNetworks from "../MusicNetworks/MusicNetworks";
import TrackNav from "../TrackNav/TrackNav";

import taihua_icon from "../../assets/taihua/taihua_icon.webp";
import gemmes_icon from "../../assets/gemmes/gemmes_icon.webp";
import night_icon from "../../assets/nightingales/night_icon.webp";
import { useApp } from "../../utils/AppContext";

function NavBar({tracks, album, language, theme, minimal}) {
  const { lang, setLang } = useApp();

  const [isLangsListOpened, setIsLangsListOpened] = useState(false);
  const [isNavbarOpened, setIsNavbarOpened] = useState(false);

  const changeLang = (nextLang) => {
    setLang(nextLang);
    setIsLangsListOpened(false);
    setIsNavbarOpened(false);

    // Scroll immédiat, sans animation
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  // ✅ Ferme la navbar dès que l'utilisateur scroll
  useEffect(() => {
    const CLOSE_AFTER_Y = 8; // petit seuil pour éviter de fermer sur micro scroll

    const onScroll = () => {
      if (window.scrollY > CLOSE_AFTER_Y) {
        // on ferme seulement si nécessaire (évite des re-renders)
        setIsNavbarOpened((open) => (open ? false : open));
        setIsLangsListOpened((open) => (open ? false : open));
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="navContainer">
      <div className={`navBar${theme ? ` navBar--${theme}` : ''}`}>
        <button
          className="navBar_burger"
          onClick={() => setIsNavbarOpened(!isNavbarOpened)}
        >
          <FontAwesomeIcon
            className="navBar_langList_icon"
            icon={isNavbarOpened ? faXmark : faBars}
          />
        </button>

        <div
          className={`navBar_nav ${
            isNavbarOpened ? "navBar_nav--open" : "navBar_nav--closed"
          }`}
        >
          <div  className="navBar_firstContainer">
            <Link
              className="navBar_link navBar_link--home"
              aria-label="Accéder à la page d'Accueil'"
              to="/"
              onClick={() => setIsNavbarOpened(false)}
            >
              <p>
                <FontAwesomeIcon icon={faHouse} />
              </p>
            </Link>
            <div className="navBar_langList">
              <FontAwesomeIcon
                className="navBar_langList_icon"
                icon={faEarth}
                onClick={() => setIsLangsListOpened(!isLangsListOpened)}
              />

              <div
                className={
                  isLangsListOpened
                    ? "navBar_langList_itemsList navBar_langList_itemsList--open"
                    : "navBar_langList_itemsList navBar_langList_itemsList--closed"
                }
              >
                <button
                  className={
                    lang !== "fr"
                      ? "navBar_langList_itemsList_fr"
                      : "navBar_langList_itemsList_fr--selected"
                  }
                  onClick={() => changeLang("fr")}
                >
                  FR
                </button>

                <button
                  className={
                    lang !== "en"
                      ? "navBar_langList_itemsList_en"
                      : "navBar_langList_itemsList_en--selected"
                  }
                  onClick={() => changeLang("en")}
                >
                  EN
                </button>

                <button
                  className={
                    lang !== "jp"
                      ? "navBar_langList_itemsList_jp"
                      : "navBar_langList_itemsList_jp--selected"
                  }
                  onClick={() => changeLang("jp")}
                >
                  JP
                </button>
              </div>
            </div>
          </div>
          <MusicNetworks
                      bandcamp="https://benjamingibert.bandcamp.com/"
                      spotify="https://open.spotify.com/intl-fr/artist/6QucofyjGzYFvdq4TVQ8kX"
                      soundcloud="https://soundcloud.com/benjamin-gibert"
                      apple="https://music.apple.com/fr/artist/benjamin-gibert/1491146372"
                      deezer="https://www.deezer.com/fr/artist/5685820"
                      instagram="https://www.instagram.com/bgibertmusic/"
                      color=""
                      direction="column"
                  />

          
          {album && tracks && language &&
            <TrackNav
              album= {album}
              tracks={tracks}
              language={language}
              theme={theme}
              minimal={minimal}
            />
          }
        </div>
        
      </div>
      
    </div>
  );
}

export default NavBar;
