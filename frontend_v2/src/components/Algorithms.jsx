import React from 'react';
import AlgorithmCard from './AlgorithmCard.jsx';

function Algorithms() {
  return (
        <div className='algorithms-menu'>
            <span>2x2x2</span>
            <div className='algorithm-list'>
              <AlgorithmCard />
              <AlgorithmCard />
              <AlgorithmCard />
            </div>
            <span>2x4x4</span>
            <span>3x3x3</span>
            <span>4x4x4</span>
        </div>
  );
}

export default Algorithms
