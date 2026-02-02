import "./NavBar.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faEarth, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import taihua_icon from "../../assets/taihua/taihua_icon.webp";
import gemmes_icon from "../../assets/gemmes/gemmes_icon.webp";
import night_icon from "../../assets/nightingales/night_icon.webp";
import { useApp } from "../../utils/AppContext";

function NavBar() {
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
    <div className="navBar">
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

        <div className="navBar_albums">
          <Link
            className="navBar_link navBar_link--night"
            aria-label="Accéder à la page de Nightingales'"
            to="/nightingales"
            onClick={() => setIsNavbarOpened(false)}
          >
            <img src={night_icon} alt="" />
          </Link>

          <Link
            className="navBar_link navBar_link--taihua"
            aria-label="Accéder à la page de Taihua'"
            to="/taihua"
            onClick={() => setIsNavbarOpened(false)}
          >
            <img src={taihua_icon} alt="" />
          </Link>

          <Link
            className="navBar_link navBar_link--gemmes"
            aria-label="Accéder à la page de Gemmes'"
            to="/gemmes"
            onClick={() => setIsNavbarOpened(false)}
          >
            <img src={gemmes_icon} alt="" />
          </Link>
        </div>

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
    </div>
  );
}

export default NavBar;
