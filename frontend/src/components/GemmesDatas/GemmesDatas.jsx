import "./GemmesDatas.scss";
import React from "react";
import { Reveal } from "../Reveal/Reveal";

function GemmesDatas({ lang }) {
  return (
    <div className="taihua_mainDataContainer_firstContainer">
      {lang === "en" && (
        <div className="gemmes_mainDataContainer_datas">
          <Reveal>
            <p>released February 25, 2019.</p>
          </Reveal>

          <Reveal>
            <ul>
              <li>01 gemme I</li>
              <li>02 gemme II</li>
              <li>03 gemme III</li>
              <li>04 gemme IV</li>
              <li>05 gemme V</li>
            </ul>
          </Reveal>

          <Reveal>
            <p>
              Tracks 1, 2, 3, 4, 5 composed, played and produced by Benjamin Gibert,
              recorded in L'Abbaye Royale de Fontevraud, 2018.
              Samples of nature sounds by Benjamin Gibert.
              <br />
              <br />
              Mixed and mastered by Benjamin Gibert, Lyon.
              Artwork by Benjamin Gibert.
            </p>
          </Reveal>
        </div>
      )}

      {lang === "fr" && (
        <div className="gemmes_mainDataContainer_datas">
          <Reveal>
            <p>sorti le 25 février 2019.</p>
          </Reveal>

          <Reveal>
            <ul>
              <li>01 gemme I</li>
              <li>02 gemme II</li>
              <li>03 gemme III</li>
              <li>04 gemme IV</li>
              <li>05 gemme V</li>
            </ul>
          </Reveal>

          <Reveal>
            <p>
              Titres 1, 2, 3, 4 et 5 composés, interprétés et produits par
              Benjamin Gibert, enregistrés à l’Abbaye Royale de Fontevraud, 2018.
              Échantillons de sons naturels enregistrés par Benjamin Gibert.
              <br />
              <br />
              Mixé et masterisé par Benjamin Gibert, Lyon.
              Artwork par Benjamin Gibert.
            </p>
          </Reveal>
        </div>
      )}

      {lang === "jp" && (
        <div className="gemmes_mainDataContainer_datas">
          <Reveal>
            <p>2019年2月25日リリース。</p>
          </Reveal>

          <Reveal>
            <ul>
              <li>01 gemme I</li>
              <li>02 gemme II</li>
              <li>03 gemme III</li>
              <li>04 gemme IV</li>
              <li>05 gemme V</li>
            </ul>
          </Reveal>

          <Reveal>
            <p>
              トラック1〜5はBenjamin Gibertによる作曲・演奏・プロデュース。
              2018年、フランス・フォントヴロー王立修道院にて録音。
              自然音のサンプルはすべてBenjamin Gibertによる録音。
              <br />
              <br />
              ミックスおよびマスタリング：Benjamin Gibert（リヨン）。
              アートワーク：Benjamin Gibert。
            </p>
          </Reveal>
        </div>
      )}
    </div>
  );
}

export default GemmesDatas;
