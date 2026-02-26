import "./SalarDescription.scss";
import React from "react";
import { Reveal } from "../Reveal/Reveal";

const copy = {
  fr: {
    title: "Histoire d'une sublimation.",
    subtitle:
      "Un salar est un vaste désert de sel, situé en altitude, formé par l’évaporation d’anciennes lagunes.",
    body: (
      <>
        Salar est le récit d’une traversée, physique et introspective, au cœur de l’Atacama. L’album
        suit un mouvement d’élévation progressive : partir d’un état de saturation intime pour se
        dissoudre peu à peu dans un paysage minéral, jusqu’à ne faire plus qu'un avec le vent des
        hauts plateaux.
        <br />
        <br />
        Tout commence par un geste simple : ouvrir un rideau à l’aube et découvrir le désert. Cette
        apparition agit comme un choc attendu depuis des années. Le disque naît de ce désir
        d’évaporation, de cette nécessité de quitter une forme trop dense de soi-même pour devenir
        respiration, présence minimale dans l'immensité.
        <br />
        <br />
        Au fil du séjour, les formations de sel prennent l’allure de créatures titanesques, les
        roches volcaniques se transforment en instruments, le vent se charge de légende et
        d’hostilité. Le paysage impose son échelle et rappelle notre échelle. Marcher, enregistrer,
        jouer : chaque geste devient une manière de coexister.
        <br />
        <br />
        Musicalement, Salar se ballade entre field recording et écriture électronique : craquements
        du sel, résonances des bombes volcaniques, battements de cœur d'un lama, arbres effleurés,
        mêlés à des structures rythmiques house, à des synthétiseurs, à une voix qui oscille entre
        registre pop, incantations et narration. Les sons du lieu ne sont pas seulement documentés.
        Ils sont rejoués, transformés, ritualisés.
        <br />
        <br />
        Plus qu’un album sur le désert, Salar est une traversée qui mène à la dissolution, du sol
        au ciel. Un besoin de partir en fumée.
      </>
    ),
  },

  en: {
    title: "A story of sublimation.",
    subtitle:
      "A salar is a vast high-altitude salt desert, formed by the evaporation of ancient lagoons.",
    body: (
      <>
        Salar tells the story of a journey, both physical and introspective, through the heart of
        the Atacama. The album follows a gradual rise in altitude: moving from an intimate state of
        saturation toward a slow dissolution into a mineral landscape, until becoming one with the
        wind of the high plateaus.
        <br />
        <br />
        It begins with a simple gesture: opening a curtain at dawn and discovering the desert. That
        apparition lands like a shock I had been waiting for for years. The record is born from
        this desire to evaporate, from the need to leave a version of myself that had become too
        dense, and to turn into breath: a minimal presence within immensity.
        <br />
        <br />
        As the stay unfolds, salt formations take on the shape of titanic creatures, volcanic rocks
        become instruments, and the wind fills with legend and hostility. The landscape imposes its
        scale and recalibrates ours. Walking, recording, playing: each gesture becomes a way of
        coexisting.
        <br />
        <br />
        Musically, Salar wanders between field recording and electronic writing: the crackle of
        salt, the resonance of volcanic bombs, the heartbeat of a llama, trees brushed and tapped,
        woven into house rhythmic structures, synthesizers, and a voice that moves between pop,
        incantation, and narration. The sounds of the place are not only documented; they are
        replayed, transformed, ritualized.
        <br />
        <br />
        More than an album about the desert, Salar is a passage into dissolution — from ground to
        sky. A need to vanish into smoke.
      </>
    ),
  },

  jp: {
    title: "昇華の物語。",
    subtitle:
      "サラールとは、高地に広がる巨大な塩の砂漠で、太古のラグーンが蒸発して形成されたものだ。",
    body: (
      <>
        『Salar』は、アタカマの核心を横断する旅の記録だ。身体的であり、同時に内省的でもある。
        作品は段階的な“高度の上昇”に沿って進む。個人的な飽和状態から出発し、鉱物的な風景へと
        少しずつ溶けていき、やがて高原の風と一体になるまで。
        <br />
        <br />
        始まりはごくシンプルな動作だ。夜明けにカーテンを開け、砂漠を目にすること。その出現は、
        何年も待ち望んでいた衝撃として降りかかる。この作品は“蒸発したい”という欲望から生まれた。
        かつての自分があまりに濃密になりすぎたがゆえに、それを離れ、呼吸へと変わる必要があった。
        広大さの中の、最小限の存在として。
        <br />
        <br />
        滞在が進むにつれ、塩の形成は巨獣のような輪郭を帯び、火山岩は楽器へと変わり、風は伝承と
        敵意を宿していく。風景はそのスケールを突きつけ、こちらの尺度を組み替える。歩くこと、録ること、
        演奏すること——その一つひとつが、共存のための身振りになる。
        <br />
        <br />
        音楽的に『Salar』は、フィールドレコーディングと電子的な作曲のあいだを漂う。塩のひび割れ、
        火山弾の共鳴、ラマの鼓動、木々に触れる音——それらがハウスのリズム構造やシンセサイザー、
        そしてポップ／呪文／物語のあいだを揺れる声と編み込まれていく。土地の音は“記録”されるだけではない。
        再演され、変形され、儀式化される。
        <br />
        <br />
        『Salar』は砂漠についてのアルバムというより、溶解へ向かう通過儀礼だ。地面から空へ。
        煙のように消えていく必要。
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