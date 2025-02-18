import "./CSS/modal.css";
import "./CSS/modalReject.css";

const ModalReject = ({ openModal }) => {
  return (
    <>
      <div className="back" onClick={openModal}></div>
      <div className="modal_container modal_reject">
        <img onClick={openModal} src="/PageImage/components/X.svg" alt="" />
        <p className="title">권한거절</p>
        <p className="content">
          단골 승인이 되지 않아 가게 접근 권한이 없습니다. <br />
          해당 가게에 전화 문의 바랍니다."
        </p>
        <div className="btn" onClick={openModal}>
          확인
        </div>
      </div>
    </>
  );
};

export default ModalReject;
