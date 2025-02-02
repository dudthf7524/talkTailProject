import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../modal";
const NButtonContainer = () => {
  const navigate = useNavigate();
  const reservationUrl = `${process.env.PUBLIC_URL}/PageImage/community/reservation.svg`;
  const noticeUrl = `${process.env.PUBLIC_URL}/PageImage/community/notice.svg`;
  const communityUrl = `${process.env.PUBLIC_URL}/PageImage/community/community.svg`;
  const homeUrl = `${process.env.PUBLIC_URL}/PageImage/community/home.svg`;
  const myPageUrl = `${process.env.PUBLIC_URL}/PageImage/community/myPage.svg`;

  const [openModal, setOpenModal] = useState(false);
  const modalTitle = "알림";
  const modalContent = "해당 서비스는 준비 중입니다.";

  return (
    <div className="navigation-bar footer_total">
      <button
        className="header-nickname-button"
        onClick={() => navigate("/reservation")}
      >
        <img src={reservationUrl} alt="reservation" />
      </button>
      <button
        className="header-nickname-button"
        onClick={() => navigate("/notice")}
      >
        <img src={noticeUrl} alt="notice" />
      </button>
      <button
        className="header-nickname-button"
        onClick={() => navigate("/home")}
      >
        <img src={homeUrl} alt="home" />
      </button>
      {/* <button className='header-nickname-button' onClick={() => navigate('/community')}> */}
      <button
        className="header-nickname-button"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <img src={communityUrl} alt="community" />
      </button>
      <button
        className="header-nickname-button"
        onClick={() => navigate("/my-Page")}
      >
        <img src={myPageUrl} alt="myPage" />
      </button>
      {openModal ? (
        <Modal
          openModal={() => {
            setOpenModal(false);
          }}
          title={modalTitle}
          content={modalContent}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default NButtonContainer;
