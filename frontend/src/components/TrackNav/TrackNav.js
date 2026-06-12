import "./TrackNav.scss";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function TrackNav({ tracks, album, language }) {


return (
    <div className="trackNav">
        <div className="trackNav_nav">
            <FontAwesomeIcon
                className="trackNav_nav_arrow"
                onClick={() =>
                    window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                    })
                }
                icon={faArrowUp}
            />
            <a className="trackNav_nav_link" href={`#${album}_album`}>{language==="jp"?"アルバム":"album"}</a>
            <a className="trackNav_nav_link" href="#bio">{language==="jp"?"バイオ":"bio"}</a>
            <a className="trackNav_nav_link" href="#live">{language==="jp"?"ライブ":"live"}</a>
            <a className="trackNav_nav_link" href="#career">{language === "jp"
                ? "経歴"
                : language === "en"
                ? "career"
                : "parcours"}
            </a>
        </div>
        <ul className="trackNav_trackList">
            {tracks.map((track, index) => (
                <li className='trackNav_trackList_item' key={index}>
                    <a
                        className="trackNav_trackList_item_link"
                        href={`#${track}`}
                    >
                        {`0${1+index} ${track}`}
                    </a>
                </li>
            ))}
        </ul>
    </div>
  );
}

export default TrackNav;