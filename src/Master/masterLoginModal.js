import React from "react";
import "../CSS/modal.css";

const MasterLoginModal = ({ title, content }) => {
  return (
    <div className="modal-background">
      <div className="modal_container">
        <p className="title">{title}</p>
        <p className="content">{content}</p>
      </div>
    </div>
  );
};

export default MasterLoginModal;
