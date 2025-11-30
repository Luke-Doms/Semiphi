import { React, useContext } from 'react';
import AlgorithmCard from './AlgorithmCard.jsx';
import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext.jsx';

function Algorithms() {
  const [ algs, setAlgs ] = useState({});
  const { user } = useContext(AuthContext);

  const nameFormat = (key) => {
    const puzzle = key.replace(/x/g, '×');
    return puzzle;
  }

  const removeAlg = async (puzzle, algName) => {
    const removedItem = algs.sequences[puzzle].find( i => i.name === algName);

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
      const res = await fetch('/delete-alg', {
        method: 'POST', 
        headers: { 'Content-type' : 'application/json' },
        body: JSON.stringify({ puzzle, algName }),
        credentials: 'include'
      });
      const data = await res.json();
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
      try {
        const res = await fetch('/get-algs', {
          method: 'GET',
          headers: { 'Content-Type' : 'application/json' },
          credentials: 'include'
        });
        const data = await res.json();
        if (data.sequences) {
          setAlgs(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    getAlgs();
  }, []);

  return (
        <div className='algorithms-menu'>
          { user ? (
          algs.sequences &&
            Object.entries(algs.sequences).map(([puzzle, value]) => (
            <div className='alg-submenu' key={puzzle}>
              <span className='alg-menu-type'>{nameFormat(puzzle)}</span>
                <div className='algs'>
                  {Array.isArray(value) && value.length > 0 ? (
                    value.map((alg, index) => (
                      <AlgorithmCard key={`${puzzle}-${index}`} puzzle={puzzle} name={alg.name} sequence={alg.seq} removeAlg={removeAlg}/>
                    ))
                  ) : (
                    <p className='no-alg-message'>No algorithms yet</p>
                  )}
                </div>
            </div>
          ))
          ) : ( <span> empty :( </span> )
          }
        </div>
  );
}

export default Algorithms
