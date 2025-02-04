import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../BusinessCSS/menu.css";
import api from "../Api";

const AdminMenu = () => {
  // const logoUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/logo/logo.svg`;
  const logoUrl = `${process.env.PUBLIC_URL}/image/talkTail_logo.png`;
  const reservationIcon = `${process.env.PUBLIC_URL}/BusinessPageImage/icon/reservationIcon.svg`;
  const customerIcon = `${process.env.PUBLIC_URL}/BusinessPageImage/icon/customerIcon.png`;
  const reviewIcon = `${process.env.PUBLIC_URL}/BusinessPageImage/icon/reviewIcon.png`;
  const calculateIcon = `${process.env.PUBLIC_URL}/BusinessPageImage/icon/calculateIcon.png`;
  const ImageIcon = `${process.env.PUBLIC_URL}/BusinessPageImage/icon/ImageIcon.png`;
  const informationIcon = `${process.env.PUBLIC_URL}/BusinessPageImage/icon/informationIcon.png`;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [user, setUser] = useState("null");
  const navigate = useNavigate();
  const [openMore, setOpenMore] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/business/auth", {
          withCredentials: true,
        });
        setUser(response.data);
        console.log(response.data);
        if (!response.data) {
          navigate("/business/login"); // 로그인 페이지로 리디렉션
        }
      } catch (error) {
        console.error("로그인 인증 실패:", error);
        navigate("/business/login"); // 로그인 페이지로 리디렉션
      }
    };
    fetchUser();
  }, []);
  if (!user) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="page-container menuPage_total">
      <div className="menu-form" lang="ko">
        <div className="greet-text">안녕하세요.🙂</div>
        <div className="greet-text">{user.business_owner_name} 님</div>
        <div className="admin-menu-text">Admin Menu</div>
        <div className="menu-grid">
          <button
            className="menu-tbt-btn"
            onClick={() => navigate("/business/reservation/management")}
          >
            <img
              src={reservationIcon}
              alt="reservation icon"
              className="menu-icon"
            />
            <span className="menu-text">
              <br />
              예약관리
            </span>
          </button>
          <button
            className="menu-tbt-btn"
            onClick={() => navigate("/business/customer/management")}
          >
            <img src={customerIcon} alt="customer icon" className="menu-icon" />
            <span className="menu-text">
              <br />
              고객관리
            </span>
          </button>
          <button
            className="menu-tbt-btn"
            onClick={() => navigate("/business/authority/management")}
          >
            <img src={reviewIcon} alt="review icon" className="menu-icon" />
            <span className="menu-text">
              <br />
              권한관리
            </span>
          </button>
          <button
            className="menu-tbt-btn"
            onClick={() => navigate("/calculation-management")}
          >
            <img
              src={calculateIcon}
              alt="calculate icon"
              className="menu-icon"
            />
            <span className="menu-text">
              <br />
              정산관리
            </span>
          </button>
        </div>
        <button
          className="more_btn"
          onClick={() => {
            setOpenMore(!openMore);
          }}
        >
          {openMore ? "숨기기 △" : "더보기 ▽"}
        </button>
        {openMore ? (
          <>
            <div className="menu-grid">
              <button
                className="menu-tbt-btn"
                onClick={() => navigate("/business/day-on-off/edit")}
              >
                <img
                  src={informationIcon}
                  alt="information icon"
                  className="menu-icon"
                />
                <span className="menu-text">
                  <br />
                  엉업일/휴무일
                </span>
              </button>
              <button
                className="menu-tbt-btn"
                onClick={() => navigate("/business/date/edit")}
              >
                <img
                  src={informationIcon}
                  alt="information icon"
                  className="menu-icon"
                />
                <span className="menu-text">
                  <br />
                  요일별 시간 설정
                </span>
              </button>
              <button
                className="menu-tbt-btn"
                onClick={() => navigate("/business/register/style")}
              >
                <img
                  src={informationIcon}
                  alt="information icon"
                  className="menu-icon"
                />
                <span className="menu-text">
                  <br />
                  스타일 수정
                </span>
              </button>
              <button
                className="menu-tbt-btn"
                onClick={() => navigate("/business/edit/information")}
              >
                <img
                  src={informationIcon}
                  alt="information icon"
                  className="menu-icon"
                />
                <span className="menu-text">
                  <br />
                  가게 정보 수정
                </span>
              </button>
              <button
                className="menu-tbt-btn"
                onClick={() => navigate("/business/edit/option")}
              >
                <img
                  src={informationIcon}
                  alt="information icon"
                  className="menu-icon"
                />
                <span className="menu-text">
                  <br />
                  가게 옵션 수정
                </span>
              </button>
              <button
                className="menu-tbt-btn"
                onClick={() => navigate("/business/account/number")}
              >
                <img
                  src={informationIcon}
                  alt="information icon"
                  className="menu-icon"
                />
                <span className="menu-text">
                  <br />
                  계좌번호 등록
                </span>
              </button>
            </div>
            <button
              className="menu-tbt-btn2"
              onClick={() => navigate("/business/list/desinger")}
            >
              <img
                src={customerIcon}
                alt="customer icon"
                className="menu-icon"
              />
              <span className="menu-text">
                <br />
                디자이너 등록
              </span>
            </button>
            <button
              className="menu-tbt-btn2"
              onClick={() => navigate("/business/reservation/desinger")}
            >
              <img
                src={customerIcon}
                alt="customer icon"
                className="menu-icon"
              />
              <span className="menu-text">
                <br />
                예약하기
              </span>
            </button>
          </>
        ) : (
          ""
        )}

        <img src={logoUrl} alt="logo img" className="logo-img"></img>
      </div>
    </div>
  );
};

export default AdminMenu;
