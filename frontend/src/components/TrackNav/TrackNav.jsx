import "./TrackNav.scss";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function TrackNav({ tracks, album, language, theme, minimal }) {
const careerLabel = language === "jp" ? "経歴" : language === "en" ? "career" : "parcours";

return (
    <div className={`trackNav${theme ? ` trackNav--${theme}` : ''}`}>
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
            {!minimal && (
                <>
                    <a className="trackNav_nav_link" href={`#${album}_album`} data-text={language==="jp"?"アルバム":"album"}>{language==="jp"?"アルバム":"album"}</a>
                    <a className="trackNav_nav_link" href="#bio" data-text={language==="jp"?"バイオ":"bio"}>{language==="jp"?"バイオ":"bio"}</a>
                    <a className="trackNav_nav_link" href="#live" data-text={language==="jp"?"ライブ":"live"}>{language==="jp"?"ライブ":"live"}</a>
                    <a className="trackNav_nav_link" href="#career" data-text={careerLabel}>{careerLabel}</a>
                </>
            )}
        </div>
        <ul className="trackNav_trackList">
            {tracks.map((track, index) => {
                const trackId = typeof track === 'string' ? track : track.id;
                const trackLabel = typeof track === 'string' ? track : track.label;
                return (
                    <li className='trackNav_trackList_item' key={index}>
                        <a
                            className="trackNav_trackList_item_link"
                            href={`#${trackId}`}
                        >
                            <span className="trackNav_trackList_item_link_index">{String(1 + index).padStart(2, '0')}</span>
                            <span className="trackNav_trackList_item_link_title" data-text={trackLabel}>{trackLabel}</span>
                        </a>
                    </li>
                );
            })}
        </ul>
    </div>
  );
}

export default TrackNav;