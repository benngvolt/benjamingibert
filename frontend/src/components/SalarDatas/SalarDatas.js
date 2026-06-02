import "./SalarDatas.scss";
import React from "react";
import { Reveal } from "../Reveal/Reveal";

function SalarDatas({ lang }) {
  return (
    <div className="salar_mainDataContainer_firstContainer">
      {lang === "en" && (
        <div className="salar_mainDataContainer_datas">

          <Reveal>
            <ul>
              <li>01 amanecer</li>
              <li>02 saltscar</li>
              <li>03 texture of shards</li>
              <li>04 revolcadero</li>
              <li>05 chañar</li>
              <li>06 alti plano</li>
              <li>07 stellar</li>
              <li>08 color bug (demo in process)</li>
              <li>09 polychromantic (demo in process)</li>
              <li>10 cachiyuyo (demo in process)</li>
              <li>11 tamarrugo (demo in process)</li>
            </ul>
          </Reveal>
        </div>
      )}

      {lang === "fr" && (
        <div className="salar_mainDataContainer_datas">


          <Reveal>
            <ul>
              <li>01 amanecer</li>
              <li>02 saltscar</li>
              <li>03 texture of shards</li>
              <li>04 revolcadero</li>
              <li>05 chañar</li>
              <li>06 alti plano</li>
              <li>07 stellar</li>
              <li>08 color bug (demo in process)</li>
              <li>09 polychromantic (demo in process)</li>
              <li>10 cachiyuyo (demo in process)</li>
              <li>11 tamarrugo (demo in process)</li>
            </ul>
          </Reveal>
        </div>
      )}

      {lang === "jp" && (
        <div className="salar_mainDataContainer_datas">
          
          <Reveal>
            <ul>
              <li>01 amanecer</li>
              <li>02 saltscar</li>
              <li>03 texture of shards</li>
              <li>04 revolcadero</li>
              <li>05 chañar</li>
              <li>06 alti plano</li>
              <li>07 stellar</li>
              <li>08 color bug (demo in process)</li>
              <li>09 polychromantic (demo in process)</li>
              <li>10 cachiyuyo (demo in process)</li>
              <li>11 tamarrugo (demo in process)</li>
            </ul>
          </Reveal>
        </div>
      )}
    </div>
  );
}

export default SalarDatas;
