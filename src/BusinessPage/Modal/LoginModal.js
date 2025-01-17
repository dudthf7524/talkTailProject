import React from 'react';
import '../../CSS/reservationModal.css'

const LoginModal = ({ isOpen, onClose, onConfirm,registerInformation,mainImage,priceImage, actionType }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content1">
          <div></div>
          <div className="modal-buttons">
            <button className='cancel-btn' onClick={onClose}>취소</button>
            <button className='confirm-btn' onClick={onConfirm}>수락</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default LoginModal;