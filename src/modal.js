import "./CSS/modal.css";

const Modal = ({ openModal, title, content }) => {
  return (
    <div className="modal_container">
      <img onClick={openModal} src="/PageImage/components/X.svg" alt="" />
      <p className="title">{title}</p>
      <p className="content">{content}</p>
      <div className="btn" onClick={openModal}>
        확인
      </div>
    </div>
  );
};

export default Modal;
