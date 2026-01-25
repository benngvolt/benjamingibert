import "./QuoteBox.scss";
import React, { useEffect, useRef } from "react";


function QuoteBox({ text, author, color }) {
 

  return (
    <div className="taihua_textBox">
        <p className={`taihua_textBox_text taihua_textBox_text--${color}`}>{text}</p>
        <p className="taihua_textBox_author">{author}</p>
      </div>
  );
}

export default QuoteBox;