import React, { useState } from "react";
import MyModal from "./index";
 
export default function ModalButton({type,handleAddActivity}) {
  const [showMyModal, setShowMyModal] = useState(false);
 
  const handleOnClose = () => setShowMyModal(false);
  return (
    <div className="bg-blue-400 bg-opacity-30">
          <button
          onClick={() => setShowMyModal(true)}
          className="bg-red-400 text-white px-3 py-2 rounded hover:scale-95 transition text-xl">
            Add Activity
          </button>
      <MyModal onClose={handleOnClose} visible={showMyModal} handleAddActivity={handleAddActivity} type={type}/>
    </div>
  );
}