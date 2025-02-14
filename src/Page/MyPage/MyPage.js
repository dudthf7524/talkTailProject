import React, { useState, useEffect } from "react";
import "../..//CSS/myPage.css";
import NButtonContainer from "../Components/NavigatorBar/NButtonContainer";
import { useNavigate } from "react-router-dom";
import api from "../../Api";
import Popup from "../Components/PopupModal";

const MyPage = () => {
  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
  const petPageUrl = `${process.env.PUBLIC_URL}/PageImage/user/petPage.svg`;
  const noteUrl = `${process.env.PUBLIC_URL}/PageImage/user/note.svg`;
  const calendarUrl = `${process.env.PUBLIC_URL}/PageImage/user/calendar.svg`;
  const heartUrl = `${process.env.PUBLIC_URL}/PageImage/list/heart.svg`;
  const [nickname, setNickname] = useState("");
  const [newNickname, setNewNickname] = useState("");
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [userInformation, setUserInformation] = useState();

  const modalTitle = "로그아웃 완료";
  const modalContent = "잠시 후 로그인 페이지로 이동합니다.";
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to home if no token is found
      return;
    }
    fetchUserInformation();
  }, [navigate]);

  const fetchNickname = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found.");
      }

      const response = await api.get("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;
      console.log(userData);
      setNickname(userData.user_nickname);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // 오류 처리 로직 추가
    }
  };

  const fetchUserInformation = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found.");
      }

      const response = await api.get("/api/user/information", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInformation(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // 오류 처리 로직 추가
    }
  };

  const saveNickname = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found.");
      }

      const response = await api.put(
        "/api/user/profile",
        {
          user_nickname: newNickname,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUserData = response.data;
      setNickname(updatedUserData.user_nickname);
      setNewNickname("");
      setIsEditingNickname(false);
    } catch (error) {
      console.error("Error updating nickname:", error);
      // 오류 처리 로직 추가
    }
  };

  const cancelEditingNickname = () => {
    setNewNickname("");
    setIsEditingNickname(false);
  };

  const goBack = () => {
    navigate("/"); // 뒤로 가기
  };
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setPopupMessage("You have been logged out.");
    setShowPopup(true);
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  if (!userInformation) {
    return <div>로딩 중 ...</div>;
  }
  return (
    <div lang="ko" className="mypage_total">
      <div className="mid">
        <div className="navigation">
          <button>
            <img src={arrowButtonUrl} alt="" onClick={goBack} />
          </button>
          마이페이지
          <div></div>
        </div>
        <div className="review-mid">
          <div className="mypage-button-container">
            <div className="mypage-button">
              <div className="event-button">
                <button onClick={() => navigate("/pet/list")}>
                  <img src={petPageUrl} alt="" />
                </button>
                <div className="event-button-text">마이펫</div>
              </div>
              <div className="event-button">
                <button onClick={() => navigate("/notice")}>
                  <img src={noteUrl} alt="" />
                </button>
                <div className="event-button-text">알림장</div>
              </div>
              <div className="event-button">
                <button onClick={() => navigate("/authority/management")}>
                  <img src={noteUrl} alt="" />
                </button>
                <div className="event-button-text">승인내역</div>
              </div>
              <div className="event-button">
                <button onClick={() => navigate("/reservation")}>
                  <img src={calendarUrl} alt="" />
                </button>
                <div className="event-button-text">예약내역</div>
              </div>
              {/* <div className='event-button'>
                <button onClick={() => navigate('/saved')}>
                  <img src={heartUrl} alt='' />
                </button>
                <div className='event-button-text'>찜한내역</div>
              </div> */}
            </div>
          </div>
          <div className="mypage-info-container">
            <div className="mypage-info">내정보</div>
            <div className="mypage-info-contents">
              <div className="edit-textbox">
                <div className="edit-text">
                  <p>이름</p>
                  <p>{userInformation.user_name}</p>
                </div>
              </div>
              <div className="edit-textbox">
                <div className="edit-text">
                  <p>전화번호</p>
                  <p>{userInformation.user_phone}</p>
                </div>
              </div>
              <div className="edit-textbox changeBtn">
                <div className="edit-text">
                  <div className="mypage-nickname">
                    <p onClick={() => navigate("/user/edit")}>수정</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="support_container">
            <p>고객센터</p>
            <p>070-4571-7580 | creamoff2021@creamoff.co.kr</p>
          </div>
          <div className="mypage-info-container">
            {/* <div className="mypage-info">계정정보</div> */}
            <div className="mypage-info-contents">
              <div className="edit-textbox">
                <div className="edit-text logout_box">
                  <p
                    onClick={handleLogout}
                    style={{ cursor: "pointer", fontWeight: 600 }}
                  >
                    로그아웃
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showPopup ? (
          <Popup
            openModal={() => {}}
            title={modalTitle}
            content={modalContent}
          />
        ) : (
          ""
        )}
      </div>
      <NButtonContainer />
    </div>
  );
};

export default MyPage;
