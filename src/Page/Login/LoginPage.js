import React, { useState } from "react";
import "../../CSS/auth.css";
import Tos from "../Home/tos";
import Privacy from "../Home/privacy";
const LoginPage = () => {
  const logoUrl = `${process.env.PUBLIC_URL}/image/talkTail_logo.png`;
  const googleUrl = `${process.env.PUBLIC_URL}/PageImage/auth/google logo.svg`;
  const kakaoUrl = `${process.env.PUBLIC_URL}/PageImage/auth/KAKAO logo.svg`;
  const naverUrl = `${process.env.PUBLIC_URL}/PageImage/auth/Naver logo.svg`;
  const image1Url = `${process.env.PUBLIC_URL}/PageImage/auth/pictures/img (1).png`;
  const image2Url = `${process.env.PUBLIC_URL}/PageImage/auth/pictures/img (2).png`;
  const image3Url = `${process.env.PUBLIC_URL}/PageImage/auth/pictures/img (3).png`;
  const image4Url = `${process.env.PUBLIC_URL}/PageImage/auth/pictures/img (4).png`;
  const image5Url = `${process.env.PUBLIC_URL}/PageImage/auth/pictures/img (5).png`;
  const [openTos, setOpenTos] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

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
    <div className="login login_total" lang="ko">
      <div className="login-title">
        <img src={logoUrl} alt="logo" />
      </div>
      <div className="login-pictures">
        <div className="top">
          <img className="big" src={image1Url} alt="" />
          <img className="small" src={image2Url} alt="" />
        </div>
        <div className="bottom">
          <div className="left">
            <img src={image3Url} alt="" />
          </div>
          <div className="right">
            <img src={image4Url} alt="" />
            <img src={image5Url} alt="" />
          </div>
        </div>
        {/* <table>
          <tbody>
            <tr>
              <td className="big" colSpan="2" rowSpan="2">
                <img src={image1Url} alt="" />
              </td>
              <td className="small" rowSpan="2">
                <img src={image2Url} alt="" />
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td className="big" colSpan="2" rowSpan="2">
                <img src={image3Url} alt="" />
              </td>
              <td className="small">
                <img src={image4Url} alt="" />
              </td>
            </tr>
            <tr>
              <td className="small">
                <img src={image5Url} alt="" />
              </td>
            </tr>
          </tbody>
        </table> */}
      </div>
      <div className="login-text">
        우리 아이를 위한 특별한 곳,<br></br>
        여기에서 시작해요!!!
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
            setOpenTos(true);
          }}
        >
          이용약관
        </p>
        <p>｜</p>
        <p
          onClick={() => {
            setOpenPrivacy(true);
          }}
        >
          개인정보 처리방침
        </p>
      </div>
      {openTos ? (
        <Tos
          openModal={() => {
            setOpenTos(false);
          }}
        />
      ) : (
        ""
      )}
      {openPrivacy ? (
        <Privacy
          openModal={() => {
            setOpenPrivacy(false);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default LoginPage;
