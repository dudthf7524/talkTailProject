import React from "react";
import "../../CSS/reservationModal.css";

const ReservationModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay reservationModal_total">
      <div className="modal-content1">
        <p>예약 접수 완료🧡</p>
        <p>잠시 후 예약내역 페이지로 이동합니다!!</p>
      </div>
    </div>
  );
};

export default ReservationModal;
