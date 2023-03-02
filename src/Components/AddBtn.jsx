import React from "react";

const AddBtn = ({ showPhoneMenu }) => {
  return (
    <div className="Addbutton">
      <p
        onClick={() => {
          showPhoneMenu();
        }}
      >
        +
      </p>
    </div>
  );
};

export default AddBtn;
