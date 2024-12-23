import React, { useEffect } from 'react';
import '../../CSS/reservationModal.css';

const NoticeCheckModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content3">
                <div>전송 완료.</div>
            </div>
        </div>
    );
};

export default NoticeCheckModal;
