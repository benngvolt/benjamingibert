import "./BioBox.scss";
import React from "react";
import { Reveal } from "../Reveal/Reveal";
import aboutBio from '../../assets/aboutBio/aboutBio.json'


function BioBox({ lang }) {
  const currentBio = aboutBio[lang] || aboutBio.fr;

  return (
    <section className="bio" id="bio">
      <div className="bio_paragraph">
        <Reveal>
          <p className="bio_paragraph_title">
            {currentBio.title}
          </p>
        </Reveal>

        <Reveal>
          <p
            className="bio_paragraph_texts"
            dangerouslySetInnerHTML={{ __html: currentBio.text }}
          />
        </Reveal>
      </div>
    </section>
  );
}

export default BioBox;