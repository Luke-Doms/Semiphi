import React from 'react';
import AlgorithmCard from './AlgorithmCard.jsx';
import { useState, useEffect } from 'react';

function Algorithms() {
  const [ algs, setAlgs ] = useState({});

  const nameFormat = (key) => {
    const puzzle = key.replace(/×/g, 'x');
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

  useEffect(() => {
    console.log("these algs", algs);
  }, [algs]);

  return (
        <div className='algorithms-menu'>
          {Object.entries(algs.sequences).map(([key, value]) => (
            <div key={key}>
              <span>{nameFormat(key)}</span>
                {Array.isArray(value) && value.length > 0 ? (
                  value.map((alg, index) => (
                    <AlgorithmCard key={index} alg={alg} />
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
