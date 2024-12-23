import React, { useState } from 'react';
import '../../CSS/noticeModal.css';
import NoticeCheckModal from './NoticeCheck';

const NoticeSendModal = ({ isOpen, onClose, onConfirm }) => {
    const [showCompletion, setShowCompletion] = useState(false);

    const handleConfirm = () => {
        onConfirm(); 
        setShowCompletion(true);
        setTimeout(() => {
            setShowCompletion(false);
            onClose();
        }, 3000);
    };

    return (
        <>
            {isOpen && !showCompletion && (
                <div className="modal-overlay">
                    <div className="modal-content1">
                        <div>알림장을 보냅니다.</div>
                        <div>더 이상 수정할 수 없습니다.</div>
                        <div className="modal-buttons">
                            <button className='cancel-btn' onClick={onClose}>취소</button>
                            <button className='confirm-btn' onClick={handleConfirm}>수락</button>
                        </div>
                    </div>
                </div>
            )}
            {showCompletion && (
                <NoticeCheckModal 
                    isOpen={showCompletion} 
                    onClose={() => setShowCompletion(false)} 
                />
            )}
        </>
    );
};

export default NoticeSendModal;
