import "./TaihuaDescription.scss";
import React, { useEffect, useRef } from "react";


function TaihuaDescription({ lang }) {
 

  return (
        
        <div >
            {lang === "en" &&
            <div className='taihua_mainDataContainer_descriptionContainer_descriptions'>
                <p className='taihua_mainDataContainer_descriptionContainer_descriptions_1'>
                    Antechamber of the ocean.
                </p>
                <p className='taihua_mainDataContainer_descriptionContainer_descriptions_2'>
                    Taihua refers to the intertidal zone, area between the limits of
                    low and high-tide.
                </p>
                <p className='taihua_mainDataContainer_descriptionContainer_descriptions_3'>
                    We strode along many 'taihuas' in new Zealand, searching for sounds
                    and noises, shells, outlooks to native forests or distant islands.
                    <br />
                    <br />
                    We strolled by a mighty and often restless ocean. we surfed on
                    rising tide waves and ran barefoot in the wet 'taihuas' of the
                    Muriwai beach. We witnessed dusk there, and we photographed pink
                    skies, the surface of the water as a mirror. We captured the echo
                    of caves we could only enter at low-tide. We examined sand covered
                    in shells that chimed like winds, and arranged them by note,
                    depending on their size.
                    <br />
                    <br />
                    Then, we went deeper in the land, along the streams, still
                    barefoot. We threw ourselves into native forests, surrounded by
                    chatty endemic birds. All pieces of 'taihua' are about hyper
                    locality. they hold sounds harvested on site, from the crazy
                    melodic phrases of the tui or the piwakawaka, to the upbeat
                    rhythmical patterns of the insects. Humans also have a role in
                    this story, they simply made sure they took off their shoes.
                </p>
            </div>
            }

            {lang === "fr" &&
            <div className='taihua_mainDataContainer_descriptionContainer_descriptions'>
                <p className='taihua_mainDataContainer_descriptionContainer_descriptions_1'>
                Antichambre de l’océan.
                </p>
                <p className='taihua_mainDataContainer_descriptionContainer_descriptions_2'>
                Taihua désigne la zone intertidale, l’espace situé entre les limites
                de la marée basse et de la marée haute.
                </p>
                <p className='taihua_mainDataContainer_descriptionContainer_descriptions_3'>
                Nous avons arpenté de nombreux 'taihuas' en Nouvelle-Zélande, à la
                recherche de sons et de bruits, de coquillages, de points de vue sur
                les forêts natives ou sur des îles lointaines.
                <br />
                <br />
                Nous longions un océan puissant et souvent agité. Nous surfions sur
                les vagues de la marée montante et courions pieds nus sur le 'taihua'
                humide de la plage de Muriwai. Nous y avons observé le crépuscule,
                photographié des ciels roses, la surface de l’eau comme un miroir.
                Nous avons capturé l’écho de grottes accessibles uniquement à marée
                basse. Nous avons étudié le sable couvert de coquillages qui tintaient
                comme le vent, et les avons arrangés par note selon leur taille.
                <br />
                <br />
                Puis nous sommes allés plus loin dans les terres, le long des
                rivières, toujours pieds nus. Nous nous sommes immergés dans les
                forêts natives, entourés d’oiseaux endémiques loquaces. Toutes les
                pièces de 'taihua' parlent d’hyper localité : elles contiennent des
                sons récoltés sur place, des phrases mélodiques frénétiques du tui ou
                du piwakawaka aux motifs rythmiques rapides des insectes. Les humains
                ont aussi leur rôle dans cette histoire : ils ont simplement pris soin
                d’enlever leurs chaussures.
                </p>
            </div>
            }

            {lang === "jp" &&
            <div className='taihua_mainDataContainer_descriptionContainer_descriptions'>
                <p className='taihua_mainDataContainer_descriptionContainer_descriptions_1'>
                海の前室。
                </p>
                <p className='taihua_mainDataContainer_descriptionContainer_descriptions_2'>
                Taihua（タイフア）とは、干潮と満潮の境界に位置する
                潮間帯を指す言葉である。
                </p>
                <p className='taihua_mainDataContainer_descriptionContainer_descriptions_3'>
                私たちはニュージーランド各地の多くの「taihua」を歩き、
                音やノイズ、貝殻、原生林を望む景色や遠くの島々を探し求めた。
                <br />
                <br />
                力強く、しばしば荒れる海沿いを歩き、満ちてくる潮の波に
                身を任せ、ムリワイ・ビーチの湿った「taihua」を裸足で走った。
                そこで夕暮れを目撃し、ピンク色の空や鏡のような水面を
                写真に収めた。干潮時にしか入れない洞窟の反響を記録し、
                風のように鳴る貝殻で覆われた砂浜を調べ、
                大きさによって音程ごとに並べた。
                <br />
                <br />
                その後、私たちは内陸へと進み、裸足のまま小川沿いを歩き、
                おしゃべりな固有種の鳥たちに囲まれた原生林へと分け入った。
                「taihua」のすべての作品は、極めてローカルな場所性について
                語っている。そこには、トゥイやピワカワカの奔放な旋律から、
                昆虫たちの躍動的なリズムまで、現地で採取された音が
                封じ込められている。人間もまた、この物語の一部であり、
                ただ靴を脱ぐことを忘れなかった。
                </p>
            </div>
            }

        </div>
  );
}

export default TaihuaDescription;