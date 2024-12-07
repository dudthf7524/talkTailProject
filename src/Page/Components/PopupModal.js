import React from "react";

const Popup = ({ children, text, closeModal, isWarning }) => {
    const XUrl = `${process.env.PUBLIC_URL}/PageImage/components/X.svg`;

    return (
        <div  lang='ko' className="modal1">
            <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
                    <img src={XUrl} alt="Close" />
            </button>
                <div className="modal-body">
                    <h1 className={`modal-text ${isWarning ? 'w' : 'n'}`}>
                        {children}
                    </h1>
                </div>
                <div className="modal-footer">
                    <p>{text}</p>
                </div>
            </div>
        </div>
    );
};

export default Popup;