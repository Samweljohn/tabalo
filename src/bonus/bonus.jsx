
import React, { useState, useEffect, useRef } from 'react';
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import  { Fade}   from 'react-slideshow-image'
import { Zoom } from 'react-slideshow-image';
import './slide.css';


const initialElements = [
  { id: 1, content: '../imageforTabalo/vanila1.png' },
  { id: 2, content: '../imageforTabalo/farm1.png' },
  { id: 3, content: '../imageforTabalo/farm2.png' },
  { id: 4, content: '../imageforTabalo/kondoo.jpg' },
  { id: 5, content: '../imageforTabalo/sungula.jpg' },

];
const spanStyle = {
  padding: '20px',
  background: '#efefef',
  color: '#000000'
}

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '750px'
}

const Bonus_slide = () => {




    return (
      <div className="slide-container">
         <Fade>
        
         {initialElements.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage .content})` }}>
              
              </div>
            </div>
          ))} 
       </Fade>
      </div>
    )
  
};

export default Bonus_slide;
