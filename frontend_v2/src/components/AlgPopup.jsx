import { useState } from "react";

export default function AlgModal({ dimensions }) {
  const move_options = {
    R: [],
    L: [],
    U: [],
    D: [],
    F: [],
    B: [],
  }
  const [moves, setMoves] = useState([]);
  const [inverse, setInverse] = useState(false);
  const [name, setName] = useState("");

  const addMove = (move: string) => {
    if (move == "X") {
        setMoves(moves.slice(0, -1));
    } else {
      const notation = inverse ? `${move}'` : move;
      setMoves([...moves, notation]);
    }
  };

  for (var i=0; i<Math.floor(dimensions.x/2); i++) {
    (move_options.F).push(i == 0 ? 'F' : `${i+1}F`);
    (move_options.B).push(i == 0 ? 'B' : `${i+1}B`);
  }
  for (var j=0; j<Math.floor(dimensions.y/2); j++) {
    (move_options.R).push(j == 0 ? 'R' : `${j+1}R`);
    (move_options.L).push(j == 0 ? 'L' : `${j+1}L`);
  }
  for (var k=0; k<Math.floor(dimensions.z/2); k++) {
    (move_options.U).push(k == 0 ? 'U' : `${k+1}U`);
    (move_options.D).push(k == 0 ? 'D' : `${k+1}D`);
  }

  const handleSubmit = async () => {
    const algorithm = {
      name,
      moves,
    };
    try {
      const res = await fetch('/create-alg', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(algorithm), 
        credentials: 'include'
      });

      const data = await res.json();
      console.log('API response:', data);
    } catch (error) {
      console.log("API response:");
    }
  };

  return (
    <div className="modal-overlay">
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
          {Object.keys(move_options).map((key) => (
            <div className="move-buttons-column">
              {move_options[key].map((move) => (
                <button key={move} onClick={() => addMove(move)}>
                  {move}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Inverse Toggle */}
        <div className="inverse-toggle">
          <button onClick={() => addMove('X')}>
            X
          </button>
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
        </div>
      </div>
    </div>
  );
}
