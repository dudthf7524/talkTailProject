import React from 'react';
import "../../CSS/modal.css";

const LoginModal = ({ title, content }) => {
  return (
    <div className='modal-background'>
      <div className="modal_container">
        <p className="title">{title}</p>
        <p className="content">{content}</p>
      </div>
    </div>

  );
};

export default LoginModal;
