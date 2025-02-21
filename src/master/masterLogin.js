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
  console.log("master : ", master);
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
    console.log(data);

    try {
      // axios로 데이터 전송
      const response = await axios.post(
        `${apiUrl}/api/masterAuth/masterLogin`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setOpenModal(true);
        setTimeout(() => {
          navigate("/master/main");
        }, 1000);
      }
    } catch (error) {
      console.error("등록 실패:", error);
      alert("로그인 실패, 다시 시도하세요.");
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/masterAuth/masterLogout`,
        {
          withCredentials: true,
        }
      );
      window.location.href = "/master";
    } catch (error) {}
  };

  return (
    <div className="login master_login" lang="ko">
      <div className="login-logo">
        <img src={logoUrl} alt="logo img"></img>
      </div>

      {master ? (
        <>
          <div className="login-text">마스터님 로그인 완료</div>
          <div className="login-form">
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

      {master ? (
        <div className="find-id-pw-text"></div>
      ) : (
        <>
          <div className="find-id-pw-text">
            <Link to="/master/register">회원가입</Link>
          </div>
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
