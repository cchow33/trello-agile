import React, { useState } from 'react'
import './ColorBar.css'

const ColorBar = () => {
  const [bgColor, setBgColor] = useState
  
  const colors = [
    "#FF0000", 
    "#FFA500", 
    "#dada07", 
    "#90EE90", 
    "#87cefa", 
    "#dda0dd", 
    "#ffc0cb", 
    "#deb887"
  ]

  // const colorChange = (e) => {
  //   console.log('change color to classname', e.target.value)
  //   setBgColor(e.target.value)
  // }

  return (
    <div className="color-container">
      <div className="color-row">
        {colors.map((color, idx) => {
          return (
            <span>{color}</span>
          )        
        })}

      </div>

      <div className="results-container">
        <span className="results"></span>
      </div>
    
    </div>
  )
}

export default ColorBar