import "./GemmesDescription.scss";
import React from "react";

function GemmesDescription({ lang }) {
  return (
    <div>
      {lang === "en" && (
        <div className="gemmes_mainDataContainer_descriptionContainer_descriptions">
          <p className="gemmes_mainDataContainer_descriptionContainer_descriptions_1">
            Entering winter
          </p>

          <p className="gemmes_mainDataContainer_descriptionContainer_descriptions_2">
            Gemmes is a rite of passage, a portal between the last glows of autumn
            and the first frosts of winter. This transition is beautiful to watch
            in nature, at that precise moment when amber light gives way to
            December drizzle. Long mornings were devoted to walking through the
            Fontevraud forest, watching the leaves change color, listening to the
            birds, gradually layering more and more clothing.
          </p>

          <p className="gemmes_mainDataContainer_descriptionContainer_descriptions_3">
            Gemmes was born from a residency at the Royal Abbey of Fontevraud for a
            little over a month, following a deeply chaotic emotional and romantic
            period. Life in the abbey and the cloister became a second skin,
            protective, a space of retreat far from any interaction with the
            outside.
            <br />
            <br />
            The word ‘gemme’ shares its root with ‘bud’, from the Latin ‘gemmae’.
            <br />
            It is as if an elixir had been prepared for the winters to come. A way
            to celebrate that days grow shorter, light fades, cold settles in, with
            a certain kind of excitement, as the ideal conditions come together to
            prepare a budding. The body enters hibernation, into fallow time, in a
            slowed down rhythm, kept warm, while watching winter settle in through
            a window.
            <br />
            <br />
            The EP artwork depicts that window looking out on winter.
          </p>
        </div>
      )}

      {lang === "fr" && (
        <div className="gemmes_mainDataContainer_descriptionContainer_descriptions">
          <p className="gemmes_mainDataContainer_descriptionContainer_descriptions_1">
            Entrée dans l'hiver
          </p>

          <p className="gemmes_mainDataContainer_descriptionContainer_descriptions_2">
            Gemmes est un rituel de passage, un portail entre les dernières lueurs
            de l’automne et les premiers frimas de l’hiver. Cette transition est
            magnifique à observer dans la nature, à cet instant précis où la
            lumière ambrée cède la place au crachin de décembre. De longs matins
            ont été consacrés à marcher dans la forêt de Fontevraud, à observer les
            feuilles changer de couleur, à écouter les oiseaux, en superposant peu
            à peu les épaisseurs de vêtements.
          </p>

          <p className="gemmes_mainDataContainer_descriptionContainer_descriptions_3">
            Gemmes est né d&apos;une résidence à l’Abbaye Royale de Fontevraud pendant
            un peu plus d’un mois, dans le prolongement d’une période sentimentale
            et émotionnelle très chaotique. La vie dans l’abbaye et le cloître est
            devenue une seconde peau, protectrice, un espace de retrait loin de
            toute interaction avec l’extérieur.
            <br />
            <br />
            Le mot ‘gemme’ partage sa racine avec ‘bourgeon’, du latin ‘gemmae’.
            <br />
            C’est comme si un élixir avait été préparé pour les hivers à venir. Une
            manière de célébrer le fait que les jours raccourcissent, que la
            lumière s’atténue, que le froid s’installe, avec une certaine forme
            d&apos;excitation, les conditions idéales étant réunies pour préparer un
            bourgeonnement. Le corps entre en hibernation, en jachère, dans un temps
            ralenti, au chaud, en observant l’hiver s’installer à travers une
            fenêtre.
            <br />
            <br />
            L’artwork de l’EP représente cette fenêtre qui regarde l’hiver.
          </p>
        </div>
      )}

      {lang === "jp" && (
        <div className="gemmes_mainDataContainer_descriptionContainer_descriptions">
          <p className="gemmes_mainDataContainer_descriptionContainer_descriptions_1">
            冬への入り口
          </p>

          <p className="gemmes_mainDataContainer_descriptionContainer_descriptions_2">
            Gemmesは通過儀礼であり、秋の最後の光と冬の最初の霜のあいだに開く
            ポータルでもある。この移ろいは自然の中で観察すると本当に美しい。
            琥珀色の光が、十二月の霧雨へと譲る、その正確な瞬間。フォントヴローの森を
            歩くことに長い朝の時間が捧げられ、葉が色づいていくのを眺め、鳥の声に耳を澄まし、
            服の重ね着を少しずつ増やしていった。
          </p>

          <p className="gemmes_mainDataContainer_descriptionContainer_descriptions_3">
            Gemmesは、フォントヴローの王立修道院で一ヶ月余り行われたレジデンスから生まれた。
            それは非常に混沌とした感情や恋愛の時期の延長線上にあった。修道院と回廊での生活は、
            守ってくれる第二の皮膚のようになり、外界との関わりから離れた避難所となった。
            <br />
            <br />
            ‘gemme’という語は、ラテン語の‘gemmae’に由来し、‘bourgeon’つまり芽と同じ語根を持つ。
            <br />
            それはまるで、これから来る冬のための霊薬が用意されたかのようだった。日が短くなり、
            光が弱まり、寒さが入り込むことを、ある種の高揚感とともに祝うために。芽吹きを準備するための
            理想的な条件が整っていく。身体は冬眠へ、休耕の時間へと入り、速度を落とし、暖かさの中で、
            窓越しに冬が定着していくのを見つめる。
            <br />
            <br />
            EPのアートワークは、その冬を見つめる窓を描いている。
          </p>
        </div>
      )}
    </div>
  );
}

export default GemmesDescription;
