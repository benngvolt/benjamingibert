import "./SalarDescription.scss";
import React from "react";
import { Reveal } from "../Reveal/Reveal";

const copy = {
  fr: {
  title: "Histoire d'une sublimation.",
  subtitle:
  "Un salar est un vaste désert de sel situé en altitude, formé par l’évaporation d’anciennes lagunes.",
  body: (
    <>
    Salar est un album de musique électronique composé à partir d’enregistrements réalisés dans le désert d’Atacama, au Chili, lors d’une résidence artistique au sein de la communauté lickan antai de Collo. <br /> <br />
    À travers neuf morceaux, Salar est le récit d’une traversée, physique et introspective, au cœur de l’Atacama. Construit comme une montagne, il emmène progressivement l’auditeur des routes poussiéreuses du désert jusqu’aux hauts plateaux andins et à la voûte céleste, avant de le ramener au sol sous une forme nouvelle. <br /> <br />
    Le musicien part d’un état de saturation intime pour se dissoudre peu à peu dans un paysage minéral, jusqu’à ne faire plus qu’un avec le vent des hauts plateaux. Tout commence par un geste simple : ouvrir un rideau à l’aube et découvrir le désert. Cette apparition agit comme un choc attendu depuis des années. Le disque naît de ce désir d’évaporation, de cette nécessité de quitter une forme trop dense de soi-même pour devenir respiration, présence minimale dans l’immensité. <br /> <br />
    Au fil du séjour, les formations de sel prennent l’allure de créatures titanesques, les roches volcaniques se transforment en instruments, le vent se charge de légende et d’hostilité. Le paysage impose son échelle et rappelle notre fragilité. Marcher, enregistrer, jouer : chaque geste devient une manière de coexister. <br /> <br />
    Musicalement, Salar se balade entre field recording et écriture électronique : craquements du sel, résonances des bombes volcaniques, battements de cœur d’un lama, arbres effleurés, mêlés à des structures rythmiques house, à des synthétiseurs et à une voix oscillant entre registre pop, incantations et narration. Les sons du lieu ne sont pas seulement documentés. Ils sont rejoués, transformés, ritualisés. <br /> <br />
    Plus qu’un album sur le désert, Salar est une traversée qui mène à la dissolution, du sol au ciel. Un besoin de partir en fumée.
    </>
    ),
  },
  
  en: {
  title: "A story of sublimation.",
  subtitle:
  "A salar is a vast high-altitude salt desert formed by the evaporation of ancient lagoons.",
  body: (
    <>
    Salar is an electronic music album composed from recordings made in the Atacama Desert, Chile, during an artistic residency within the Lickan Antai community of Collo. <br /> <br />
    Through nine tracks, Salar tells the story of a physical and introspective journey across the Atacama. Built like a mountain, the album gradually guides the listener from the dusty roads of the desert to the high Andean plateaus and the celestial vault above, before bringing them back down to earth in a transformed state. <br /> <br />
    The musician begins from a place of intimate saturation and slowly dissolves into the mineral landscape, until becoming one with the winds of the high plateaus. Everything starts with a simple gesture: opening a curtain at dawn and discovering the desert. That apparition lands like a shock long awaited. The record is born from this desire for evaporation, from the need to leave behind an overly dense version of oneself and become breath — a minimal presence within immensity. <br /> <br />
    As the journey unfolds, salt formations begin to resemble titanic creatures, volcanic rocks turn into instruments, and the wind fills with legend and hostility. The landscape imposes its scale and reminds us of our fragility. Walking, recording, playing: each gesture becomes a way of coexisting. <br /> <br />
    Musically, Salar moves between field recording and electronic composition: salt crackles, volcanic resonances, the heartbeat of a llama, brushed trees, woven together with house-inspired rhythmic structures, synthesizers, and a voice oscillating between pop, incantation, and narration. The sounds of the territory are not simply documented — they are replayed, transformed, ritualized. <br /> <br />
    More than an album about the desert, Salar is a passage toward dissolution, from the ground to the sky. A desire to vanish into smoke.
    </>
    ),
  },
  
  jp: {
  title: "昇華の物語。",
  subtitle:
  "サラールとは、太古のラグーンの蒸発によって形成された高地の巨大な塩の砂漠である。",
  body: (
    <>
    『Salar』は、チリ・アタカマ砂漠で行われた録音をもとに制作された電子音楽アルバムであり、リッカン・アンタイ共同体コジョでのアーティスト・レジデンスから生まれた作品である。 <br /> <br />
    全9曲を通して、『Salar』はアタカマを横断する身体的かつ内省的な旅を描く。山のような構造を持つこのアルバムは、砂漠の埃っぽい道からアンデス高原、そして星空へと聴き手を導き、最後には変化した姿で再び地上へと帰還させる。 <br /> <br />
    音楽家は、個人的な飽和状態から出発し、鉱物的な風景の中へ少しずつ溶け込んでいく。やがて高原を吹き抜ける風と一体になるまで。すべては、夜明けにカーテンを開け、砂漠を目にするという単純な身振りから始まる。その光景は、何年も待ち続けていた衝撃として現れる。このアルバムは、蒸発したいという欲望から生まれた。過剰に重くなった自己から離れ、呼吸となり、広大さの中の最小限の存在になるために。 <br /> <br />
    滞在が進むにつれ、塩の地形は巨大な生物のような姿を帯び、火山岩は楽器へと変わり、風は伝説と敵意を宿していく。風景はそのスケールを突きつけ、同時に人間の脆さを思い出させる。歩くこと、録音すること、演奏すること——その一つひとつが、この土地と共存するための行為になっていく。 <br /> <br />
    音楽的に『Salar』は、フィールドレコーディングと電子音楽の作曲を行き来する。塩のひび割れる音、火山岩の共鳴、ラマの鼓動、木々に触れる音。それらがハウス由来のリズム構造、シンセサイザー、そしてポップ／呪術／ナレーションの間を揺れ動く声と織り重なっていく。土地の音は単に記録されるだけではない。再演され、変形され、儀式化される。 <br /> <br />
    『Salar』は単なる砂漠についてのアルバムではない。それは地上から空へ向かう“溶解”の旅である。煙のように消えていきたいという欲望。
    </>
    ),
  },
};
  

function SalarDescription({ lang }) {
  const content = copy[lang] || copy.fr;

  return (
    <div className="salar_mainDataContainer_descriptionContainer_descriptions">
      <Reveal>
        <p className="salar_mainDataContainer_descriptionContainer_descriptions_1">
          {content.title}
        </p>
      </Reveal>

      <Reveal>
        <p className="salar_mainDataContainer_descriptionContainer_descriptions_2">
          {content.subtitle}
        </p>
      </Reveal>

      <Reveal>
        <p className="salar_mainDataContainer_descriptionContainer_descriptions_3">
          {content.body}
        </p>
      </Reveal>
    </div>
  );
}

export default SalarDescription;