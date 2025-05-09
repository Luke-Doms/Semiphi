import React from 'react';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

function AlgorithmCard() {
  return (
        <div className='algorithms-card'>
          <div className='algorithm-info'>
            <span>name</span>
            <span>sequence</span>
          </div>
          <div className='algorithm-icons'>
            <FiEdit />
            <MdDeleteOutline />
          </div>
        </div>
  );
}

export default AlgorithmCard
