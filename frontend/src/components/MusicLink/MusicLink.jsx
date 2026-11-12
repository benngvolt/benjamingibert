import "./MusicLink.scss";
import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

function MusicLink({ link, name, icon }) {
  

  return (
    <div className="musicLink">
        <a href={link} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={icon}/>{name}</a>
    </div>
  );
}

export default MusicLink;
