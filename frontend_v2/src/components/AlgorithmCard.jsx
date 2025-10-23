import React from 'react';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import AlgModal from "./AlgModal.jsx";
import { useState } from "react";

function AlgorithmCard({ puzzle, name, sequence, removeAlg }) {
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const dimensions = {
    x: puzzle[0],
    y: puzzle[2],
    z: puzzle[4]
  }

  return (
        <div className='algorithms-card'>
          <div className='alg-card-field'>
            <span className='field-label'>Name</span>
            <span className='field-value name'>{name}</span>
          </div>
          <div className='alg-card-field'>
            <span className='field-label'>Algorithm</span>
            <span className='field-value'>{sequence}</span>
          </div>
          <div className='algorithm-buttons'>
            <button className='alg-card-button' onClick={() => setIsModalOpen(true)}><span>Edit</span></button>
            <button className='alg-card-button' onClick={() => removeAlg(puzzle, name)}><span>Delete</span></button>
            {isModalOpen && <AlgModal mode={"edit"} algName={name} sequence={sequence} puzzleName={puzzle} dimensions={dimensions} setModal={setIsModalOpen} />}
          </div>
        </div>
  );
}

export default AlgorithmCard
