import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api";
import "../../CSS/autoComplete.css";
const Confirm = () => {
  const navigate = useNavigate();
  const petImgUrl = `${process.env.PUBLIC_URL}/PageImage/pet/pet_img2.png`;
  const [userInformation, setUserInformation] = useState();

  useEffect(() => {
    fetchUserInformation();
  }, []);

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
      console.log("response.data");
      console.log(response.data.user);
      console.log("response.data");
      if (!response.data.user) {
        navigate("/user/information");
      } else {
        setUserInformation(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // 오류 처리 로직 추가
    }
  };

  if (!userInformation) {
    return <div>로딩 중...</div>;
  } else {
    return (
      <div lang="ko" className="loginPage_total">
        <div className="mid">
          <div className="navigation">
            <div></div>
            로그인 성공
            <div></div>
          </div>
          <div className="review-mid">
            <div className="confirm" lang="ko">
              <h1>로그인 성공!</h1>
              <img src={petImgUrl} alt="" />
              <p>{userInformation.user_name}님 로그인이 완료되었습니다.</p>
            </div>
          </div>
        </div>
        <div className="Nbutton2">
          <div className="Nbutton2-1" onClick={() => navigate("/user/edit")}>
            수정하기
          </div>
          <div className="Nbutton2-2" onClick={() => navigate("/home")}>
            홈으로
          </div>
        </div>
      </div>
    );
  }
};

export default Confirm;
