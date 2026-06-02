import "./NightingalesDatas.scss";
import React from "react";
import { Reveal } from "../Reveal/Reveal";

function NightingalesDatas({ lang }) {
  return (
    <div className="nightingales_mainDataContainer_firstContainer">
      {lang === "en" && (
        <div className="nightingales_mainDataContainer_datas">
          <Reveal>
            <p>released August 22, 2025.</p>
          </Reveal>

          <Reveal>
            <ul>
              <li>01 glassbirds II</li>
              <li>02 noctambulism</li>
              <li>03 aspérité liquide</li>
              <li>04 taste of sap</li>
            </ul>
          </Reveal>

          <Reveal>
            <p>
              Tracks 1, 2, 3, 4 composed, played and produced by Benjamin Gibert,
              recorded in Toulouse, 2025. Samples of nature sounds by Benjamin
              Gibert.
              <br />
              <br />
              Mixed and mastered by Guillaume Saint-Etienne & Benjamin Gibert at
              Music Action, Toulouse. music-action.com Photography by Florian
              Langellier www.florianlangellier.com Artwork by Florian Langellier &
              Benjamin Gibert.
            </p>
          </Reveal>
        </div>
      )}

      {lang === "fr" && (
        <div className="nightingales_mainDataContainer_datas">
          <Reveal>
            <p>sorti le 22 août 2025.</p>
          </Reveal>

          <Reveal>
            <ul>
              <li>01 glassbirds II</li>
              <li>02 noctambulism</li>
              <li>03 aspérité liquide</li>
              <li>04 taste of sap</li>
            </ul>
          </Reveal>

          <Reveal>
            <p>
              Titres 1, 2, 3, 4 composés, interprétés et produits par Benjamin
              Gibert, enregistrés à Toulouse en 2025. Échantillons de sons
              naturels par Benjamin Gibert.
              <br />
              <br />
              Mixé et masterisé par Guillaume Saint-Etienne & Benjamin Gibert à
              Music Action, Toulouse. music-action.com Photographies par Florian
              Langellier www.florianlangellier.com Artwork par Florian Langellier
              & Benjamin Gibert.
            </p>
          </Reveal>
        </div>
      )}

      {lang === "jp" && (
        <div className="nightingales_mainDataContainer_datas">
          <Reveal>
            <p>2025年8月22日リリース。</p>
          </Reveal>

          <Reveal>
            <ul>
              <li>01 glassbirds II</li>
              <li>02 noctambulism</li>
              <li>03 aspérité liquide</li>
              <li>04 taste of sap</li>
            </ul>
          </Reveal>

          <Reveal>
            <p>
              トラック1〜4はすべて Benjamin Gibert によって作曲・演奏・
              プロデュースされ、2025年にトゥールーズで録音された。
              自然音のサンプルも Benjamin Gibert によるもの。
              <br />
              <br />
              ミックスおよびマスタリングは Guillaume Saint-Etienne &
              Benjamin Gibert により、トゥールーズの Music Action にて
              行われた。music-action.com 写真：Florian Langellier
              www.florianlangellier.com アートワーク：Florian Langellier
              & Benjamin Gibert。
            </p>
          </Reveal>
        </div>
      )}
    </div>
  );
}

export default NightingalesDatas;
