import React, { useState } from "react";
import MyModal from "./index";
 
export default function ModalButton({type}) {
  const [showMyModal, setShowMyModal] = useState(false);
 
  const handleOnClose = () => setShowMyModal(false);
  return (
    <div className="bg-blue-400 bg-opacity-30">
    {/* //   <div className="max-w-3xl mx-auto">
    //     <div className="text-center py-3"> */}
          <button
          onClick={() => setShowMyModal(true)}
          className="bg-red-400 text-white px-3 py-2 rounded hover:scale-95 transition text-xl">
            Add Activity
          </button>
    {/* //     </div>
    //     <p className="text-lg">
         
    //     </p>
    //   </div> */}
      <MyModal onClose={handleOnClose} visible={showMyModal} type={type}/>
    </div>
  );
}