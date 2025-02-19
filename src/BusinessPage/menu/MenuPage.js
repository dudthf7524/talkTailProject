import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../BusinessCSS/menuPage.css";
import api from "../../Api";
import Tos from "../../Page/Home/tos";
import Privacy from "../../Page/Home/privacy";
import Footer from "../../Page/Home/footer";
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
  const [openMore, setOpenMore] = useState(true);
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
        <div className="admin-menu-text">관리자 페이지</div>
        <p className="category_text">고객관리</p>
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
              예약내역
            </span>
          </button>
          <button
            className="menu-tbt-btn"
            onClick={() => navigate("/business/customer/management")}
          >
            <img src={customerIcon} alt="customer icon" className="menu-icon" />
            <span className="menu-text">
              <br />
              알림장
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
              신청서 관리
            </span>
          </button>
          <button
            className="menu-tbt-btn"
            onClick={() => navigate("/business/authority/management")}
          >
            <img src={reviewIcon} alt="review icon" className="menu-icon" />
            <span className="menu-text">
              <br />
              고객등록
            </span>
          </button>
        </div>
        {/* <button
          className="more-business-btn"
          onClick={() => {
            setOpenMore(!openMore);
          }}
        >
          {openMore ? "숨기기 △" : "더보기 ▽"}
        </button> */}
        <p className="category_text">가게관리</p>
        {/* {openMore ? (
          ""
        ) : (
          <button
            className="more-business-btn"
            onClick={() => {
              setOpenMore(!openMore);
            }}
          >
            더보기 ▽
          </button>
        )} */}
        {openMore ? (
          <>
            <div className="menu-grid">
              <button
                className="menu-tbt-btn"
                onClick={() => navigate("/business/list/desinger")}
              >
                <img
                  src={customerIcon}
                  alt="customer icon"
                  className="menu-icon"
                />
                <span className="menu-text">
                  <br />
                  직원 관리
                </span>
              </button>
              <button
                className="menu-tbt-btn"
                onClick={() => navigate("/business/reservation/desinger")}
              >
                <img
                  src={customerIcon}
                  alt="customer icon"
                  className="menu-icon"
                />
                <span className="menu-text">
                  <br />
                  예약 시간 관리
                </span>
              </button>
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
                  영업 일정 관리
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
                  영업 시간 관리
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
                  가게 상세 정보
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
                onClick={() => navigate("/calculation-management")}
              >
                <img
                  src={calculateIcon}
                  alt="calculate icon"
                  className="menu-icon"
                />
                <span className="menu-text">
                  <br />
                  매출관리
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
                  계좌번호
                </span>
              </button>
            </div>
            {/* {openMore ? (
              <button
                className="more-business-btn"
                onClick={() => {
                  setOpenMore(!openMore);
                }}
              >
                숨기기 △
              </button>
            ) : (
              ""
            )} */}
          </>
        ) : (
          ""
        )}
      </div>
      <Footer />
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
