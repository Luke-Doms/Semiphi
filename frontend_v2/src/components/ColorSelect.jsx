import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext.js';

function ColorSelect() {
  const highlight_colors = [
    {
      id: 'purple',
      color: 'purple'
    },
    {
      id: 'magenta',
      color: 'rgb(234,0,217)'
    },
    {
      id: 'pink', 
      color: 'rgb(255, 225, 225)'
    },
    {
      id: 'blue',
      color: 'rgb(80, 198, 240)'
    },
    {
      id: 'green',
      color: 'green'
    },
    {
      id: 'orange', 
      color: 'orange'
    }
  ];

  const { highlight, setHighlight } = useContext(ThemeContext);

  const selectColor = (id) => {
    setHighlight(id);
  }

  return (
        <div className='color-palette'>
          {highlight_colors.map((color) => (
            <div onClick={() => selectColor(color.id)} className='color-choices' style={{backgroundColor: color.color}}>
            </div>
          ))}
        </div>
  );
}

export default ColorSelect
