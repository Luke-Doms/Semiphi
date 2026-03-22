import { useState } from "react";

export default function AlgModal({ mode, oldAlgName, oldSequence, puzzleName, dimensions, setModal }) {
  const move_options = { R: [], L: [], U: [], D: [], F: [], B: [] };
  const [moves, setMoves] = useState(oldSequence ?? []);
  const [inverse, setInverse] = useState(false);
  const [algName, setAlgName] = useState(oldAlgName);
  const [nameError, setNameError] = useState(false);

  const addMove = (move) => {
    if (move === "X") {
      setMoves(moves.slice(0, -1));
    } else {
      const notation = inverse ? `${move}'` : move;
      setMoves([...moves, notation]);
    }
  };

  for (var i = 0; i < Math.floor(dimensions.x / 2); i++) {
    move_options.F.push(i === 0 ? 'F' : `${i + 1}F`);
    move_options.B.push(i === 0 ? 'B' : `${i + 1}B`);
  }
  for (var j = 0; j < Math.floor(dimensions.y / 2); j++) {
    move_options.R.push(j === 0 ? 'R' : `${j + 1}R`);
    move_options.L.push(j === 0 ? 'L' : `${j + 1}L`);
  }
  for (var k = 0; k < Math.floor(dimensions.z / 2); k++) {
    move_options.U.push(k === 0 ? 'U' : `${k + 1}U`);
    move_options.D.push(k === 0 ? 'D' : `${k + 1}D`);
  }

  const handleSubmit = async () => {
    if (!algName || algName.trim() === '') {
      setNameError(true);
      setTimeout(() => setNameError(false), 300);
      return;
    }
    if (moves.length === 0) return;

    const endpoint = mode === 'create' ? '/create-alg' : '/update-alg';
    const algorithm = mode === 'create'
      ? { puzzleName, algName, moves }
      : { puzzleName, oldAlgName, algName, moves };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(algorithm),
        credentials: 'include'
      });
      if (res.ok) {
        console.log('helloooo');
        setModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="alg-popup-header">Enter Algorithm</span>
        <input
          type="text"
          placeholder="Algorithm name"
          value={algName}
          onChange={(e) => { setAlgName(e.target.value); setNameError(false); }}
          className={`alg-name ${nameError ? 'shake' : ''}`}
        />
        <div className="preview">
          {moves.length === 0 ? (
            <span className="placeholder">No moves yet</span>
          ) : (
            moves.join(" ")
          )}
        </div>
        <div className="move-buttons">
          {Object.keys(move_options).map((key) => (
            <div className="move-buttons-column" key={key}>
              {move_options[key].map((move) => (
                <button key={move} onClick={() => addMove(move)}>
                  {move}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="inverse-toggle">
          <button onClick={() => addMove('X')}>
            Delete
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
        <div className="action-buttons">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
