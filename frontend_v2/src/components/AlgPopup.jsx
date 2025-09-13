import { useState } from "react";

const MOVES = ["R", "L", "U", "D", "F", "B", "X"];

export default function AlgModal({ onClose }) {
  const [moves, setMoves] = useState([]);
  const [inverse, setInverse] = useState(false);
  const [name, setName] = useState("");

  const addMove = (move: string) => {
    console.log(moves);
    if (move == "X") {
      if (moves[-1] == "'") {
        setMoves(moves.slice(0, -2));
      } else {
        setMoves(moves.slice(0, -1));
      }
    } else {
      const notation = inverse ? `${move}'` : move;
      setMoves([...moves, notation]);
    }
  };

  const handleSubmit = () => {
    const algorithm = {
      name,
      moves,
    };
    console.log("Algorithm submitted:", algorithm);
    onClose(); // or keep it open if you want
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="alg-popup-header">Enter Algorithm</span>

        {/* Name Field */}
        <input
          type="text"
          placeholder="Algorithm name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="alg-name"
        />

        {/* Move Preview */}
        <div className="preview">
          {moves.length === 0 ? (
            <span className="placeholder">No moves yet</span>
          ) : (
            moves.join(" ")
          )}
        </div>

        {/* Move Buttons */}
        <div className="move-buttons">
          {MOVES.map((move) => (
            <button key={move} onClick={() => addMove(move)}>
              {move}
            </button>
          ))}
        </div>

        {/* Inverse Toggle */}
        <div className="inverse-toggle">
          <label>
            <input
              type="checkbox"
              checked={inverse}
              onChange={(e) => setInverse(e.target.checked)}
            />
            <span>Inverse (′)</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
