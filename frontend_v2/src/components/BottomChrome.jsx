import React, { useState, useContext, useRef, useEffect } from 'react';
import { ThemeContext } from './ThemeContext.js';
import { AuthContext } from './AuthContext.jsx';
import { IoChevronDownOutline } from 'react-icons/io5';
import { PiShuffleSimpleLight } from 'react-icons/pi';
import { CiSaveDown2 } from 'react-icons/ci';
import { IoRefreshOutline } from 'react-icons/io5';
import { PiUploadSimpleLight } from 'react-icons/pi';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useNavigate, useLocation } from 'react-router-dom';
import AlgModal from './AlgModal.jsx';
import PuzzleStorage from './PuzzleStorage.js';

import dTwoCube from '../assets/D2x2x2.jpeg';
import dThreeCube from '../assets/D3x3x3.jpeg';
import dFourCube from '../assets/D4x4x4.jpeg';
import dFourByTwoCube from '../assets/D2x4x4.jpeg';
import lTwoCube from '../assets/L2x2x2.jpeg';
import lThreeCube from '../assets/L3x3x3.jpeg';
import lFourCube from '../assets/L4x4x4.jpeg';
import lFourByTwoCube from '../assets/L2x4x4.jpeg';

const PUZZLES = [
  { id: 1, images: { dark: dTwoCube,       light: lTwoCube       }, name: '2×2×2' },
  { id: 2, images: { dark: dFourByTwoCube, light: lFourByTwoCube }, name: '2×4×4' },
  { id: 3, images: { dark: dThreeCube,     light: lThreeCube     }, name: '3×3×3' },
  { id: 4, images: { dark: dFourCube,      light: lFourCube      }, name: '4×4×4' },
];

function BottomChrome({ currentPuzzleName, setCurrentPuzzleName, onShuffle, onLoad, onSave, triggerReset, dimensions }) {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [stripOpen, setStripOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const selectorRef = useRef(null);

  const currentIndex = PUZZLES.findIndex(p => p.name === currentPuzzleName);
  const currentPuzzle = PUZZLES[currentIndex];

  useEffect(() => {
    if (!stripOpen) return;
    const handleOutside = (e) => {
      if (selectorRef.current && !selectorRef.current.contains(e.target)) {
        setStripOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [stripOpen]);

  const handleSelectPuzzle = (puzzle) => {
    setCurrentPuzzleName(puzzle.name);
    localStorage.setItem('currentPuzzle', puzzle.name);
    setStripOpen(false);
  };

  const reset = () => {
    triggerReset();
    PuzzleStorage.reset(currentPuzzleName);
  };

  const handleAddAlg = () => {
    if (!user) {
      navigate('/login', { state: { background: location } });
    } else {
      setModal(true);
    }
  };

  return (
    <div className="bottom-chrome">
      {/* Puzzle selector: pill + expandable strip */}
      <div className="puzzle-selector" ref={selectorRef}>
        <div className={`puzzle-strip-wrapper${stripOpen ? ' open' : ''}`}>
          <div className="puzzle-strip">
            {PUZZLES.map(p => (
              <div
                key={p.id}
                className={`puzzle-strip-card${p.name === currentPuzzleName ? ' active' : ''}`}
                onClick={() => handleSelectPuzzle(p)}
              >
                <img
                  src={theme === 'dark' ? p.images.dark : p.images.light}
                  alt={p.name}
                />
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="puzzle-selector-row">
          <button className="puzzle-pill" onClick={() => setStripOpen(o => !o)}>
            <img
              className="puzzle-pill-img"
              src={theme === 'dark' ? currentPuzzle?.images.dark : currentPuzzle?.images.light}
              alt={currentPuzzleName}
            />
            <span className="puzzle-pill-name">{currentPuzzleName}</span>
            <IoChevronDownOutline className={`puzzle-pill-chevron${stripOpen ? ' open' : ''}`} />
          </button>
          <div className="puzzle-selector-dots">
            {PUZZLES.map((p, i) => (
              <span key={p.id} className={`puzzle-dot${i === currentIndex ? ' active' : ''}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Command bar — same 5 buttons as PuzzleCommands */}
      <div id="puzzle-commands" className="puzzle-commands">
        <IoRefreshOutline onClick={reset} />
        <PiShuffleSimpleLight onClick={onShuffle} />
        <CiSaveDown2 onClick={onSave} />
        <PiUploadSimpleLight onClick={onLoad} />
        <IoIosAddCircleOutline onClick={handleAddAlg} />
        {modal && (
          <AlgModal
            mode="create"
            oldAlgName={null}
            oldSequence={[]}
            puzzleName={currentPuzzleName}
            dimensions={dimensions}
            setModal={setModal}
          />
        )}
      </div>
    </div>
  );
}

export default BottomChrome;
