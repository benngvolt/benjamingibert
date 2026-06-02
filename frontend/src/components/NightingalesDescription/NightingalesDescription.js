import "./NightingalesDescription.scss";
import React from "react";
import { Reveal } from "../Reveal/Reveal";

function NightingalesDescription({ lang }) {
  return (
    <div className="nightingales_mainDataContainer_descriptionContainer">
      {lang === "en" && (
        <div className="nightingales_mainDataContainer_descriptionContainer_descriptions">
          <Reveal>
            <p className="nightingales_mainDataContainer_descriptionContainer_descriptions_1">
              Cosmic sap
            </p>
          </Reveal>

          <Reveal>
            <p className="nightingales_mainDataContainer_descriptionContainer_descriptions_2">
              Nightingales is a musical fiction in four tracks, a secret rave
              born between the trees. It unfolds as an imaginary ecosystem made
              of concrete and organic textures, layers, rhythms and harmonic
              intertwinings, drawing on musical references from the early 2000s.
              The nightingale, emblematic bird of the EP, is known for its
              nocturnal song. It becomes here the symbol of a liminal space.
            </p>
          </Reveal>

          <Reveal>
            <p className="nightingales_mainDataContainer_descriptionContainer_descriptions_3">
              I cultivate a fascination for everything that happens naturally,
              for what is accidental and escapes me, whether in the environment
              or in my own mind.
              <br />
              The impulse was born from a walk in the forest, the morning after
              a festival. In the contrast between the echoes of festive nights
              and the calm of the morning, a question emerged: what if I
              invented my own sanctuary for dance, playing with the contrasts
              between urban music vocabularies and the organic qualities of
              experimental music?
              <br />
              Fragments inherited from the electronic scenes of the 1990s and
              2000s then appear: patterns drawn from house, IDM and UK garage,
              unfolding into a futuristic vocal polyphony before dawn.
              <br />
              One of the defining features of the EP lies in the gradual
              emergence of the human voice, without words or language, in the
              form of phonemes and improvised fragments.
            </p>
          </Reveal>
        </div>
      )}

      {lang === "fr" && (
        <div className="nightingales_mainDataContainer_descriptionContainer_descriptions">
          <Reveal>
            <p className="nightingales_mainDataContainer_descriptionContainer_descriptions_1">
              Sève cosmique
            </p>
          </Reveal>

          <Reveal>
            <p className="nightingales_mainDataContainer_descriptionContainer_descriptions_2">
              Nightingales est une fiction musicale en quatre titres, une rave
              secrète née entre les arbres. C’est un écosystème imaginaire fait
              de textures concrètes et organiques, de strates, de rythmes et
              d’entrelacs harmoniques, nourri de références musicales du début
              des années 2000. Le rossignol, oiseau emblématique de l’EP, est
              connu pour son chant nocturne. Il devient ici le symbole d’un
              espace liminal.
            </p>
          </Reveal>

          <Reveal>
            <p className="nightingales_mainDataContainer_descriptionContainer_descriptions_3">
              Je cultive une fascination pour tout ce qui advient naturellement,
              pour ce qui est accidentel et m’échappe, que ce soit dans
              l’environnement ou dans mon propre esprit.
              <br />
              L’impulsion est née d’une marche en forêt, au lendemain d’un
              festival. Dans le contraste entre les échos des nuits festives et
              le calme du matin, une question a surgi : et si j’inventais mon
              propre sanctuaire pour la danse, en jouant sur les contrastes
              entre le vocabulaire des musiques urbaines et l’organicité de la
              musique expérimentale ?
              <br />
              Apparaissent alors des fragments hérités de la scène électronique
              des années 90 et 2000 : des motifs empruntés à la house, à l’IDM et
              à l’UK garage, qui se déploient jusqu’à une polyphonie vocale
              futuriste, juste avant l’aube.
              <br />
              Une caractéristique de l’EP réside dans l’émergence progressive
              de la voix humaine, sans mots ni langage, sous forme de phonèmes
              et de fragments improvisés.
            </p>
          </Reveal>
        </div>
      )}

      {lang === "jp" && (
        <div className="nightingales_mainDataContainer_descriptionContainer_descriptions">
          <Reveal>
            <p className="nightingales_mainDataContainer_descriptionContainer_descriptions_1">
              宇宙の樹液
            </p>
          </Reveal>

          <Reveal>
            <p className="nightingales_mainDataContainer_descriptionContainer_descriptions_2">
              Nightingalesは4曲から成る音楽的フィクションであり、
              木々のあいだに生まれた秘密のレイヴである。
              具体的かつ有機的な質感、レイヤー、リズム、調和の絡まり
              から成る架空の生態系として広がり、2000年代初頭の
              音楽的参照を内包している。
              EPの象徴的存在であるナイチンゲールは夜に歌う鳥として
              知られ、ここではリミナルな空間の象徴となる。
            </p>
          </Reveal>

          <Reveal>
            <p className="nightingales_mainDataContainer_descriptionContainer_descriptions_3">
              私は、自然に生じるもの、偶発的で制御できないものに
              強く惹かれている。それが環境の中であれ、自身の内面で
              あれ変わらない。
              <br />
              その衝動は、フェスティバルの翌朝に森を歩いたことから
              生まれた。祝祭の夜の残響と朝の静けさの対比の中で、
              ひとつの問いが浮かび上がる。
              都市的な音楽語彙と実験音楽の有機性を行き来しながら、
              自分自身のダンスのための聖域を創るとしたら？
              <br />
              そこから、90年代から2000年代のエレクトロニック・
              シーンに由来する断片が立ち現れる。
              ハウス、IDM、UKガラージュのモチーフが、
              夜明け前の未来的なヴォーカル・ポリフォニーへと
              展開していく。
              <br />
              EPの特徴のひとつは、人間の声が言葉や言語を持たず、
              音素や即興的な断片として徐々に現れてくる点にある。
            </p>
          </Reveal>
        </div>
      )}
    </div>
  );
}

export default NightingalesDescription;
