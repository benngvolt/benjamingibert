// import "./LiveBox.scss";
// import React from "react";
// import { Reveal } from "../Reveal/Reveal";
// import aboutLive from '../../assets/aboutLive/aboutLive.json'
// import MusicLink from "../MusicLink/MusicLink";
// import { faPlay } from '@fortawesome/free-solid-svg-icons'
// import live1 from '../../assets/live1.webp'
// import live2 from '../../assets/live2.webp'
// import live3 from '../../assets/live3.webp'
// import live4 from '../../assets/live4.webp'
// import live5 from '../../assets/live5.webp'
// import live6 from '../../assets/live6.webp'
// import live7 from '../../assets/live7.webp'
// import live8 from '../../assets/live8.webp'
// import videoLive from '../../assets/videoLive.mp4'

// function LiveBox({ lang }) {
//   const currentLive = aboutLive[lang] || aboutLive.fr;

//   return (
//     <section className="live" id="live">
//       <div className="live_paragraph">
        
//           <h3 className="live_paragraph_title">
//             {currentLive.title}
//           </h3>
        

//         <Reveal>
//           <p
//             className="live_paragraph_texts"
//             dangerouslySetInnerHTML={{ __html: currentLive.text }}
//           />
//         </Reveal>
//         <MusicLink
//           link='https://soundcloud.com/benjamin-gibert/live-session-at-residence-alto-cordes-sur-ciel-240822?si=ef97ee5c43914dc499c8944d6e0ef2ac&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
//           icon={faPlay}
//           name={
//             lang === 'fr'
//               ? "Session live - 21.08.2022"
//               : lang === 'en'
//               ? 'Live session - 21.08.22'
//               : 'ライブ・セッション — 2022.08.21'
//           }
//         />
        
//       </div>
//       <div className="live_liveMediaContainer">
//           <div className="live_liveMediaContainer_photosGrid" aria-label="Galerie de photos live session">
//             <img
//               src={live1}
//               alt="Live session performance photo 1"
//               aria-label="Live session performance photo 1"
//             />

//             <img
//               src={live2}
//               alt="Live session performance photo 2"
//               aria-label="Live session performance photo 2"
//             />

//             <img
//               src={live3}
//               alt="Live session performance photo 3"
//               aria-label="Live session performance photo 3"
//             />

//             <img
//               src={live4}
//               alt="Live session performance photo 4"
//               aria-label="Live session performance photo 4"
//             />
//           </div>

//           <video
//             className="live_liveMediaContainer_video"
//             src={videoLive}
//             autoPlay
//             loop
//             muted
//             playsInline
//             controls
//             aria-label="Live session video"
//           >
//             Votre navigateur ne supporte pas la lecture vidéo.
//           </video>

//           <div className="live_liveMediaContainer_photosGrid" aria-label="Galerie de photos live session deuxième partie">
//             <img
//               src={live5}
//               alt="Live session performance photo 5"
//               aria-label="Live session performance photo 5"
//             />

//             <img
//               src={live6}
//               alt="Live session performance photo 6"
//               aria-label="Live session performance photo 6"
//             />

//             <img
//               src={live7}
//               alt="Live session performance photo 7"
//               aria-label="Live session performance photo 7"
//             />

//             <img
//               src={live8}
//               alt="Live session performance photo 8"
//               aria-label="Live session performance photo 8"
//             />
//           </div>
//         </div>
//     </section>
//   );
// }

// export default LiveBox;


import "./LiveBox.scss";
import React from "react";
import { Reveal } from "../Reveal/Reveal";
import aboutLive from "../../assets/aboutLive/aboutLive.json";
import MusicLink from "../MusicLink/MusicLink";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import live1 from "../../assets/live1.webp";
import live2 from "../../assets/live2.webp";
import live3 from "../../assets/live3.webp";
import live4 from "../../assets/live4.webp";
import live5 from "../../assets/live5.webp";
import live6 from "../../assets/live6.webp";
import live7 from "../../assets/live7.webp";
import live8 from "../../assets/live8.webp";
import videoLive from "../../assets/videoLive.mp4";

function LiveBox({ lang }) {
  const currentLive = aboutLive[lang] || aboutLive.fr;

  const careerHighlights = {
    fr: (
      <>
        <strong>2012–2025</strong>
        <br />
        Composition musicale dramatique et chorégraphique.
        <br />
        <br />

        <strong>2015–</strong>
        <br />
        Musicien live sur la tournée d’Arandel (inFiné), “Solarispellis”.
        <br />
        <br />

        <strong>2017–</strong>
        <br />
        Février — Direction du workshop Musique brûlante avec l’Institut Français
        à Beyrouth.
        <br />
        Musicien live sur la tournée de Sacha Bernardson, “Rockall”.
        <br />
        <br />

        <strong>2018–</strong>
        <br />
        Novembre — Résidence à l’Abbaye Royale de Fontevraud pour Gemmes,
        installation interactive.
        <br />
        Décembre — Tournée au Japon avec Sacha Bernardson.
        <br />
        <br />

        <strong>2019–</strong>
        <br />
        Février — Sortie de Gemme, EP.
        <br />
        Mars–mai — Résidence Earthskin Muriwai, Nouvelle-Zélande, pour la
        création de Taihua.
        <br />
        Novembre — Sortie de Taihua, album.
        <br />
        <br />

        <strong>2020–2022</strong>
        <br />
        Série de livestreams pour Taihua pendant la pandémie, puis série de
        concerts autour du live de Taihua, notamment au Petit Bain, Paris.
        <br />
        <br />

        <strong>2022–</strong>
        <br />
        Mars–avril — Résidence La Wayaka Current, San Pedro de Atacama, Chili,
        pour la création de Salar.
        <br />
        <br />

        <strong>2024–</strong>
        <br />
        Juin — Création de Time, musique chorégraphique pour la pièce Time de
        Michele Murray, compagnie Play.
        <br />
        Novembre–décembre — Deuxième partie de création de Salar au Chili.
        <br />
        <br />

        <strong>2025–</strong>
        <br />
        Janvier–juin — Création de Nightingales.
        <br />
        Août — Sortie de Nightingales.
      </>
    ),

    en: (
      <>
        <strong>2012–2025</strong>
        <br />
        Music composition for theatre and choreography.
        <br />
        <br />

        <strong>2015–</strong>
        <br />
        Live musician on Arandel’s tour “Solarispellis”, released on inFiné.
        <br />
        <br />

        <strong>2017–</strong>
        <br />
        February — Led the Musique brûlante workshop with the Institut Français
        in Beirut.
        <br />
        Live musician on Sacha Bernardson’s “Rockall” tour.
        <br />
        <br />

        <strong>2018–</strong>
        <br />
        November — Residency at the Abbaye Royale de Fontevraud for Gemmes, an
        interactive installation.
        <br />
        December — Tour in Japan with Sacha Bernardson.
        <br />
        <br />

        <strong>2019–</strong>
        <br />
        February — Release of Gemme, EP.
        <br />
        March–May — Earthskin Muriwai residency, New Zealand, for the creation
        of Taihua.
        <br />
        November — Release of Taihua, album.
        <br />
        <br />

        <strong>2020–2022</strong>
        <br />
        Livestream series for Taihua during the pandemic, followed by a series
        of concerts based on the Taihua live set, including Le Petit Bain, Paris.
        <br />
        <br />

        <strong>2022–</strong>
        <br />
        March–April — La Wayaka Current residency, San Pedro de Atacama, Chile,
        for the creation of Salar.
        <br />
        <br />

        <strong>2024–</strong>
        <br />
        June — Creation of Time, choreographic music for Michele Murray’s piece
        Time, Compagnie Play.
        <br />
        November–December — Second creative residency period for Salar in Chile.
        <br />
        <br />

        <strong>2025–</strong>
        <br />
        January–June — Creation of Nightingales.
        <br />
        August — Release of Nightingales.
      </>
    ),

    jp: (
      <>
        <strong>2012–2025</strong>
        <br />
        演劇および振付作品のための音楽制作。
        <br />
        <br />

        <strong>2015–</strong>
        <br />
        Arandel（inFiné）のツアー「Solarispellis」にライブ・ミュージシャンとして参加。
        <br />
        <br />

        <strong>2017–</strong>
        <br />
        2月 — ベイルートのフランス文化会館とともにワークショップ
        「Musique brûlante」を主導。
        <br />
        Sacha Bernardson のツアー「Rockall」にライブ・ミュージシャンとして参加。
        <br />
        <br />

        <strong>2018–</strong>
        <br />
        11月 — インタラクティブ・インスタレーション Gemmes のため、
        フォントヴロー王立修道院にてレジデンス。
        <br />
        12月 — Sacha Bernardson と日本ツアー。
        <br />
        <br />

        <strong>2019–</strong>
        <br />
        2月 — EP Gemme リリース。
        <br />
        3月–5月 — Taihua 制作のため、ニュージーランド・Muriwai の
        Earthskin にてレジデンス。
        <br />
        11月 — アルバム Taihua リリース。
        <br />
        <br />

        <strong>2020–2022</strong>
        <br />
        パンデミック期間中に Taihua のライブストリーム・シリーズを実施。
        その後、パリの Le Petit Bain を含む Taihua ライブ公演シリーズを展開。
        <br />
        <br />

        <strong>2022–</strong>
        <br />
        3月–4月 — Salar 制作のため、チリ・サンペドロ・デ・アタカマの
        La Wayaka Current にてレジデンス。
        <br />
        <br />

        <strong>2024–</strong>
        <br />
        6月 — Michele Murray／Compagnie Play の作品 Time のための振付音楽
        Time を制作。
        <br />
        11月–12月 — チリにて Salar の第2期制作。
        <br />
        <br />

        <strong>2025–</strong>
        <br />
        1月–6月 — Nightingales 制作。
        <br />
        8月 — Nightingales リリース。
      </>
    ),
  };

  return (
    <section className="live" id="live">
      <div className="live_paragraph">
        <h3 className="live_paragraph_title">{currentLive.title}</h3>

        <Reveal>
          <p
            className="live_paragraph_texts"
            dangerouslySetInnerHTML={{ __html: currentLive.text }}
          />
        </Reveal>

        <MusicLink
          link="https://soundcloud.com/benjamin-gibert/live-session-at-residence-alto-cordes-sur-ciel-240822?si=ef97ee5c43914dc499c8944d6e0ef2ac&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
          icon={faPlay}
          name={
            lang === "fr"
              ? "Session live - 21.08.2022"
              : lang === "en"
              ? "Live session - 21.08.22"
              : "ライブ・セッション — 2022.08.21"
          }
        />
      </div>

      <div className="live_liveMediaContainer">
        <div
          className="live_liveMediaContainer_photosGrid"
          aria-label={
            lang === "fr"
              ? "Première galerie de photos de session live"
              : lang === "en"
              ? "First live session photo gallery"
              : "ライブセッション写真ギャラリー前半"
          }
        >
          <img src={live1} alt="Live session performance photo 1" />
          <img src={live2} alt="Live session performance photo 2" />
          <img src={live3} alt="Live session performance photo 3" />
          <img src={live4} alt="Live session performance photo 4" />
        </div>

        <video
          className="live_liveMediaContainer_video"
          src={videoLive}
          autoPlay
          loop
          muted
          playsInline
          controls
          aria-label={
            lang === "fr"
              ? "Vidéo de session live"
              : lang === "en"
              ? "Live session video"
              : "ライブセッション映像"
          }
        >
          {lang === "fr"
            ? "Votre navigateur ne supporte pas la lecture vidéo."
            : lang === "en"
            ? "Your browser does not support video playback."
            : "お使いのブラウザは動画再生に対応していません。"}
        </video>

        <div
          className="live_liveMediaContainer_photosGrid"
          aria-label={
            lang === "fr"
              ? "Deuxième galerie de photos de session live"
              : lang === "en"
              ? "Second live session photo gallery"
              : "ライブセッション写真ギャラリー後半"
          }
        >
          <img src={live5} alt="Live session performance photo 5" />
          <img src={live6} alt="Live session performance photo 6" />
          <img src={live7} alt="Live session performance photo 7" />
          <img src={live8} alt="Live session performance photo 8" />
        </div>
      </div>

      <div className="live_paragraph live_paragraph_end" id="career">
        <h3 className="live_paragraph_title">
          {lang === "fr"
            ? "parcours"
            : lang === "en"
            ? "career"
            : "経歴"}
        </h3>

        <Reveal>
          <p className="live_paragraph_texts">
            {careerHighlights[lang]}
          </p>
        </Reveal>
        <MusicLink
          link="https://www.indiemusic.fr/benjamin-gibert-taihua/"
          icon={faPlay}
          name={
            lang === "fr"
              ? "Article Indiemusic - Taihua"
              : lang === "en"
              ? "Indiemusic Article - Taihua"
              : "Indiemusic 記事 - Taihua"
          }
        />
      </div>
      
    </section>
  );
}

export default LiveBox;

