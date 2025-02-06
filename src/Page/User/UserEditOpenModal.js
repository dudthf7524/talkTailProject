import "../../CSS/userEditOpenModal.css";
import React, { useState } from "react";
import UserEditModal from "../Components/UserEditModal";
import api from "../../Api";
import { useNavigate } from "react-router-dom";
const UserEditOpenModal = ({
  openModal,
  userInforMationData,
  popupMessage,
}) => {
  const navigate = useNavigate();

  const handleEdit = async () => {
    try {
      // 서버로 FormData를 전송
      const response = await api.put("/api/user/edit", userInforMationData, {});

      console.log("Upload successful:", response.data);

      // 성공적으로 업로드된 후 페이지를 이동하거나 추가 작업 수행
      navigate("/user/edit"); // 성공 페이지로 이동
    } catch (error) {
      console.error("Error during upload:", error);
      // 오류 처리
    }
  };
  const [showPopup, setShowPopup] = useState(true);
  const [popup, setPopup] = useState();
  const handleConfirmEdit = () => {
    handleEdit();
    setPopup("내 정보 수정완료");
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);

      window.location.href = "/my-Page";
    }, 2000);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
    if (popup === "You have been logged out.") {
      navigate("/"); // 로그아웃 후 홈 페이지로 이동
    }
  };
  return (
    <>
      <div className="back"></div>
      <div className="modal_container selectedDateModal">
        <img onClick={openModal} src="/PageImage/components/X.svg" alt="" />
        <p className="title">수정</p>
        <p className="content">입력하신 내용으로 수정을 진행하겠습니까?</p>
        <div className="btn_box">
          <div className="btn" onClick={openModal}>
            취소하기
          </div>
          <div className="btn" onClick={handleConfirmEdit}>
            수정하기
          </div>
        </div>
        {showPopup && (
          <UserEditModal
            closeModal={handleClosePopup}
            isWarning={popupMessage.includes("Failed")}
            children={popupMessage}
          ></UserEditModal>
        )}
      </div>
    </>
  );
};

export default UserEditOpenModal;
