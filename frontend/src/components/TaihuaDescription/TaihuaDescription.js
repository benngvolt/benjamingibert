import "./TaihuaDescription.scss";
import React from "react";

function TaihuaDescription({ lang }) {
  return (
    <div>
      {lang === "en" && (
        <div className="taihua_mainDataContainer_descriptionContainer_descriptions">
          <p className="taihua_mainDataContainer_descriptionContainer_descriptions_1">
            Antechamber of the ocean.
          </p>
          <p className="taihua_mainDataContainer_descriptionContainer_descriptions_2">
            Taihua refers to the intertidal zone, the area between the limits of low and high tide.
          </p>
          <p className="taihua_mainDataContainer_descriptionContainer_descriptions_3">
            We wandered through many 'taihuas' in New Zealand, in search of sounds and noises,
            shells, and viewpoints over native forests or distant islands.
            <br />
            <br />
            We followed a powerful, often restless ocean; we surfed the waves of the rising tide
            and ran barefoot across the damp 'taihua' of Muriwai Beach. We watched dusk there,
            photographed pink skies, the surface of the water like a mirror.
            We captured the echo of caves accessible only at low tide.
            We studied sand covered with sounding shells…
            <br />
            <br />
            Then we went further inland, along rivers, still barefoot.
            We immersed ourselves in native forests, surrounded by endemic birds.
            All the pieces in Taihua speak of hyper-locality:
            they contain sounds gathered on site, from the frenetic melodic phrases
            of the tūī or the piwakawaka to the fast rhythmic patterns of insects.
            Humans also have their role in this story:
            they simply made sure to take off their shoes.
          </p>
        </div>
      )}

      {lang === "fr" && (
        <div className="taihua_mainDataContainer_descriptionContainer_descriptions">
          <p className="taihua_mainDataContainer_descriptionContainer_descriptions_1">
            Antichambre de l’océan.
          </p>
          <p className="taihua_mainDataContainer_descriptionContainer_descriptions_2">
            Taihua désigne la zone intertidale, l’espace situé entre les limites
            de la marée basse et de la marée haute.
          </p>
          <p className="taihua_mainDataContainer_descriptionContainer_descriptions_3">
            Nous avons arpenté de nombreux 'taihuas' en Nouvelle-Zélande,
            à la recherche de sons et de bruits, de coquillages,
            de points de vue sur les forêts natives ou sur des îles lointaines.
            <br />
            <br />
            Nous avons longé un océan puissant et souvent agité,
            surfé sur les vagues de la marée montante
            et couru pieds nus sur le 'taihua' humide de la plage de Muriwai.
            Nous y avons observé le crépuscule,
            photographié des ciels roses, la surface de l’eau comme un miroir.
            Nous avons capturé l’écho de grottes accessibles uniquement à marée basse.
            Nous avons étudié le sable couvert de coquillages sonores…
            <br />
            <br />
            Puis nous sommes allés plus loin dans les terres,
            le long des rivières, toujours pieds nus.
            Nous nous sommes immergés dans les forêts natives,
            entourés d’oiseaux endémiques.
            Toutes les pièces de Taihua parlent d’hyper-localité :
            elles contiennent des sons récoltés sur place,
            des phrases mélodiques frénétiques du tūī ou du piwakawaka
            aux motifs rythmiques rapides des insectes.
            L’humain a aussi son rôle dans cette histoire :
            il a simplement pris soin d’enlever ses chaussures.
          </p>
        </div>
      )}

      {lang === "jp" && (
        <div className="taihua_mainDataContainer_descriptionContainer_descriptions">
          <p className="taihua_mainDataContainer_descriptionContainer_descriptions_1">
            海の前室。
          </p>
          <p className="taihua_mainDataContainer_descriptionContainer_descriptions_2">
            Taihua（タイフア）とは、干潮と満潮の境界に位置する潮間帯を指す言葉である。
          </p>
          <p className="taihua_mainDataContainer_descriptionContainer_descriptions_3">
            私たちはニュージーランド各地の多くの「taihua」を歩き、
            音やノイズ、貝殻、原生林を望む景色や遠くの島々を探し求めた。
            <br />
            <br />
            力強く、しばしば荒れる海沿いを歩き、
            満ちてくる潮の波に身を任せ、
            ムリワイ・ビーチの湿った「taihua」を裸足で走った。
            そこで夕暮れを目撃し、
            ピンク色の空や鏡のような水面を写真に収めた。
            干潮時にしか入れない洞窟の反響を記録し、
            音を帯びた貝殻で覆われた砂浜を調べた……
            <br />
            <br />
            その後、私たちはさらに内陸へと進み、
            川沿いを、裸足のまま歩いた。
            固有種の鳥たちに囲まれながら、原生林へと深く入り込んだ。
            「Taihua」のすべての作品は、
            極めてローカルな場所性（ハイパー・ローカリティ）について語っている。
            そこには、トゥイやピワカワカの熱に浮かされたような旋律から、
            昆虫たちの速いリズム・パターンまで、
            現地で採取された音が封じ込められている。
            人間もまたこの物語の一部であり、
            ただ靴を脱ぐことを忘れなかった。
          </p>
        </div>
      )}
    </div>
  );
}

export default TaihuaDescription;
