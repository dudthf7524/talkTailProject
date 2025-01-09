import React from 'react';
import '../../CSS/reservationModal.css'

const ReservationModal = ({isOpen}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content1">
                <h2>예약 접수가 완료되었습니다!</h2>
                <p>잠시 후 예약내역 페이지로 이동합니다.</p>
            </div>
        </div>
    );
};

export default ReservationModal;