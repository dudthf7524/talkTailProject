import "../../CSS/userEditDeleteModal.css";
import React from "react";

const UserEditDeleteModal = ({ openModal, userInformationId }) => {
  const deleteAccount = () => {};
  return (
    <>
      <div className="back" onClick={openModal}></div>
      <div className="modal_container userEditDeleteModal">
        <img onClick={openModal} src="/PageImage/components/X.svg" alt="" />
        <p className="title">회원탈퇴</p>
        <p className="content">
          탈퇴 시, 가입 후 행했던 행동에 의해
          <br />
          생성된 데이터가 모두 삭제됩니다.
          <br />
          탈퇴하시겠습니까?
        </p>
        <div className="btn_box">
          <div className="btn" onClick={openModal}>
            취소하기
          </div>
          <div className="btn" onClick={deleteAccount}>
            탈퇴하기
          </div>
        </div>
      </div>
    </>
  );
};

export default UserEditDeleteModal;
