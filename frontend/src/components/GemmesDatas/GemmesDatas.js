import "./GemmesDatas.scss";
import React, { useEffect, useRef } from "react";


function GemmesDatas({ lang }) {
 

  return (
    <div className='taihua_mainDataContainer_firstContainer'>
        {lang === "en" &&
          <div className='gemmes_mainDataContainer_datas'>
            <p>
              released February 25, 2019.
            </p>
            <ul>
              <li>01 gemme I</li>
              <li>02 gemme II</li>
              <li>03 gemme III</li>
              <li>04 gemme IV</li>
              <li>05 gemme V</li>
            </ul>
            <p>
              Tracks 1, 2, 3, 4, 5 composed, played and produced by Benjamin Gibert,
              recorded in L'Abbaye Royale de Fontevraud, 2018.
              Samples of nature sounds by Benjamin Gibert.
              <br /><br />
              Mixed and mastered by Benjamin Gibert, Lyon.
              Artwork by Benjamin Gibert.
            </p>
          </div>
        }


        {lang === "fr" &&
          <div className='gemmes_mainDataContainer_datas'>
            <p>
              sorti le 25 février 2019.
            </p>
            <ul>
              <li>01 gemme I</li>
              <li>02 gemme II</li>
              <li>03 gemme III</li>
              <li>04 gemme IV</li>
              <li>05 gemme V</li>
            </ul>
            <p>
              Titres 1, 2, 3, 4 et 5 composés, interprétés et produits par
              Benjamin Gibert, enregistrés à l’Abbaye Royale de Fontevraud, 2018.
              Échantillons de sons naturels enregistrés par Benjamin Gibert.
              <br /><br />
              Mixé et masterisé par Benjamin Gibert, Lyon.
              Artwork par Benjamin Gibert.
            </p>
          </div>
        }


        {lang === "jp" &&
          <div className='gemmes_mainDataContainer_datas'>
            <p>
              2019年2月25日リリース。
            </p>
            <ul>
              <li>01 gemme I</li>
              <li>02 gemme II</li>
              <li>03 gemme III</li>
              <li>04 gemme IV</li>
              <li>05 gemme V</li>
            </ul>
            <p>
              トラック1〜5はBenjamin Gibertによる作曲・演奏・プロデュース。
              2018年、フランス・フォントヴロー王立修道院にて録音。
              自然音のサンプルはすべてBenjamin Gibertによる録音。
              <br /><br />
              ミックスおよびマスタリング：Benjamin Gibert（リヨン）。
              アートワーク：Benjamin Gibert。
            </p>
          </div>
        }


        </div>
  );
}

export default GemmesDatas;