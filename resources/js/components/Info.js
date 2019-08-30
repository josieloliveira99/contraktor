import React, { Component } from 'react';

const Info = ({style,text})=>{
return(
  <div style={{style}}className="info">
    <p className="info__text">{text}</p>
  </div>
)}

export default Info

