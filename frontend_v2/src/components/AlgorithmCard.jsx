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
          <div className='name-container'>
            <h1>Name</h1>
            <span>{name}</span>
          </div>
          <div className='algorithm-container'>
            <h1>Algorithm</h1>
            <span>{sequence}</span>
          </div>
          <div className='algorithm-buttons'>
            <FiEdit onClick={() => setIsModalOpen(true)}/>
            <MdDeleteOutline onClick={() => removeAlg(puzzle, name)}/>
            {isModalOpen && <AlgModal mode={"edit"} algName={name} sequence={sequence} puzzleName={puzzle} dimensions={dimensions} setModal={setIsModalOpen} />}
          </div>
        </div>
  );
}

export default AlgorithmCard
