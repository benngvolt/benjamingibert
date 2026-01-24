
import "./QuoteBox.scss";
import React, { useEffect, useRef } from "react";


function QuoteBox({ text, author }) {
 

  return (
    <div className="taihua_textBox">
        <p className="taihua_textBox_text">{text}</p>
        <p className="taihua_textBox_author">{author}</p>
      </div>
  );
}

export default QuoteBox;