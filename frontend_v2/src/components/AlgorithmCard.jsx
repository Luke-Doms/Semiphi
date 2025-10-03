import React from 'react';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import AlgModal from "./AlgModal.jsx";
import { useState } from "react";

function AlgorithmCard({ puzzle, name, sequence, removeAlg }) {
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  return (
        <div className='algorithms-card'>
          <div className='algorithm-info'>
            <span>{name}</span>
            <span>{sequence}</span>
          </div>
          <div className='algorithm-icons'>
            <FiEdit onClick={() => setIsModalOpen(true)}/>
            <MdDeleteOutline onClick={() => removeAlg(puzzle, name)}/>
            {isModalOpen && <AlgModal setModal={setIsModalOpen} />}
          </div>
        </div>
  );
}

export default AlgorithmCard
