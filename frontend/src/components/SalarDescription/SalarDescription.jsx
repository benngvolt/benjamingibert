import "./SalarDescription.scss";
import React from "react";
import { Reveal } from "../Reveal/Reveal";
import salar_title from '../../assets/salar/salar_title.webp'
import SalarDatas from '../../components/SalarDatas/SalarDatas'

const copy = {

  fr: {
    title: "Histoire d'une sublimation.",
    subtitle:
      "Un salar est un vaste désert de sel situé en altitude, formé par l’évaporation d’anciennes lagunes.",
    body: (
      <>
        <p>
          Salar est un album composé à partir d’enregistrements réalisés dans le désert d’Atacama, au Chili, lors d’une résidence au sein de la communauté lickan antai de Collo. <br /> <br />
  
          À travers douze titres, Salar est le récit d’une traversée, physique et introspective, au cœur de l’Atacama. Construit comme une montagne, il emmène progressivement l’auditeur depuis les routes poussiéreuses de l’Atacama jusqu’à la voûte céleste, avant de revenir au sol sous une forme nouvelle. <br /> <br />
  
          Le musicien part d’un état de saturation intérieure pour se sublimer peu à peu dans le désert, jusqu’à ne faire plus qu’un avec le vent des hauts plateaux. Tout commence par un geste simple, dans un bus : ouvrir un rideau à l’aube et découvrir le désert avec émerveillement. Cette vision marque un basculement : à l’émerveillement succèdent la solitude, puis l’euphorie, l’ivresse des sommets, jusqu’à la sensation de se fondre dans l’air. Le disque naît de ce besoin d’effacement, de cette nécessité de quitter une forme trop dense de soi-même pour devenir respiration, présence minimale dans l’immensité. <br /> <br />
  
          Au fil du séjour, les formations de sel prennent l’allure de créatures titanesques, les roches volcaniques se transforment en instruments, le vent se charge de légende et d’hostilité. Le paysage impose son échelle et rappelle la nôtre. Marcher, enregistrer, jouer : chaque mouvement devient une manière de se retrouver soi-même, en écho avec l’environnement. <br /> <br />
  
          Salar est une météorite inversée, qui part du sol et s’élève dans le ciel. Un besoin de partir en fumée.
        </p>
  
        <p>
          <strong>INTENTION ARTISTIQUE</strong> <br /> <br />
  
          Le désert n’est pas seulement un décor : il est un personnage, un interlocuteur, parfois une force qui nous dépasse tellement que l’on n’a pas d’autre choix que de se laisser porter sur son dos. Les sons enregistrés sur place constituent la matière première de l’écriture musicale. Le musicien joue avec ce qu’il trouve, ce qui fait sens pour lui, puis il en fait de la musique. <br /> <br />
  
          À travers ce projet, il interroge également sa place de voyageur dans un territoire chargé d’histoire, de spiritualité et de mémoire. Il s’agit moins de raconter le désert que d’accepter d’être transformé par lui. <br /> <br />
  
          <strong>DIRECTION ESTHÉTIQUE</strong> <br /> <br />
  
          Musicalement, Salar expérimente les craquements du sel, la résonance des bombes volcaniques, le son des arbres effleurés, mêlés à des boites à rythmes, à des synthétiseurs, et à une voix qui oscille entre chansons, incantations et narration. Les sons du lieu ne sont pas seulement documentés. Ils sont rejoués, transformés, ritualisés. <br /> <br />
  
          L’album navigue entre ambient, IDM, hyperpop, house, polyphonie vocale, musique expérimentale et influences drum’n’bass des années 90. <br /> <br />
  
          Chaque morceau possède son propre écosystème sonore tout en participant à une narration globale, comme si Salar était la bande originale d’un film imaginaire, séquencé en plusieurs chapitres, chacun rapprochant le personnage principal de l’atmosphère. <br /> <br />
  
          Les paysages minéraux du désert deviennent des espaces mentaux, peuplés de créatures imaginaires, de phénomènes géologiques personnifiés et d’architectures naturelles qui semblent appartenir à un autre monde. <br /> <br />
  
          L’esthétique convoque autant les photographies de terrain que les imaginaires du cinéma contemplatif, du fantastique et de la science-fiction. Salar navigue entre le tellurique et l’atmosphérique.
        </p>
      </>
    ),
  },
  
  en: {
    title: "A story of sublimation.",
    subtitle:
      "A salar is a vast high-altitude salt desert formed by the evaporation of ancient lagoons.",
    body: (
      <>
        <p>
          Salar is an album composed from recordings made in the Atacama Desert, Chile, during a residency within the Lickan Antai community of Collo. <br /> <br />
  
          Through twelve tracks, Salar tells the story of a physical and introspective journey across the Atacama. Built like a mountain, the album gradually guides the listener from the dusty roads of the desert to the celestial vault above, before returning them to the ground in a transformed state. <br /> <br />
  
          The musician begins from a state of inner saturation and slowly sublimates into the desert, until becoming one with the winds of the high plateaus. Everything starts with a simple gesture, on a bus: opening a curtain at dawn and discovering the desert in awe. This vision marks a turning point: wonder gives way to solitude, then euphoria, the intoxication of the summits, until the sensation of dissolving into the air itself. The record is born from this need for erasure, from the necessity of leaving behind an overly dense version of oneself in order to become breath — a minimal presence within immensity. <br /> <br />
  
          As the journey unfolds, salt formations begin to resemble titanic creatures, volcanic rocks transform into instruments, and the wind becomes charged with legend and hostility. The landscape imposes its scale and reminds us of our own. Walking, recording, playing: each movement becomes a way of finding oneself again, in resonance with the environment. <br /> <br />
  
          Salar is an inverted meteorite, rising from the ground into the sky. A need to vanish into smoke.
        </p>
  
        <p>
          <strong>ARTISTIC INTENTION</strong> <br /> <br />
  
          The desert is not merely a setting: it is a character, an interlocutor, sometimes a force so overwhelming that one has no choice but to let oneself be carried on its back. The sounds recorded on site form the raw material of the musical writing. The musician plays with what he finds, with what resonates for him, and transforms it into music. <br /> <br />
  
          Through this project, he also questions his place as a traveler within a territory charged with history, spirituality, and memory. It is less about telling the story of the desert than about accepting to be transformed by it. <br /> <br />
  
          <strong>AESTHETIC DIRECTION</strong> <br /> <br />
  
          Musically, Salar experiments with salt crackles, the resonance of volcanic bombs, and the sound of brushed trees, woven together with drum machines, synthesizers, and a voice oscillating between songs, incantations, and narration. The sounds of the place are not simply documented. They are replayed, transformed, ritualized. <br /> <br />
  
          The album navigates between ambient, IDM, hyperpop, house, vocal polyphony, experimental music, and 90s drum’n’bass influences. <br /> <br />
  
          Each track possesses its own sonic ecosystem while contributing to a larger narrative, as if Salar were the soundtrack to an imaginary film divided into several chapters, each one bringing the main character closer to the atmosphere itself. <br /> <br />
  
          The mineral landscapes of the desert become mental spaces populated by imaginary creatures, personified geological phenomena, and natural architectures that seem to belong to another world. <br /> <br />
  
          The aesthetic draws equally from field photography and the imaginaries of contemplative cinema, fantasy, and science fiction. Salar moves constantly between the telluric and the atmospheric.
        </p>
      </>
    ),
  },
  

  jp: {
    title: "昇華の物語。",
    subtitle:
      "サラールとは、太古のラグーンの蒸発によって形成された高地の巨大な塩の砂漠である。",
    body: (
      <>
        <p>
          『Salar』は、チリ・アタカマ砂漠で行われた録音をもとに制作されたアルバムであり、リッカン・アンタイ共同体コジョでのレジデンスから生まれた作品である。 <br /> <br />
  
          全12曲を通して、『Salar』はアタカマを横断する身体的かつ内省的な旅を描く。山のような構造を持つこのアルバムは、砂漠の埃っぽい道から天空へと聴き手を導き、最後には新しい姿となって再び地上へ帰還させる。 <br /> <br />
  
          音楽家は、内面的な飽和状態から出発し、少しずつ砂漠の中へと昇華していく。やがて高原を吹き抜ける風と一体になるまで。すべては、バスの中で夜明けにカーテンを開け、驚きとともに砂漠を目にするという単純な身振りから始まる。その光景は転換点となり、驚きはやがて孤独へ、そして高地の高揚感や陶酔へと変わり、最後には空気そのものへ溶け込んでいく感覚へと至る。このアルバムは、自己を消し去りたいという欲求から生まれた。過剰に重くなった自己から離れ、呼吸となり、広大さの中の最小限の存在になるために。 <br /> <br />
  
          滞在が進むにつれ、塩の地形は巨大な生物のような姿を帯び、火山岩は楽器へと変わり、風は伝説と敵意をまとい始める。風景はその圧倒的なスケールを突きつけ、同時に私たち自身の小ささを思い出させる。歩くこと、録音すること、演奏すること――その一つひとつの動きが、この環境との共鳴の中で、自分自身を取り戻すための行為になっていく。 <br /> <br />
  
          『Salar』は、地上から空へ向かって上昇する“逆さの隕石”である。煙のように消えていきたいという衝動。
        </p>
  
        <p>
          <strong>アーティスティック・インテンション</strong> <br /> <br />
  
          砂漠は単なる背景ではない。それは登場人物であり、対話の相手であり、ときにはあまりにも巨大な力として私たちを超えていく。その背中に身を委ねるしかないほどに。現地で録音された音は、音楽制作の原材料となる。音楽家はそこで見つけたもの、自分にとって意味を持つものを使い、それを音楽へと変換していく。 <br /> <br />
  
          このプロジェクトを通して、彼はまた、歴史や精神性、記憶が刻まれた土地における“旅人としての自分の立場”についても問いかけている。それは砂漠を語ることよりも、むしろ砂漠によって変えられていくことを受け入れる行為である。 <br /> <br />
  
          <strong>美学的ディレクション</strong> <br /> <br />
  
          音楽的に『Salar』は、塩のひび割れる音、火山弾の共鳴、木々をかすめる音を、ドラムマシンやシンセサイザー、そして歌、呪術的な詠唱、ナレーションの間を揺れ動く声と結びつけながら実験している。土地の音は単に記録されるだけではない。再演され、変形され、儀式化される。 <br /> <br />
  
          アルバムは、アンビエント、IDM、ハイパーポップ、ハウス、声のポリフォニー、実験音楽、90年代ドラムンベースの影響を横断していく。 <br /> <br />
  
          それぞれの楽曲は固有の音響生態系を持ちながら、同時に全体の物語へ参加している。まるで『Salar』が架空の映画のサウンドトラックであり、複数の章に分かれ、それぞれが主人公を“空気”そのものへ近づけていくかのように。 <br /> <br />
  
          砂漠の鉱物的風景は、想像上の生物、人格を持った地質現象、異世界に属しているような自然建築に満ちた精神空間へと変わっていく。 <br /> <br />
  
          その美学は、フィールド写真、瞑想的映画、幻想世界、そしてSF的イメージを同時に呼び起こす。『Salar』は、大地的なものと大気的なものの間を漂い続ける。
        </p>
      </>
    ),
  },
};
  

function SalarDescription({ lang }) {
  const content = copy[lang] || copy.fr;

  return (
    <div className="salar_mainDataContainer_descriptionContainer_descriptions" id="salar_album">
      <Reveal>
        <img
          className='salar_mainDataContainer_title'
          src={salar_title}
        /> 
        <div className="salar_mainDataContainer_datasContainer">
          <SalarDatas lang={lang}/>
        </div>
      </Reveal>
      <Reveal>
        <div className="salar_mainDataContainer_descriptionContainer_descriptions_1">
          {content.title}
        </div>
      </Reveal>

      <Reveal>
        <div className="salar_mainDataContainer_descriptionContainer_descriptions_2">
          {content.subtitle}
        </div>
      </Reveal>

      <Reveal>
        <div className="salar_mainDataContainer_descriptionContainer_descriptions_3">
          {content.body}
        </div>
      </Reveal>
    </div>
  );
}

export default SalarDescription;