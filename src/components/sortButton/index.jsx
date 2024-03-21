import React from "react";
import UpVector from "../../assets/icons/upVector";

function SortButton({selected, handleClick}) {
  return (
    <button onClick={handleClick}>
      <div>
        <UpVector isSelected={selected === 'asc' ? true : false}/>
      </div>
      <div className={`rotate-180 -mt-[2px] `}>
        <UpVector isSelected={selected === 'desc' ? true : false}/>
      </div>
    </button>
  );
}

export default SortButton;
