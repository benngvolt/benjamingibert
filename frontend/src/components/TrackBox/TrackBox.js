
import "./TrackBox.scss";
import React, { useEffect, useRef } from "react";
import { useApp } from "../../utils/AppContext";

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function TrackBox({ trackText, imgSrc, trackTitle, imgTitle, trackNumber, color }) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgSrc) return;

    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    let maxShift = 0;

    const computeMaxShift = () => {
      const c = container.getBoundingClientRect();
      const i = img.getBoundingClientRect();
      maxShift = Math.max(0, (i.height - c.height) / 2);
    };

    const update = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;

      const progress = clamp((vh - rect.top) / (vh + rect.height), 0, 1);
      const y = (progress * 2 - 1) * -maxShift;

      img.style.transform = `translateY(${y}px)`;
    };

    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        update();
        raf = null;
      });
    };

    const onResize = () => {
      computeMaxShift();
      update();
    };

    const onLoad = () => {
      computeMaxShift();
      update();
    };

    img.addEventListener("load", onLoad);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    if (img.complete) onLoad();

    return () => {
      img.removeEventListener("load", onLoad);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [imgSrc]);

  return (
    <section className={`taihua_tracks taihua_tracks${trackNumber}`}>
        {/* <img className='taihua_tracks--s_backgroundPhoto' src={taihua_shellsPhoto}/> */}
        <div className='taihua_tracks_track'>
            <img className={`taihua_tracks_track_imgTitle taihua_tracks_track_imgTitle--${color}`} src={imgTitle}/>
            <div className='taihua_tracks_track_texts'>
                <p className={`taihua_tracks_track_texts_title taihua_tracks_track_texts_title--${color}`}>{trackTitle}</p> 
                <p className='taihua_tracks_track_texts_text' dangerouslySetInnerHTML={{ __html:trackText}} />
            </div>
        </div>   
    </section>
  );
}

export default TrackBox;
