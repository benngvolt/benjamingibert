import "./TaihuaDatas.scss";
import React from "react";
import { Reveal } from "../Reveal/Reveal";

function TaihuaDatas({ lang }) {
  return (
    <div className="taihua_mainDataContainer_firstContainer">
      {lang === "en" && (
        <div className="taihua_mainDataContainer_datas">
          <Reveal>
            <p>released November 04, 2019.</p>
          </Reveal>

          <Reveal>
            <ul>
              <li>01 barefoot</li>
              <li>02 low tide cavern I</li>
              <li>03 native forests</li>
              <li>04 tūīs garden</li>
              <li>05 glassbirds (feat.SVQO)</li>
              <li>06 low tide cavern II</li>
              <li>07 shells</li>
              <li>08 low tide cavern III</li>
              <li>09 franz josef glacier</li>
              <li>10 gemme IV + tūīs garden (hurricane version)</li>
            </ul>
          </Reveal>

          <Reveal>
            <p>
              Tracks 1, 2, 3, 4, 6, 7, 8, 9 composed, played and produced by
              Benjamin Gibert, recorded in Muriwai (new zealand), 2019. Samples
              of nature sounds by Benjamin Gibert. <br />
              <br />
              Track 5 composed by Benjamin Gibert & SVQO, produced by SVQO,
              recorded in Lyon (France) and Porto Alegre (Brasil), 2013-2021.
              <br />
              Track 10 composed and produced by Benjamin Gibert, recorded in
              Muriwai (New Zealand) and l'Abbaye Royale de Fontevraud & the
              forest of Meygal (France), 2021.
              <br />
              <br />
              Artwork by Thomas Vaillant & Benjamin Gibert
              <br />
              Recorded, mixed and mastered by Benjamin Gibert at Earthskin
              Muriwai Residency, New Zealand
              <br />
            </p>
          </Reveal>
        </div>
      )}

      {lang === "fr" && (
        <div className="taihua_mainDataContainer_datas">
          <Reveal>
            <p>sorti le 04 novembre 2019.</p>
          </Reveal>

          <Reveal>
            <ul>
              <li>01 barefoot</li>
              <li>02 low tide cavern I</li>
              <li>03 native forests</li>
              <li>04 tūīs garden</li>
              <li>05 glassbirds (feat.SVQO)</li>
              <li>06 low tide cavern II</li>
              <li>07 shells</li>
              <li>08 low tide cavern III</li>
              <li>09 franz josef glacier</li>
              <li>10 gemme IV + tūīs garden (hurricane version)</li>
            </ul>
          </Reveal>

          <Reveal>
            <p>
              Titres 1, 2, 3, 4, 6, 7, 8 et 9 composés, interprétés et produits par
              Benjamin Gibert, enregistrés à Muriwai (Nouvelle-Zélande), 2019.
              Échantillons de sons naturels enregistrés par Benjamin Gibert.
              <br />
              <br />
              Titre 9 composé par Benjamin Gibert & SVQO, produit par SVQO,
              enregistré à Lyon (France) et Porto Alegre (Brésil), 2013–2021.
              <br />
              Titre 10 composé et produit par Benjamin Gibert, enregistré à
              Muriwai (Nouvelle-Zélande) ainsi qu’à l’Abbaye Royale de Fontevraud
              et dans la forêt du Meygal (France), 2021.
              <br />
              <br />
              Artwork par Thomas Vaillant & Benjamin Gibert
              <br />
              Enregistré, mixé et masterisé par Benjamin Gibert lors de la résidence
              Earthskin à Muriwai, Nouvelle-Zélande
              <br />
            </p>
          </Reveal>
        </div>
      )}

      {lang === "jp" && (
        <div className="taihua_mainDataContainer_datas">
          <Reveal>
            <p>2019年11月04日リリース。</p>
          </Reveal>

          <Reveal>
            <ul>
              <li>01 barefoot</li>
              <li>02 low tide cavern I</li>
              <li>03 native forests</li>
              <li>04 tūīs garden</li>
              <li>05 glassbirds (feat.SVQO)</li>
              <li>06 low tide cavern II</li>
              <li>07 shells</li>
              <li>08 low tide cavern III</li>
              <li>09 franz josef glacier</li>
              <li>10 gemme IV + tūīs garden (hurricane version)</li>
            </ul>
          </Reveal>

          <Reveal>
            <p>
              トラック1、2、3、4、6、7、8、9はBenjamin Gibertによって
              作曲・演奏・プロデュースされ、2019年にニュージーランド・
              ムリワイで録音。
              自然音のサンプルはすべてBenjamin Gibertによる録音。
              <br />
              <br />
              トラック9はBenjamin Gibert & SVQOによる作曲、
              SVQOによるプロデュース。
              フランス・リヨンおよびブラジル・ポルトアレグレにて
              2013年〜2021年に録音。
              <br />
              トラック10はBenjamin Gibertによる作曲・プロデュース。
              ニュージーランド・ムリワイ、
              フランスのフォントヴロー王立修道院および
              メイガルの森にて2021年に録音。
              <br />
              <br />
              アートワーク：Thomas Vaillant & Benjamin Gibert
              <br />
              ニュージーランド・ムリワイのEarthskinレジデンシーにて
              録音、ミックス、マスタリング
              <br />
            </p>
          </Reveal>
        </div>
      )}
    </div>
  );
}

export default TaihuaDatas;
