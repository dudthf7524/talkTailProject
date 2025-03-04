import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../../Api";
import "../../../BusinessCSS/registerStyle.css";
import LoginModal from "../../Modal/LoginModal.js";

function RegisterStyle() {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const [password, setPassword] = useState(null);
  const [passwordError, setPassworError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const modalTitle = "비밀번호 변경 환료";
  const modalContent = "잠시 후 로그인 페이지로 이동합니다.";
  const [formData, setFormData] = useState({
    password: "",
  });

  const [newData, setnewData] = useState({
    new_password: "",
    new_password_check: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setnewData({
      ...newData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      // 서버로 FormData를 전송
      const response = await axios.post(
        `${apiUrl}/api//business/check/password`,
        formData,
        { withCredentials: true }
      );
      if (response.data === "common") {
        navigate("/business/login");
      }
      setPassword(response.data);
    } catch (error) {
      console.error("Error during upload:", error);
      // 오류 처리
    }
  };

  const handleUpdate = async () => {
    if (newData.new_password === newData.new_password_check) {
      try {
        // 서버로 FormData를 전송
        const response = await axios.put(
          `${apiUrl}/api//business/check/password`,
          newData,
          { withCredentials: true }
        );
        if (response.data === "common") {
          navigate("/business/login");
        }
        setOpenModal(true);
        setTimeout(() => {
          logout();
        }, 1000);
      } catch (error) {
        console.error("Error during upload:", error);
        // 오류 처리
      }
    } else {
      setPassworError("비밀번호가 서로 다릅니다.");
      return;
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/business/logout`, {
        withCredentials: true,
      });
      window.location.href = "/business/login";
    } catch (error) {}
  };

  return (
    <div className="mid registerStyle_total changePassword_total" lang="ko">
      <div className="navigation">
        <button>
          <img
            src={arrowButtonUrl}
            alt=""
            onClick={() => navigate("/business/menu")}
          />
        </button>
        비밀번호 변경
        <div></div>
      </div>
      <div className="main-mid">
        <div className="registerStyle">
          <div className="input-container">
            <p>현재 비밀번호</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="현재 비밀번호를 입력해주세요"
            />
          </div>
          {password === 1 ? (
            <>
              <p
                style={{
                  color: "green",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                비밀번호 확인이 완료되었습니다.
              </p>
              <div className="input-container">
                <p>새로운 비밀번호</p>
                <input
                  type="password"
                  name="new_password"
                  value={newData.new_password}
                  onChange={handleUpdateChange}
                  placeholder="새로운 비밀번호를 입력해주세요"
                />
              </div>
              <div className="input-container">
                <p>새로운 비밀번호 확인</p>
                <input
                  type="password"
                  name="new_password_check"
                  value={newData.new_password_check}
                  onChange={handleUpdateChange}
                  placeholder="새로운 비밀번호 확인을 입력해주세요"
                />
              </div>
              <p style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}>
                {passwordError}
              </p>

              <div className="input-container">
                <button onClick={handleUpdate}>비밀번호 변경</button>
              </div>
            </>
          ) : password === 0 ? (
            <>
              <p style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}>
                비밀번호가 일치하지 않습니다.
              </p>
              <div className="input-container">
                <button onClick={handleSave}>비밀번호 확인</button>
              </div>
            </>
          ) : (
            <div className="input-container">
              <button onClick={handleSave}>비밀번호 확인</button>
            </div>
          )}
        </div>
      </div>
      {openModal ? (
        <LoginModal
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
}

export default RegisterStyle;
