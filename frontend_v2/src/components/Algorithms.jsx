import { useState } from 'react';
import AlgorithmCard from './AlgorithmCard.jsx';

const MOCK_ALGS = {
  sequences: {
    '3x3x3': [
      { name: 'T-Perm',  seq: "R U R' U' R' F R2 U' R' U' R U R' F'" },
      { name: 'OLL 57',  seq: "R U R' U' M' U R U' r'" },
    ],
    '4x4x4': [
      { name: 'PLL Parity', seq: 'r2 U2 r2 Uw2 r2 Uw2' },
    ],
    '2x2x2': [],
  },
};

// ─── Algorithms ───────────────────────────────────────────────────────────────
function Algorithms() {
  const [algs, setAlgs] = useState(MOCK_ALGS.sequences);

  const nameFormat = (key) => key.replace(/x/g, '×');

  const removeAlg = (puzzle, algName) => {
    setAlgs(prev => ({
      ...prev,
      [puzzle]: prev[puzzle].filter(a => a.name !== algName),
    }));
  };

  return (
    <div className="settings-section">
      <span className="section-title">Saved Algorithms</span>
      <div className="algorithms-menu">
        {Object.entries(algs).map(([puzzle, value]) => (
          <div className="alg-submenu" key={puzzle}>
            <span className="alg-menu-type">{nameFormat(puzzle)}</span>
            <div className="algs">
              {Array.isArray(value) && value.length > 0 ? (
                value.map((alg, index) => (
                  <AlgorithmCard
                    key={`${puzzle}-${index}`}
                    puzzle={puzzle}
                    name={alg.name}
                    sequence={alg.seq}
                    removeAlg={removeAlg}
                  />
                ))
              ) : (
                <p className="no-alg-message">No algorithms yet</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Algorithms;
