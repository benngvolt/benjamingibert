import './ImageBox.scss'
import React, { useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faXmark} from '@fortawesome/free-solid-svg-icons'

 
function ImageBox({imageUrl, setHandleDisplayImage}) {
console.log(imageUrl)
    return  (      
        <div className='imageBox' >
            <div className="imageBox_imageWrapper">
            {imageUrl && (
                <img src={imageUrl} onClick={(e) => e.stopPropagation()} />
            )}
                <div onClick={() => setHandleDisplayImage(false)}>
                    <p>X</p>
                </div>
            </div>
        </div>
    )
}

export default ImageBox