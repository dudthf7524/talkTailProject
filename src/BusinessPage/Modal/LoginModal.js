import React from 'react';
import "../../CSS/modal.css";

const LoginModal = ({ openModal, title, content }) => {
    return (
      <div className="modal_container">
        <p className="title">{title}</p>
        <p className="content">{content}</p>
      </div>
    );
  };
  
  export default LoginModal;
  