import React from 'react';
import AlgorithmCard from './AlgorithmCard.jsx';
import { useState, useEffect } from 'react';

function Algorithms() {
  const [ algs, setAlgs ] = useState({});

  const nameFormat = (key) => {
    const puzzle = key.replace(/x/g, '×');
    return puzzle;
  }

  const removeAlg = async (puzzle, algName) => {
    const removedItem = algs.sequences[puzzle].find( i => i.name === algName);
    console.log(removedItem);

    setAlgs(prev => ({
      ...prev,
      sequences: {
        ...prev.sequences,
        [puzzle]: prev.sequences[puzzle].filter(
          (item) => item.name !== algName
        ),
      },
    }));

    try {
      console.log(puzzle, algName);
      const res = await fetch('/delete-alg', {
        method: 'POST', 
        headers: { 'Content-type' : 'application/json' },
        body: JSON.stringify({ puzzle, algName }),
        credentials: 'include'
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log('error');
      setAlgs((prev) => ({
        ...prev, 
        sequences: { 
          ...prev.sequences, 
          [puzzle] : [...prev.sequences[puzzle], removedItem] 
        },
      }));
    }
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
            Object.entries(algs.sequences).map(([puzzle, value]) => (
            <div key={puzzle}>
              <span>{nameFormat(puzzle)}</span>
                {Array.isArray(value) && value.length > 0 ? (
                  value.map((alg, index) => (
                    <AlgorithmCard key={`${puzzle}-${index}`} puzzle={puzzle} name={alg.name} sequence={alg.seq} removeAlg={removeAlg}/>
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
