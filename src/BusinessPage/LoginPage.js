import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../BusinessCSS/auth.css";
import axios from "axios";
import LoginModal from "./Modal/LoginModal.js";

const Login = () => {
  // const logoUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/logo/logo.svg`;
  const logoUrl = `${process.env.PUBLIC_URL}/image/talkTail_logo.png`;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  console.log(apiUrl);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const modalTitle = "로그인 완료";
  const modalContent = "잠시 후 메뉴페이지로 이동합니다.";

  const login = async () => {
    const form = document.querySelector(".loginform");
    const formData = new FormData(form);

    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    console.log(data);

    try {
      // axios로 데이터 전송
      const response = await axios.post(`${apiUrl}/api/business/login`, data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setOpenModal(true);
        setTimeout(() => {
          navigate("/business/menu");
        }, 2000);
      }
    } catch (error) {
      console.error("등록 실패:", error);
      alert("로그인 실패, 다시 시도하세요.");
    }
  };

  return (
    <div className="login" lang="ko">
      <div className="login-logo">
        <img src={logoUrl} alt="logo img" style={{width : "50%",}}></img>
      </div>
      <div className="login-text">관리자 로그인</div>

      <form className="loginform" typeof="post" onSubmit={login}>
        <div className="login-form">
          <input type="text" id="username" name="username" placeholder="ID" />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="PW"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
          >
            로그인 하기
          </button>
        </div>
      </form>
      {/* <div className="find-id-pw-text">
        <Link to="/business/register">회원가입</Link>
      </div>
      <div className="find-id-pw-text">
        <Link to="/find-admin-account">아이디/비밀번호 찾기</Link>
      </div> */}
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
};

export default Login;
