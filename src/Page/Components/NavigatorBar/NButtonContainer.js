import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../modal";
import api from "../../../Api";
const NButtonContainer = () => {
  const navigate = useNavigate();
  const reservationUrl = `${process.env.PUBLIC_URL}/PageImage/community/reservation.svg`;
  const noticeUrl = `${process.env.PUBLIC_URL}/PageImage/community/notice.svg`;
  const communityUrl = `${process.env.PUBLIC_URL}/PageImage/community/community.svg`;
  const homeUrl = `${process.env.PUBLIC_URL}/PageImage/community/home.svg`;
  const myPageUrl = `${process.env.PUBLIC_URL}/PageImage/community/myPage.svg`;

  const [user, setUser] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const modalTitle = "알림";

  const userLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const response = await api.get("/api/user/information", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("로그인 인증 실패:", error);
    }
  };
  useEffect(() => {
    userLogin();
  }, []);
  return (
    <div className="navigation-bar footer_total">
      <button
        className="header-nickname-button"
        onClick={() => {
          if (!user) {
            setModalContent("로그인 후 이용해주세요.");
            setOpenModal(true);
          } else {
            navigate("/reservation");
          }
        }}
      >
        <img src={reservationUrl} alt="reservation" />
      </button>
      <button
        className="header-nickname-button"
        onClick={() => {
          if (!user) {
            setModalContent("로그인 후 이용해주세요.");
            setOpenModal(true);
          } else {
            navigate("/notice");
          }
        }}
      >
        <img src={noticeUrl} alt="notice" />
      </button>
      <button
        className="header-nickname-button"
        onClick={() => {
          if (!user) {
            setModalContent("로그인 후 이용해주세요.");
            setOpenModal(true);
          } else {
            navigate("/");
          }
        }}
      >
        <img src={homeUrl} alt="home" />
      </button>
      {/* <button className='header-nickname-button' onClick={() => navigate('/community')}> */}
      <button
        className="header-nickname-button"
        onClick={() => {
          setModalContent("해당 서비스는 준비 중입니다.");
          setOpenModal(true);
        }}
      >
        <img src={communityUrl} alt="community" />
      </button>
      <button
        className="header-nickname-button"
        onClick={() => {
          if (!user) {
            setModalContent("로그인 후 이용해주세요.");
            setOpenModal(true);
          } else {
            navigate("/my-page");
          }
        }}
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
