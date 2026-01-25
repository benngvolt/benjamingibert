import "./NightingalesDescription.scss";
import React from "react";

function NightingalesDescription({ lang }) {
  return (
    <div className='nightingales_mainDataContainer_descriptionContainer'>
      {lang === "en" && (
        <div className="nightingales_mainDataContainer_descriptionContainer_descriptions">
          <p className="nightingales_mainDataContainer_descriptionContainer_descriptions_1">
            Nightingales is a musical fiction in four tracks, a secret rave born in the heart of the trees, a place where chimeras and streams improvise together in a shared language.
          </p>
          <p className="nightingales_mainDataContainer_descriptionContainer_descriptions_2">
            The nightingale, emblematic bird of the title, is known for its nocturnal song. Here, it becomes the symbol of a liminal space — between wakefulness and sleep, between nature and synthesis.
          </p>
          <p className="nightingales_mainDataContainer_descriptionContainer_descriptions_3">
            It is an imaginary ecosystem made of concrete textures, layers, rhythms and harmonic intertwinings, a space in which one dives to dance. I cultivate a fascination for everything that happens naturally, for what is accidental and escapes me — whether in the environment or in my own mind.<br/>
            The impulse was born from a walk in the forest, on the morning after a house festival. In the contrast between the echoes of a festive night and the morning calm, a question arose: what if I invented my own sanctuary for dance? My favorite activity: venturing into immersion, always on the edge between introspection and excitement for external phenomena.<br/>
            Here appear fragments inherited from the electronic scene of the 90s and 2000s: patterns borrowed from house, IDM, UK garage, ending in a futuristic vocal polyphony before sunrise.<br/>
            A distinctive feature of the EP is the gradual emergence of the human voice, without words or language, in the form of phonemes, breaths and improvised fragments. Used as raw material, it gradually seeps into the tracks, not aiming to signify, but simply to resonate with the other elements.
          </p>
        </div>
      )}

      {lang === "fr" && (
        <div className="nightingales_mainDataContainer_descriptionContainer_descriptions">
          <p className="nightingales_mainDataContainer_descriptionContainer_descriptions_1">
            Nightingales est une fiction musicale en quatre titres, une rave secrète née au cœur des arbres, un lieu où chimères et ruisseaux improvisent ensemble dans un langage commun.
          </p>
          <p className="nightingales_mainDataContainer_descriptionContainer_descriptions_2">
            Le rossignol, oiseau emblématique du titre, est connu pour son chant nocturne. Il devient ici le symbole d’un espace liminal — entre veille et sommeil, entre nature et synthèse.
          </p>
          <p className="nightingales_mainDataContainer_descriptionContainer_descriptions_3">
            C’est un écosystème imaginaire fait de textures concrètes, de strates, de rythmes et d’entrelacs harmoniques, un espace dans lequel on plonge pour danser. Je cultive une fascination pour tout ce qui advient naturellement, pour ce qui est accidentel et m’échappe — que ce soit dans l’environnement ou dans mon propre esprit.<br/>
            L’impulsion est née d’une marche en forêt, au lendemain d’une fête en maison. Dans le contraste entre les échos d’une nuit festive et le calme du matin, une question a surgi : et si j’inventais mon propre sanctuaire pour la danse ? Mon activité favorite : m’aventurer dans l’immersion, toujours à la lisière entre introspection et excitation face aux phénomènes extérieurs.<br/>
            Apparaissent ici des fragments hérités de la scène électronique des années 90 et 2000 : des motifs empruntés à la house, à l’IDM, à l’UK garage, s’achevant dans une polyphonie vocale futuriste avant l’aube.<br/>
            Une caractéristique distinctive de l’EP réside dans l’émergence progressive de la voix humaine, sans mots ni langage, sous forme de phonèmes, de souffles et de fragments improvisés. Utilisée comme matière brute, elle s’infiltre peu à peu dans les morceaux, non pour signifier, mais simplement pour entrer en résonance avec les autres éléments.
          </p>
        </div>
      )}

      {lang === "jp" && (
        <div className="nightingales_mainDataContainer_descriptionContainer_descriptions">
          <p className="nightingales_mainDataContainer_descriptionContainer_descriptions_1">
            Nightingales は4曲から成る音楽的フィクションであり、木々の奥深くで生まれた秘密のレイヴ、キメラと小川が共通の言語で即興する場所である。
          </p>
          <p className="nightingales_mainDataContainer_descriptionContainer_descriptions_2">
            タイトルの象徴的な存在であるナイチンゲールは、夜に歌う鳥として知られている。ここでは、覚醒と睡眠のあいだ、自然と合成のあいだに広がるリミナルな空間の象徴となる。
          </p>
          <p className="nightingales_mainDataContainer_descriptionContainer_descriptions_3">
            それは具体的な質感、レイヤー、リズム、そして調和の絡まりから成る架空の生態系であり、踊るために身を投じる空間である。私は自然に起こること、偶発的で制御できないもの — 環境の中であれ、自身の内面であれ — に強い魅力を感じている。<br/>
            その衝動は、ハウス・パーティーの翌朝に森を歩いたことから生まれた。祝祭の夜の残響と朝の静けさの対比の中で、ひとつの問いが浮かび上がった — 自分自身のダンスのための聖域を創るとしたら？ 私にとって最も心惹かれる行為は、内省と外界の現象への高揚の境界に立ちながら、没入へと踏み込むことである。<br/>
            ここには90年代から2000年代のエレクトロニック・シーンに由来する断片が現れる。ハウス、IDM、UKガラージュから借用されたパターンが、夜明け前の未来的なヴォーカル・ポリフォニーへと収束していく。<br/>
            本EPの特徴のひとつは、言葉や言語を持たない人間の声が、音素、呼吸、即興的な断片として徐々に立ち現れる点にある。生の素材として用いられた声は、意味を伝えることを目的とせず、他の要素と共鳴するためだけに、楽曲の中へと静かに染み込んでいく。
          </p>
        </div>
      )}
    </div>
  );
}

export default NightingalesDescription;
