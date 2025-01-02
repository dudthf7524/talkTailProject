import React from 'react';
import '../../CSS/reservationModal.css'

const ReservationAcceptModal = ({ isOpen, onClose, onConfirm,registerInformation,mainImage,priceImage, actionType }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content1">
          <div>이 예약을 확정합니다.</div>
          <div className="modal-buttons">
            <button className='cancel-btn' onClick={onClose}>취소</button>
            <button className='confirm-btn' onClick={onConfirm}>수락</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ReservationAcceptModal;