import "./LiveBox.scss";
import React from "react";
import { Reveal } from "../Reveal/Reveal";
import aboutLive from '../../assets/aboutLive/aboutLive.json'


function LiveBox({ lang }) {
  const currentLive = aboutLive[lang] || aboutLive.fr;

  return (
    <section className="live" id="live">
      <div className="live_paragraph">
        <Reveal>
          <p className="live_paragraph_title">
            {currentLive.title}
          </p>
        </Reveal>

        <Reveal>
          <p
            className="live_paragraph_texts"
            dangerouslySetInnerHTML={{ __html: currentLive.text }}
          />
        </Reveal>
      </div>
    </section>
  );
}

export default LiveBox;