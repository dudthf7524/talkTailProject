import React, { useEffect, useRef, useState } from "react";
import NButtonContainer from "../Components/NavigatorBar/NButtonContainer";
import "../../CSS/page.css";
import { useNavigate } from "react-router-dom";
import Modal from "../../modal";
import api from "../../Api";
import "../../CSS/homePage.css";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeCarousel from "./homeCarousel";
import HomeBookmarks from "./homeBookmarks";
import HomeAd from "./homeAd";
import Footer from "./footer";

const MainPage = () => {
  const navigate = useNavigate();
  const categoryRef = useRef(null);
  const locationUrl = `${process.env.PUBLIC_URL}/PageImage/home/location.svg`;
  const arrowUrl = `${process.env.PUBLIC_URL}/PageImage/home/arrow.svg`;
  const footArrowUrl = `${process.env.PUBLIC_URL}/PageImage/home/footArrow.svg`;
  const trailingUrl = `${process.env.PUBLIC_URL}/PageImage/home/trailing.svg`;

  // const logoUrl = `${process.env.PUBLIC_URL}/PageImage/home/logo.svg`;
  const logoUrl = `${process.env.PUBLIC_URL}/image/talkTail_logo.png`;

  const b1Url = `${process.env.PUBLIC_URL}/PageImage/home/b1.svg`;
  const b2Url = `${process.env.PUBLIC_URL}/PageImage/home/b2.svg`;
  const b3Url = `${process.env.PUBLIC_URL}/PageImage/home/b3.svg`;
  const b4Url = `${process.env.PUBLIC_URL}/PageImage/home/b4.svg`;
  const b5Url = `${process.env.PUBLIC_URL}/PageImage/home/b5.svg`;
  const b6Url = `${process.env.PUBLIC_URL}/PageImage/home/b6.svg`;
  const b7Url = `${process.env.PUBLIC_URL}/PageImage/home/b7.svg`;
  const b8Url = `${process.env.PUBLIC_URL}/PageImage/home/b8.svg`;

  const imageNumbers = Array.from({ length: 9 }, (_, index) => index + 1);
  const containerRef = useRef(null);
  const containerRef2 = useRef(null);
  const containerRef3 = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showCategory, setShowCategory] = useState(false);
  const [user, setUser] = useState(false);
  const [userPet, setUserPet] = useState(false);
  const [reservationtLists, setReservationtList] = useState([]);

  useEffect(() => {
    userLoginPet();
    reservationManagement();
    userLogin();
  }, []);

  const userLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const response = await api.get("/api/user/information", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("로그인 인증 실패:", error);
    }
  };

  const userLoginPet = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const response = await api.get("/api/user/login/pet", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserPet(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("로그인 인증 실패:", error);
    }
  };
  const reservationManagement = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const response = await api.get("/api/user/reservation/bookmark", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReservationtList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("로그인 인증 실패:", error);
    }
  };

  const startDrag = (e) => {
    if (containerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };
  const stopDrag = () => {
    setIsDragging(false);
  };
  const onDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX; // 스크롤 속도 조정
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const startDrag2 = (e) => {
    if (containerRef2.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef2.current.offsetLeft);
      setScrollLeft(containerRef2.current.scrollLeft);
    }
  };
  const stopDrag2 = () => {
    setIsDragging(false);
  };
  const onDrag2 = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef2.current.offsetLeft;
    const walk = x - startX; // 스크롤 속도 조정
    containerRef2.current.scrollLeft = scrollLeft - walk;
  };

  const startDrag3 = (e) => {
    if (containerRef3.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef3.current.offsetLeft);
      setScrollLeft(containerRef3.current.scrollLeft);
    }
  };
  const stopDrag3 = () => {
    setIsDragging(false);
  };
  const onDrag3 = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef3.current.offsetLeft;
    const walk = x - startX; // 스크롤 속도 조정
    containerRef3.current.scrollLeft = scrollLeft - walk;
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (id) => {
    navigate(`/list/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  const [openModal, setOpenModal] = useState(false);
  const modalTitle = "알림";
  const modalContent = "해당 서비스는 준비 중입니다.";
  console.log("user : ", user);
  return (
    <div lang="ko" className="main_container">
      <div className="mid home_total">
        <div className="home-header">
          <div className="home-location">
            {/* <button>
              <img src={locationUrl} alt="location" />
            </button>
            위치를 설정하세요.
            <button>
              <img src={arrowUrl} alt="arrow" />
            </button> */}
            <img src={logoUrl} alt="" />

            <div className="customer" style={{ color: "black" }}>
              {user?.user_name ? `${user.user_name}님` : ""}
            </div>

            {user || userPet ? (
              <p onClick={handleLogout}>Logout</p>
            ) : (
              <p
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </p>
            )}
          </div>
          <div className="trailing">
            {/* <button>
              <img src={trailingUrl} alt="trailing" />
            </button> */}
          </div>
        </div>
        <HomeAd />

        <HomeBookmarks
          reservationtLists={reservationtLists}
          categoryRef={categoryRef}
          userPet={userPet}
          user={user}
        />
        <HomeCarousel />
        {/* <HomeGuide /> */}
        {/* <div
          className="home-container3"
          ref={containerRef}
          onMouseDown={startDrag}
          onMouseLeave={stopDrag}
          onMouseUp={stopDrag}
          onMouseMove={onDrag}
        >
          <div className="margin"></div>
          {imageNumbers.map((number) => (
            <div className="home-container3-img" key={number}>
              <div className="img-number">{number}/9</div>
            </div>
          ))}
        </div> */}

        <div className="category" ref={categoryRef}>
          <div className="text">
            <p>카테고리</p>
            {showCategory ? (
              ""
            ) : (
              <div className="more_btn">
                <p
                  onClick={() => {
                    setShowCategory(true);
                  }}
                >
                  +더보기
                </p>
              </div>
            )}
          </div>
          <div className="item_container">
            <div
              className="button-item first"
              onClick={() => handleItemClick("beauty")}
            >
              <img src={b1Url} alt="" />
            </div>
            {/* <div className="button-item" onClick={() => handleItemClick(2)}> */}
            <div className="button-item" onClick={() => setOpenModal(true)}>
              <img src={b2Url} alt="" />
            </div>
            {/* <div className="button-item" onClick={() => handleItemClick(3)}> */}
            <div
              className="button-item third"
              onClick={() => setOpenModal(true)}
            >
              <img src={b3Url} alt="" />
            </div>

            {showCategory ? (
              <>
                <div
                  className="button-item first"
                  onClick={() => setOpenModal(true)}
                >
                  <img src={b4Url} alt="" />
                </div>
                <div className="button-item" onClick={() => setOpenModal(true)}>
                  <img src={b5Url} alt="" />
                </div>
                {/* <div className="button-item" onClick={() => handleItemClick(6)}> */}
                <div
                  className="button-item third"
                  onClick={() => setOpenModal(true)}
                >
                  <img src={b6Url} alt="" />
                </div>
                {/* <div className="button-item" onClick={() => handleItemClick(7)}> */}
                <div
                  className="button-item first"
                  onClick={() => setOpenModal(true)}
                >
                  <img src={b7Url} alt="" />
                </div>
                {/* <div className="button-item" onClick={() => handleItemClick(8)}> */}
                <div className="button-item" onClick={() => setOpenModal(true)}>
                  <img src={b8Url} alt="" />
                </div>
              </>
            ) : (
              ""
            )}

            {/* <div className="button-item" onClick={() => handleItemClick(4)}> */}
          </div>

          {showCategory ? (
            <div
              className="less_btn"
              onClick={() => {
                setShowCategory(false);
              }}
            >
              ▲
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <Footer />
      <NButtonContainer />
      {openModal ? (
        <Modal
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

export default MainPage;
