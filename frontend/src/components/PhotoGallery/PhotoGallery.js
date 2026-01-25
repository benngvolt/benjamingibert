import "./PhotoGallery.scss";
import React, { useEffect, useRef } from "react";


function PhotoGallery({ img1, img2, img3, img4, img5 }) {
 

  return (
    <div className="taihua_photoGallery">
        <div className="taihua_photoGallery_row1">
            <img
                
                src={img1}
            />
            <img
                
                src={img2}
            />
        </div>
        <div className="taihua_photoGallery_row2">
            <img
                
                src={img3}
            />
            <img
                
                src={img4}
            />
            <img
                
                src={img5}
            />
        </div>
    </div>
  );
}

export default PhotoGallery;