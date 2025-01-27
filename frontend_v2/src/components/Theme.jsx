import React from 'react';
import Toggle from './Toggle.jsx';
import ColorSelect from './ColorSelect.jsx';

function Theme() {
  return (
        <div className='theme-menu'>
            <div className='highlight-selector'> 
              <span>Highlight color:</span>
                <ColorSelect/>
            </div>
            <div className='bg-toggle'>
              <div className='toggle-center'>
                <span>Background toggle:</span>
                <div>
                  <Toggle/>
                </div>
              </div>
            </div>
        </div>
  );
}

export default Theme
