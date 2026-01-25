import "./GemmesDescription.scss";
import React from "react";

function GemmesDescription({ lang }) {
  return (
    <div>
      {lang === "en" && (
        <div className='gemmes_mainDataContainer_descriptionContainer_descriptions'>
          <p className='taihua_mainDataContainer_descriptionContainer_descriptions_1'>
            Entering winter
          </p>
          <p className='taihua_mainDataContainer_descriptionContainer_descriptions_2'>
            The first days were filled with excitement: everything felt possible.
            They were also tinged with a certain apprehension, as I had to produce
            something ambitious within a single month. Instinctively, I connected
            to what I was discovering while wandering through the forest and along
            the nearby riverbanks. I felt the need to gather material from the
            surrounding environment, as if music were a form of cooking, made from
            local ingredients—always different depending on experiences,
            encounters, and discoveries.
          </p>
          <p className='taihua_mainDataContainer_descriptionContainer_descriptions_3'>
            I don’t feel particularly connected to the tradition of Christmas.
            Instead, I wanted to compose around the winter solstice, or more
            precisely around the transition from autumn to winter. This transition
            is beautiful to observe in nature: the drop in temperature, the
            shifting birdsongs, that exact moment when the soft amber light gives
            way to November drizzle. I didn’t see any snow during those days, the
            region isn’t especially suited for it. But I spent time walking
            through the forest, watching the leaves change color, and starting to
            layer my clothes.
            <br />
            <br />
            The five pieces of Gemmes emerged from this gradual transformation.
          </p>
        </div>
      )}

      {lang === "fr" && (
        <div className='gemmes_mainDataContainer_descriptionContainer_descriptions'>
          <p className='taihua_mainDataContainer_descriptionContainer_descriptions_1'>
            Entrée dans l'hiver
          </p>
          <p className='taihua_mainDataContainer_descriptionContainer_descriptions_2'>
            Les premiers jours étaient remplis d’excitation : tout semblait
            possible. Ils étaient aussi teintés d’une certaine appréhension, car je
            devais produire quelque chose d’ambitieux en un seul mois.
            Instinctivement, je me suis relié à ce que je découvrais en errant dans
            la forêt et le long des berges de la rivière toute proche. J’ai ressenti
            le besoin de récolter de la matière dans l’environnement alentour,
            comme si la musique était une forme de cuisine, faite d’ingrédients
            locaux — toujours différents selon les expériences, les rencontres et
            les découvertes.
          </p>
          <p className='taihua_mainDataContainer_descriptionContainer_descriptions_3'>
            Je ne me sens pas particulièrement lié à la tradition de Noël. À la
            place, je voulais composer autour du solstice d’hiver, ou plus
            précisément autour du passage de l’automne à l’hiver. Cette transition
            est magnifique à observer dans la nature : la baisse de température, le
            déplacement des chants d’oiseaux, cet instant exact où la lumière ambrée
            et douce cède la place au crachin de novembre. Je n’ai pas vu de neige
            durant ces jours-là, la région ne s’y prête pas particulièrement. Mais
            j’ai passé du temps à marcher dans la forêt, à regarder les feuilles
            changer de couleur, et à commencer à superposer les couches de
            vêtements.
            <br />
            <br />
            Les cinq pièces de Gemmes sont nées de cette transformation progressive.
          </p>
        </div>
      )}

      {lang === "jp" && (
        <div className='gemmes_mainDataContainer_descriptionContainer_descriptions'>
          <p className='taihua_mainDataContainer_descriptionContainer_descriptions_1'>
            冬への入り口
          </p>
          <p className='taihua_mainDataContainer_descriptionContainer_descriptions_2'>
            最初の数日間は高揚感に満ちていて、何もかもが可能に思えた。
            その一方で、たった一ヶ月のあいだに野心的なものを生み出さなければ
            ならないという不安も、どこかに混じっていた。私は直感的に、森を
            さまよい、近くの川辺を歩きながら発見していくものに接続していった。
            音楽が料理だとしたら、周囲の環境から採れる素材は“地元の食材”のようなもの。
            体験や出会い、発見によって、いつも違う味になる。そんなふうに感じながら、
            私はこの場所から材料を集める必要があった。
          </p>
          <p className='taihua_mainDataContainer_descriptionContainer_descriptions_3'>
            私はクリスマスの伝統に強く結びついているわけではない。むしろ、
            冬至をめぐって、あるいはもっと正確に言えば、秋から冬への移ろいの
            その境目をめぐって作曲したかった。この変化は自然の中で観察すると
            本当に美しい。気温が下がり、鳥のさえずりが変わり、柔らかな琥珀色の光が
            11月の霧雨へと切り替わっていく、あの正確な瞬間。あの頃、雪は一度も
            見なかった。この土地は雪に特別向いているわけではないのだろう。
            それでも私は森を歩き、葉が色づいていくのを眺め、服を重ね着しはじめた。
            <br />
            <br />
            Gemmesの5つの曲は、この緩やかな変化の中から立ち上がってきた。
          </p>
        </div>
      )}
    </div>
  );
}

export default GemmesDescription;
