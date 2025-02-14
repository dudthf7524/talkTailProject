import React, { useState } from "react";
import "../../CSS/total.css";
import "../../CSS/auth.css";

import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const logoUrl = `${process.env.PUBLIC_URL}/image/talkTail_logo.png`;
  const googleUrl = `${process.env.PUBLIC_URL}/PageImage/auth/google logo.svg`;
  const kakaoUrl = `${process.env.PUBLIC_URL}/PageImage/auth/KAKAO logo.svg`;
  const naverUrl = `${process.env.PUBLIC_URL}/PageImage/auth/Naver logo.svg`;
  const image1Url = `${process.env.PUBLIC_URL}/PageImage/auth/pictures/img (1).png`;
  const image2Url = `${process.env.PUBLIC_URL}/PageImage/auth/pictures/img (2).png`;
  const image3Url = `${process.env.PUBLIC_URL}/PageImage/auth/pictures/img (3).png`;
  const image4Url = `${process.env.PUBLIC_URL}/PageImage/auth/pictures/img (4).png`;
  const image5Url = `${process.env.PUBLIC_URL}/PageImage/auth/pictures/img (5).png`;

  const kakao_key = process.env.REACT_APP_KAKAO_CLIENT_ID;
  const redirect_uri_kakao = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const naver_key = process.env.REACT_APP_NAVER_CLIENT_ID;
  const redirect_uri_naver = process.env.REACT_APP_NAVER_REDIRECT_URI;

  const google_client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const redirect_uri_google = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

  console.log(redirect_uri_kakao);
  console.log(redirect_uri_naver);
  console.log(redirect_uri_google);

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao_key}&redirect_uri=${redirect_uri_kakao}&response_type=code`;
  const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver_key}&redirect_uri=${redirect_uri_naver}&state=STATE_STRING`;
  const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${google_client_id}&redirect_uri=${redirect_uri_google}&response_type=code&scope=profile%20email`;

  console.log(kakaoURL);
  console.log(naverURL);
  console.log(googleURL);

  const handleKakao = () => {
    window.location.href = kakaoURL;
  };

  const handleNaver = () => {
    window.location.href = naverURL;
  };

  const handleGoogle = () => {
    window.location.href = googleURL;
  };

  return (
    <div className="login_total login" lang="ko">
      <div className="login-title">
        <div className="logo_box">
          <img src={logoUrl} alt="logo" />
          <p>반려동물 토탈케어 서비스</p>
        </div>
      </div>
      <div className="login-pictures">
        <div className="top">
          <img className="big" src={image3Url} alt="" />
          <img className="small" src={image2Url} alt="" />
        </div>
      </div>
      <div className="login-text">
        반려동물은 Tail로 소통하고<br></br>
        우리는 "Talktail" 로 소통합니다.
      </div>
      <div className="login-button-container">
        <button>
          <img src={googleUrl} alt="google" onClick={handleGoogle} />
        </button>
        <button onClick={handleKakao}>
          <img src={kakaoUrl} alt="kakao" />
        </button>
        <button onClick={handleNaver}>
          <img src={naverUrl} alt="naver" />
        </button>
      </div>
      <div className="btn_box">
        <p
          onClick={() => {
            navigate("/tos");
          }}
        >
          이용약관
        </p>
        <p>｜</p>
        <p
          onClick={() => {
            navigate("/privacy");
          }}
        >
          개인정보 처리방침
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
