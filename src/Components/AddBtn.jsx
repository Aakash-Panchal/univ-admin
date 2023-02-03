import React from "react";

const AddBtn = ({ setShowEditMenu }) => {
  return (
    <div className="Addbutton">
      <p
        onClick={() => {
          setShowEditMenu(true);
        }}
      >
        +
      </p>
    </div>
  );
};

export default AddBtn;
