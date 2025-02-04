import React, { useState } from 'react';
import '../../CSS/reservationModal.css';

const ReservationRejectModal = ({ isOpen, onClose, onConfirm }) => {
  const [rejectComment, setRejectComment] = useState(''); // 거절 사유 상태 추가

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setRejectComment(e.target.value); // 입력값 업데이트
  };

  const handleConfirmClick = () => {
    onConfirm(rejectComment); // 부모 컴포넌트로 거절 사유 전달
  };

  return (
    <div className="business-modal-overlay">
      <div className="modal-content2">
        <div>거절사유</div>
        <textarea
          className="reject-comment"
          id="rejectcomment"
          name="rejectcomment"
          placeholder="거절 사유를 입력하세요."
          value={rejectComment}
          onChange={handleInputChange}
        />
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>취소</button>
          <button className="send-btn" onClick={handleConfirmClick}>보내기</button>
        </div>
      </div>
    </div>
  );
};

export default ReservationRejectModal;
