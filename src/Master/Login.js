import "../masterCss/login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../BusinessCSS/auth.css";
import axios from "axios";

const MasterLogin = () => {
  const logoUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/logo/logo.svg`;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
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
      const response = await axios.post(
        `http://localhost:8383/api/business/login`,
        data,
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("로그인이 완료되었습니다.");
        console.log("req.body : ", response.data);
        navigate("/business/menu");
      }
    } catch (error) {
      console.error("등록 실패:", error);
      alert("로그인 실패, 다시 시도하세요.");
    }
  };

  return (
    <div className="master_login" lang="ko">
      <div className="login-logo">
        <img src={logoUrl} alt="logo img"></img>
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
      <div className="find-id-pw-text">
        <Link to="/business/register">회원가입11</Link>
      </div>
      <div className="find-id-pw-text">
        <Link to="/find-admin-account">아이디/비밀번호 찾기</Link>
      </div>
    </div>
  );
};

export default MasterLogin;
