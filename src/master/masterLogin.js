import "../masterCss/masterLogin.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MasterLoginModal from "./masterLoginModal.js";
import api from "../Api";

const Login = () => {
  const logoUrl = `${process.env.PUBLIC_URL}/image/talkTail_logo.png`;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [master, setMaster] = useState(false);
  console.log(apiUrl);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const modalTitle = "로그인 완료";
  const modalContent = "잠시 후 메뉴페이지로 이동합니다.";
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/master/auth", {
          withCredentials: true,
        });
        setMaster(response.data);
        if (!response.data) {
          navigate("/master"); // 로그인 페이지로 리디렉션
        }
      } catch (error) {
        console.error("로그인 인증 실패:", error);
        navigate("/master"); // 로그인 페이지로 리디렉션
      }
    };
    fetchUser();
  }, []);
  const menu = () => {
    navigate("/master/main ");
  };

  const login = async () => {
    const form = document.querySelector(".loginform");
    const formData = new FormData(form);

    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      // axios로 데이터 전송
      const response = await axios.post(
        `${apiUrl}/masterAuth/masterLogin`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response.data === 'sucess') {
        setOpenModal(true);
        setTimeout(() => {
          navigate("/master/main");
        }, 1000);
      }
      if (response.data === '아이디') {
        alert("아이디 불일치, 다시 시도하세요.");
      }
      if (response.data === '비밀번호') {
        alert("비밀번호 불일치, 다시 시도하세요.");
      }
    } catch (error) {
      console.error("등록 실패:", error);
      alert("로그인 실패, 다시 시도하세요.");
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/masterAuth/masterLogout`,
        {
          withCredentials: true,
        }
      );
      window.location.href = "/master";
    } catch (error) { }
  };

  return (
    <div className="login master_login" lang="ko">
      <div className="login-logo">
        <img src={logoUrl} alt="logo img"></img>
      </div>

      {master ? (
        <>
          <div className="login-form">
            <div className="login-text">
              {master.login_id === 'creamoff2021' ? (
                <>권도혁 마스터 관리자</>
              ) : (
                <></>
              )

              }
            </div>
            <button
              type="button"
              onClick={() => {
                menu();
              }}
            >
              메뉴가기
            </button>
            <div className="find-id-pw-text">
              <Link onClick={logout}>로그아웃</Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="login-text">마스터 로그인</div>
          <form className="loginform" typeof="post" onSubmit={login}>
            <div className="login-form">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="ID"
              />
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
        </>
      )}

     

      {openModal ? (
        <MasterLoginModal
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
