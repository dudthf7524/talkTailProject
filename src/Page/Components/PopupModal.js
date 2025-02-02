import React from "react";

const Popup = ({  openModal, title, content }) => {
    const XUrl = `${process.env.PUBLIC_URL}/PageImage/components/X.svg`;

    return (
        <div className="modal_container">
          <p className="title">{title}</p>
          <p className="content">{content}</p>
        </div>
      );
};

export default Popup;