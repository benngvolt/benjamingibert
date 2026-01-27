import "./PhotoGallery.scss";
import React from "react";

function PhotoGallery({ img1, img2, img3, img4, img5 }) {
  return (
    <div className="taihua_photoGallery">
      <div className="taihua_photoGallery_row1">
        <img src={img1} alt="" loading="lazy" decoding="async" />
        <img src={img2} alt="" loading="lazy" decoding="async" />
      </div>

      <div className="taihua_photoGallery_row2">
        <img src={img3} alt="" loading="lazy" decoding="async" />
        <img src={img4} alt="" loading="lazy" decoding="async" />
        <img src={img5} alt="" loading="lazy" decoding="async" />
      </div>
    </div>
  );
}

export default PhotoGallery;
