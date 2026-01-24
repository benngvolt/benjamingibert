// GemmesTrackBox.jsx
import "./GemmesTrackBox.scss";
import React, { useEffect, useRef } from "react";

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function GemmesTrackBox({ videoSrc, trackText, imgSrc, trackTitle, imgTitle, trackNumber }) {
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
    <section
      ref={containerRef}
      className={`gemmes_tracks gemmes_tracks--${trackNumber}`}
    >
      <div className="gemmes_tracks_track">
        <img className="gemmes_tracks_track_imgTitle" src={imgTitle} alt="" />
        <p className="gemmes_tracks_track_title">{trackTitle}</p>
        <p className="gemmes_tracks_track_text">{trackText}</p>
      </div>

      {videoSrc && (
        <video src={videoSrc} autoPlay muted loop playsInline />
      )}

      {imgSrc && (
        <img
          ref={imgRef}
          className="gemmes_tracks_imgBackground"
          src={imgSrc}
          alt=""
        />
      )}
    </section>
  );
}

export default GemmesTrackBox;
