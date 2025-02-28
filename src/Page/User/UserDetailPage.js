import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../Api";
import Popup from "../Components/PopupModal"; // 팝업 컴포넌트

const UserDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
  const fileUrl = `${process.env.PUBLIC_URL}/PageImage/user/file.svg`;
  const rightUrl = `${process.env.PUBLIC_URL}/PageImage/user/right.svg`;
  const [userInformation, setUserInformation] = useState();

  const [userInfo, setUserInfo] = useState({
    name: "",
    nickname: "",
    phoneNumber: "",
    address: "",
    email: "",
  });

  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const updateUserInfo = (address, zonecode) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      address: `${address} (${zonecode})`,
    }));
  };

  useEffect(() => {}, [userInfo]);

  useEffect(() => {
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
        setUserInformation(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // 오류 처리 로직 추가
      }
    };

    fetchUserInformation();
  }, [location.state]);

  const handleNicknameChange = (e) => {
    setUserInfo({ ...userInfo, nickname: e.target.value });
  };

  const handleNicknameBlur = () => {
    setIsEditingNickname(false);
    // API 호출 또는 로컬 스토리지 업데이트 등을 수행할 수 있음
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found.");
      }

      const response = await api.put("/api/user/profile", userInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setPopupMessage("유저 정보가 업데이트되었습니다.");
        setShowPopup(true);
      } else {
        throw new Error("유저 정보 업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      setPopupMessage("유저 정보 업데이트에 실패했습니다.");
      setShowPopup(true);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const navigateToEditAddress = () => {
    navigate("/edit-address", { state: { prevPath: "/edit-user" } });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setPopupMessage("You have been logged out.");
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    if (popupMessage === "You have been logged out.") {
      navigate("/"); // 로그아웃 후 홈 페이지로 이동
    }
  };

  if (!userInformation) {
    return <div>로딩 중 ...</div>;
  }
  return (
    <div lang="ko" className="mid">
      <div className="navigation">
        <button onClick={goBack}>
          <img src={arrowButtonUrl} alt="" />
        </button>
        개인정보수정
        <button onClick={handleSave}>
          <img src={fileUrl} alt="" />
        </button>
      </div>
      <div className="edit-mid">
        <div className="edit-info-container">
          <div className="mypage-info">개인정보 수정</div>
          <div className="edit-info-contents">
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
              {/* {isVerified ? (
                                <button className='verified'>
                                    인증완료
                                </button>
                            ) : (
                                <button className='not-verified'>
                                    인증하기
                                </button>
                            )} */}
            </div>
            <div className="edit-textbox">
              <div className="edit-text">
                <p>주소</p>
                <p>{userInfo.address || "주소를 입력해주세요."}</p>
              </div>
              <img src={rightUrl} alt="" onClick={navigateToEditAddress} />
            </div>
          </div>
        </div>
        <div className="edit-info-container">
          <div className="mypage-info">계정정보</div>
          <div className="edit-info-contents">
            {/* <div className='edit-textbox2'>
                            <p>이메일</p>
                            <p>{userInfo.email}</p>
                            <img src={rightUrl} alt='' />
                        </div>
                        <div className='edit-textbox2'>
                            <p>개인정보 유효기간</p>
                            <button>변경</button>
                        </div> */}
            <div className="edit-textbox2">
              <p onClick={handleLogout}>로그아웃</p>
            </div>
            <div className="edit-textbox">
              <p>탈퇴</p>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <Popup
          closeModal={handleClosePopup}
          isWarning={popupMessage.includes("Failed")}
        >
          {popupMessage}
        </Popup>
      )}
    </div>
  );
};

export default UserDetailPage;
