import React from 'react';
import '../../CSS/reservationModal.css'

const ReservationRejectModal = ({ isOpen, onClose, onConfirm, actionType }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content2">
          <div>거절사유</div>
          <textarea className='reject-comment' id='rejectcomment' name='rejectcomment' placeholder='거절 사유를 입력하세요.'></textarea>
          <div className="modal-buttons">
            <button className='cancel-btn' onClick={onClose}>취소</button>
            <button className='send-btn' onClick={onConfirm}>보내기</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ReservationRejectModal;