import React from 'react';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import AlgModal from "./AlgModal.jsx";
import { useState } from "react";

function AlgorithmCard({ puzzleKey, name, sequence }) {
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const handleClose = async () => {
    console.log(puzzleKey);
    const res = await fetch('/delete-alg', {
      method: 'POST', 
      headers: { 'Content-type' : 'application/json' },
      body: JSON.stringify({ puzzleKey, name }),
      credentials: 'include'
    });
    const data = await res.json();
    console.log(data);
  }

  return (
        <div className='algorithms-card'>
          <div className='algorithm-info'>
            <span>{name}</span>
            <span>{sequence}</span>
          </div>
          <div className='algorithm-icons'>
            <FiEdit onClick={() => setIsModalOpen(true)}/>
            <MdDeleteOutline onClick={() => handleClose()}/>
            {isModalOpen && <AlgModal setModal={setIsModalOpen} />}
          </div>
        </div>
  );
}

export default AlgorithmCard
