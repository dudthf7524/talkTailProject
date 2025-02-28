import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MasterJoin() {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const [checkMessage, setCheckMessage] = useState(""); // 메시지 상태
  const [isIdValid, setIsIdValid] = useState(false); // 아이디 유효성 상태
  const [formData, setFormData] = useState({
    login_id: "",
    login_password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (!isIdValid) {
      alert("아이디를 확인해주세요.");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/api/businesses`, formData);
      navigate("/business/login");
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  async function checkLogin() {
    if (!formData.login_id.trim()) {
      // 아이디 입력이 비어 있는지 확인
      setCheckMessage("아이디를 입력해주세요.");
      setIsIdValid(false);
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/api/business/checkLogin`, {
        login_id: formData.login_id,
      });

      if (response.data === "1") {
        setCheckMessage("사용중인 아이디입니다.");
        setIsIdValid(false);
      } else if (response.data === "0") {
        setCheckMessage("사용 가능한 아이디입니다.");
        setIsIdValid(true);
      }
    } catch (error) {
      console.error("Error during login check:", error);
      setCheckMessage("오류가 발생했습니다. 다시 시도해주세요.");
      setIsIdValid(false);
    }
  }

  return (
    <div className="mid" lang="ko">
      <div className="navigation">
        <button>
          <img
            src={arrowButtonUrl}
            alt=""
            onClick={() => navigate("/admin-menu")}
          />
        </button>
        회원가입
        <div
          style={{ cursor: "pointer" }}
          onClick={handleSave}
          disabled={!isIdValid}
        >
          저장
        </div>
      </div>
      <div className="main-mid">
        회원가입
        <div className="input-container-id">
          <p>아이디</p>
          <input
            type="text"
            name="login_id"
            value={formData.login_id}
            onChange={(e) => {
              handleInputChange(e);
              setCheckMessage(""); // 메시지 초기화
              setIsIdValid(false); // 상태 초기화
            }}
            placeholder="아이디를 입력해 주세요"
          />
          <button className="checkLogin" onClick={checkLogin}>
            아이디 중복확인
          </button>
          {checkMessage && (
            <p style={{ color: isIdValid ? "green" : "red", marginTop: "5px" }}>
              {checkMessage}
            </p>
          )}
        </div>
        <div className="input-container">
          <p>비밀번호</p>
          <input
            type="password"
            name="login_password"
            value={formData.login_password}
            onChange={handleInputChange}
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
      </div>
    </div>
  );
}

export default MasterJoin;
