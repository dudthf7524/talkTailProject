import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../BusinessCSS/menu.css";
import api from "../Api";
import Tos from "../Page/Home/tos";
import Privacy from "../Page/Home/privacy";
const AdminMenu = () => {
  const logoUrl = `${process.env.PUBLIC_URL}/image/talkTail_logo.png`;
  const reservationIcon = `${process.env.PUBLIC_URL}/BusinessPageImage/icon/reservationIcon.svg`;
  const customerIcon = `${process.env.PUBLIC_URL}/BusinessPageImage/icon/customerIcon.png`;
  const reviewIcon = `${process.env.PUBLIC_URL}/BusinessPageImage/icon/reviewIcon.png`;
  const calculateIcon = `${process.env.PUBLIC_URL}/BusinessPageImage/icon/calculateIcon.png`;
  const informationIcon = `${process.env.PUBLIC_URL}/BusinessPageImage/icon/informationIcon.png`;
  const footArrowUrl = `${process.env.PUBLIC_URL}/PageImage/home/footArrow.svg`;

  const [user, setUser] = useState("null");
  const navigate = useNavigate();
  const [openMore, setOpenMore] = useState(false);
  const landline_phone = "070-4571-7580";
  const [openTos, setOpenTos] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/business/auth", {
          withCredentials: true,
        });
        setUser(response.data);
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

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

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
          className="more_business-btn"
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
                onClick={() => navigate("/business/account/number/list")}
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

      </div>
      <div className="tail-container">
        <div className="tail-item">
          <img src={logoUrl} alt="" style={{ width: "50%" }} />

          <div className="tail-text">
            애견미용샵 ｜상품입점｜제휴문의｜상담문의
          </div>
          <div className="tail-business-number">
            <a
              style={{ textDecoration: "none", color: "black" }}
              href={`tel:${landline_phone}`}
            >
              070-4571-7580
            </a>
          </div>
          <div className="tail-a">
            <span
              onClick={() => {
                setOpenTos(true);
              }}
            >
              이용약관
            </span>
            ｜
            <span
              onClick={() => {
                setOpenPrivacy(true);
              }}
            >
              개인정보 처리방침
            </span>
          </div>
          <div
            className={`tail-accordion ${isOpen ? "open" : ""}`}
            onClick={toggleAccordion}
          >
            사업자 정보
            <img src={footArrowUrl} alt="arrow" />
          </div>
          <div className={`hidden-content ${isOpen ? "open" : ""}`}>
            <div className="hidden-item">
              <div>대표</div>
              <div>사업자등록번호</div>
              <div>통신판매업</div>
              <div>주소</div>
              <div>이메일</div>
            </div>
            <div className="hidden-item2">
              <div>권도혁</div>
              <div>514-87-03021</div>
              <div>2025-경북경산-0073</div>
              <div>경상북도 경산시 삼풍로 27, 309호</div>
              <div>creamoff2021@creamoff.co.kr</div>
            </div>
          </div>
          <div className="tail-co">@TalkTail co Ltd. All rigths reserved</div>
        </div>
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

export default AdminMenu;
