import React from 'react';
import "../../CSS/modal.css";

const DesingerCheckModal = ({ title, content, onClose, onConfirm }) => {
    return (
        <div className='modal-background'>
            <div className="modal_container">
                <p className="title">{title}</p>
                <p className="content">{content}</p>
                <div className="modal-buttons">
                    <button className="cancel-btn" onClick={onClose}>
                        확인
                    </button>
                </div>
            </div>
        </div>

    );
};

export default DesingerCheckModal;
