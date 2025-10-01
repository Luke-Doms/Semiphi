import React from 'react';
import AlgorithmCard from './AlgorithmCard.jsx';
import { useState, useEffect } from 'react';

function Algorithms() {
  const [ algs, setAlgs ] = useState({});

  const nameFormat = (key) => {
    console.log(key);
    const puzzle = key.replace(/x/g, '×');
    return puzzle;
  }

  useEffect(() => {
    const getAlgs = async () => {
      const res = await fetch('/get-algs', {
        method: 'GET',
        headers: { 'Content-Type' : 'application/json' },
        credentials: 'include'
      });
      const data = await res.json();
      setAlgs(data);
    }
    
    getAlgs();
  }, []);

  return (
        <div className='algorithms-menu'>
          {algs.sequences &&
            Object.entries(algs.sequences).map(([puzzleKey, value]) => (
            <div key={puzzleKey}>
              <span>{nameFormat(puzzleKey)}</span>
                {Array.isArray(value) && value.length > 0 ? (
                  value.map((alg, index) => (
                    <AlgorithmCard key={`${puzzleKey}-${index}`} puzzleKey={puzzleKey} name={alg.name} sequence={alg.seq} />
                  ))
                ) : (
                  <p>No algorithms yet</p>
                )}
            </div>
          ))}
        </div>
  );
}

export default Algorithms
