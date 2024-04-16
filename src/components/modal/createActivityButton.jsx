import React, { useState } from "react";
import MyCreateModal from "./createMyModel";

 
export default function CreateActivityButton({handleRefresh}) {
  const [showMyModal, setShowMyModal] = useState(false);
 
 
  return (
    <div className="bg-blue-400 bg-opacity-30 mr-4" onClick={(e) => e.stopPropagation()}>
          <button
          className="bg-blue-400 text-white px-2 py-2 rounded hover:scale-95 transition text-sm"
          onClick={()=>setShowMyModal(true)}
          >
            Create Activity
          </button>
          {showMyModal?<MyCreateModal setShowMyModal={setShowMyModal} handleRefresh={handleRefresh}/>:null}
     
    </div>
  );
}