import "../../CSS/selectedDateModal.css";
import React from "react";
import { useNavigate } from "react-router-dom";
const PetRegistrationModal = ({ openModal }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="back" onClick={openModal}></div>
      <div className="modal_container selectedDateModal">
        <img onClick={openModal} src="/PageImage/components/X.svg" alt="" />
        <p className="title">등록</p>
        <p className="content">정상적으로 등록되었습니다.</p>
        <div className="btn_box">
          <div
            className="btn"
            onClick={() => {
              navigate("/pet/list");
            }}
          >
            목록보기
          </div>
          <div
            className="btn"
            onClick={() => {
              navigate("/");
            }}
          >
            홈 가기
          </div>
        </div>
      </div>
    </>
  );
};

export default PetRegistrationModal;
