import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import AlgorithmCard from './AlgorithmCard.jsx';
import LoginModal from './LoginModal.jsx';

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
// impliment caching here
function Algorithms() {
  /*
  const [algs, setAlgs] = useState(MOCK_ALGS.sequences);

  const nameFormat = (key) => key.replace(/x/g, '×');

  const removeAlg = (puzzle, algName) => {
    setAlgs(prev => ({
      ...prev,
      [puzzle]: prev[puzzle].filter(a => a.name !== algName),
    }));
  };
  */
  const navigate = useNavigate();
  const location = useLocation();

  const [ algs, setAlgs ] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);
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
    if (!user) {
      navigate('/login', { state: { background: location } });
      return;
    }
    const getAlgs = async () => {
      try {
        const res = await fetch('/get-algs', {
          method: 'GET',
          headers: { 'Content-Type' : 'application/json' },
          credentials: 'include'
        });
        const data = await res.json();
        console.log(data);
        if (data.sequences) {
          setAlgs(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    getAlgs();
  }, []);

  if (!user) {
    return (
      <div className='settings-section'>
        <span className="section-title">Saved Algorithms</span>
        <p onClick={() => navigate('/login', { state: { background: location } })} className='login-prompt'>
          Login to edit
        </p>
      </div>
    );
  }

  return (
    <div className="settings-section">
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      <span className="section-title">Saved Algorithms</span>
      <div className="algorithms-menu">
        {algs.sequences && Object.entries(algs.sequences).map(([puzzle, value]) => (
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
