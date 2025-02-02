import React from "react";
import '../../CSS/components.css';
const AuthorityReauest = ({  text, closeModal, massage}) => {
    const XUrl = `${process.env.PUBLIC_URL}/PageImage/components/X.svg`;

    return (
        <div lang='ko' className="modal1">
            <div className="modal-content2aaa">
                <button className="close-button" onClick={closeModal}>
                    <img src={XUrl} alt="Close" />
                </button>
                <div className="modal-bodyaaa">
                    <h1 >
                        {massage}
                    </h1>
                </div>
                <div className="modal-footer">
                    <p>{text}</p>
                    
                </div>
            </div>
        </div>
    );
};

export default AuthorityReauest;