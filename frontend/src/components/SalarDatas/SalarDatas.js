import "./SalarDatas.scss";
import React from "react";
import { Reveal } from "../Reveal/Reveal";

function SalarDatas({ lang }) {
  const credits = {
    en: (
      <>
        Tracks 1, 2, 5, 7, 8, 9, 10, 11 composed, performed and produced by
        Benjamin Gibert.
        <br />
        Track 3 composed and performed by Benjamin Gibert, produced by{" "}
        <a
          href="https://music-action.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Guillaume Saint-Etienne's website"
        >
          Guillaume Saint-Etienne
        </a>{" "}
        and Benjamin Gibert.
        <br />
        Track 4 composed and performed by Benjamin Gibert, produced by{" "}
        <a
          href="https://svqo.bandcamp.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Pablo Sotomayor's Bandcamp page"
        >
          Pablo Sotomayor
        </a>{" "}
        (SVQO) and Benjamin Gibert.
        <br />
        Track 6 composed and performed by Benjamin Gibert, produced by{" "}
        <a
          href="https://sachabernardson.bandcamp.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Sacha Bernardson's Bandcamp page"
        >
          Sacha Bernardson
        </a>{" "}
        and Benjamin Gibert.
        <br />
        <br />
        <strong>
        Production in progress...
        </strong>
      </>
    ),

    fr: (
      <>
        Titres 1, 2, 5, 7, 8, 9, 10, 11 composés, interprétés et produits par
        Benjamin Gibert.
        <br />
        Titre 3 composé et interprété par Benjamin Gibert, produit par{" "}
        <a
          href="https://music-action.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visiter le site de Guillaume Saint-Etienne"
        >
          Guillaume Saint-Etienne
        </a>{" "}
        et Benjamin Gibert.
        <br />
        Titre 4 composé et interprété par Benjamin Gibert, produit par{" "}
        <a
          href="https://svqo.bandcamp.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visiter la page Bandcamp de Pablo Sotomayor"
        >
          Pablo Sotomayor
        </a>{" "}
        (SVQO) et Benjamin Gibert.
        <br />
        Titre 6 composé et interprété par Benjamin Gibert, produit par{" "}
        <a
          href="https://sachabernardson.bandcamp.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visiter la page Bandcamp de Sacha Bernardson"
        >
          Sacha Bernardson
        </a>{" "}
        et Benjamin Gibert.
        <br />
        <br />
        <strong>
        Production en cours...
        </strong>
      </>
    ),

    jp: (
      <>
        1、2、5、7、8、9、10、11曲目：Benjamin Gibert による作曲、演奏、プロデュース。
        <br />
        3曲目：Benjamin Gibert による作曲・演奏、{" "}
        <a
          href="https://music-action.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Guillaume Saint-Etienne のウェブサイトを開く"
        >
          Guillaume Saint-Etienne
        </a>{" "}
        と Benjamin Gibert によるプロデュース。
        <br />
        4曲目：Benjamin Gibert による作曲・演奏、{" "}
        <a
          href="https://svqo.bandcamp.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pablo Sotomayor の Bandcamp ページを開く"
        >
          Pablo Sotomayor
        </a>{" "}
        （SVQO）と Benjamin Gibert によるプロデュース。
        <br />
        6曲目：Benjamin Gibert による作曲・演奏、{" "}
        <a
          href="https://sachabernardson.bandcamp.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Sacha Bernardson の Bandcamp ページを開く"
        >
          Sacha Bernardson
        </a>{" "}
        と Benjamin Gibert によるプロデュース。
        <br />
        <br />
        <strong>
        制作進行中...
        </strong>
      </>
    ),
  };

  const demoLabel = {
    en: "demo in progress",
    fr: "démo en cours",
    jp: "デモ制作中",
  };

  return (
    <div className="salar_mainDataContainer_firstContainer">
      <div
        className="salar_mainDataContainer_datas"
        aria-label="Salar tracklist and credits"
      >
        <Reveal>
          <ul aria-label="Salar tracklist">
            <li>01 amanecer</li>
            <li>02 saltscar</li>
            <li>03 texture of shards</li>
            <li>04 revolcadero</li>
            <li>05 chañar</li>
            <li>06 alti plano</li>
            <li>07 stellar</li>
            <li>08 color bug ({demoLabel[lang]})</li>
            <li>09 polychromantic ({demoLabel[lang]})</li>
            <li>10 cachiyuyo ({demoLabel[lang]})</li>
            <li>11 tamarrugo ({demoLabel[lang]})</li>
          </ul>

          <p className="salar_mainDataContainer_credits">{credits[lang]}</p>
        </Reveal>
      </div>
    </div>
  );
}

export default SalarDatas;