import React from "react";

const Modal = ({ children, closeModal, isWarning, cancelText, confirmText, onCancel, onConfirm }) => {

    const handleCancel = () => {
        if (onCancel) onCancel();
        closeModal();
    };

    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        closeModal();
    };

    return (
        <div className="modal1">
            <div className="modal-content">
                <div className="modal-body">
                    <h1>{children}</h1>
                </div>
                <div className="modal-footer">
                    <button className='modal-cancel-button' onClick={handleCancel}>{cancelText}</button>
                    <button className={`modal-confirm-button ${isWarning ? 'w' : 'n'}`} onClick={handleConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;