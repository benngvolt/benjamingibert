import "./QuoteBox.scss";
import React, { useEffect, useRef } from "react";
// import { Reveal } from "../Reveal/Reveal";


function QuoteBox({ text, author, color }) {
 

  return (
    <div className="taihua_textBox">
        {/* <Reveal> */}
          <p className={`taihua_textBox_text taihua_textBox_text--${color}`}>{text}</p>
          <p className="taihua_textBox_author">{author}</p>
        {/* </Reveal> */}
      </div>
  );
}

export default QuoteBox;