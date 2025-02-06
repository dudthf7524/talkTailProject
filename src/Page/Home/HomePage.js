import React, { useEffect, useRef, useState } from "react";
import NButtonContainer from "../Components/NavigatorBar/NButtonContainer";
import "../../CSS/page.css";
import { useNavigate } from "react-router-dom";
import Modal from "../../modal";
import Tos from "./tos";
import Privacy from "./privacy";
import api from "../../Api";
import "../../CSS/homePage.css";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';


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
  const [reservationtLists, setReservationtList] = useState([]);

  useEffect(() => {
    const reservationManagement = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found.");
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
    reservationManagement();
  }, []);



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

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (id) => {
    navigate(`/list/${id}`);
  };

  const [openModal, setOpenModal] = useState(false);
  const modalTitle = "알림";
  const modalContent = "해당 서비스는 준비 중입니다.";

  const [openTos, setOpenTos] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const scrollCategory = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
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
          </div>
          <div className="trailing">
            {/* <button>
              <img src={trailingUrl} alt="trailing" />
            </button> */}
          </div>
        </div>
        {
          reservationtLists.length > 0 ? (
            <>
              <h2>즐겨찾기</h2>
              <Carousel className="Carousel" indicators={false}>
                {
                  reservationtLists.map((reservationtList, index) => (
                    <Carousel.Item key={index} >
                      <div className="img"><img style={{ width: "70%", height: "250px" }} src={reservationtList.business_main_image}></img></div>
                      <Carousel.Caption>
                        <h3><div className="">{reservationtList.business_name}</div></h3>
                        <p>예약 수 {reservationtList.user_count}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))
                }
              </Carousel>
              {/* <Carousel className="Carousel" indicators={false}>
                <Carousel.Item >
                  <div className="img"><img src={reservationtList.business_main_image}></img></div>
                  <Carousel.Caption>
                    <h3><div className="">{reservationtList.business_name}</div></h3>
                    <p>예약 수 6</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="img"><img src={reservationtList.business_main_image}></img></div>
                  <div className="carousel-text">
                    <h3>{reservationtList.business_name}</h3>
                    <p>예약 수 6</p>
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="img"><img src={reservationtList.business_main_image}></img></div>
                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel> */}
            </>
          ) : (
            <div className="home-container1">
              <p>아직 예약내역이 없어요. 예약기능을 이용해보세요.</p>
              <div
                className="btn"
                onClick={scrollCategory}
                style={{ borderRadius: "5px" }}
              >
                예약하러 가기
              </div>


            </div>
          )
        }

        <div className="home-container2"></div>

        <div
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
        </div>

        <div className="category" ref={categoryRef}>
          <div className="text">카테고리</div>
          <div
            className="button-grid"
            ref={containerRef2}
            onMouseDown={startDrag2}
            onMouseLeave={stopDrag2}
            onMouseUp={stopDrag2}
            onMouseMove={onDrag2}
          >
            <div className="button-grid-con">
              <div
                className="button-item"
                onClick={() => handleItemClick("beauty")}
              >
                <img src={b1Url} alt="" />
              </div>
              {/* <div className="button-item" onClick={() => handleItemClick(2)}> */}
              <div className="button-item" onClick={() => setOpenModal(true)}>
                {/* <br></br> */}
                {/* 유치원 */}
                <img src={b2Url} alt="" />
                {/* <br></br>
            준비중 */}
              </div>
              {/* <div className="button-item" onClick={() => handleItemClick(3)}> */}
              <div className="button-item" onClick={() => setOpenModal(true)}>
                <img src={b3Url} alt="" />
              </div>
              {/* <div className="button-item" onClick={() => handleItemClick(4)}> */}
              <div className="button-item" onClick={() => setOpenModal(true)}>
                <img src={b4Url} alt="" />
              </div>
            </div>
            <div className="button-grid-con" onClick={() => setOpenModal(true)}>
              {/* <div className="button-item" onClick={() => handleItemClick(5)}> */}
              <div className="button-item">
                <img src={b5Url} alt="" />
              </div>
              {/* <div className="button-item" onClick={() => handleItemClick(6)}> */}
              <div className="button-item" onClick={() => setOpenModal(true)}>
                <img src={b6Url} alt="" />
              </div>
              {/* <div className="button-item" onClick={() => handleItemClick(7)}> */}
              <div className="button-item" onClick={() => setOpenModal(true)}>
                <img src={b7Url} alt="" />
              </div>
              {/* <div className="button-item" onClick={() => handleItemClick(8)}> */}
              <div className="button-item" onClick={() => setOpenModal(true)}>
                <img src={b8Url} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div
          className="home-container4"
          ref={containerRef3}
          onMouseDown={startDrag3}
          onMouseLeave={stopDrag3}
          onMouseUp={stopDrag3}
          onMouseMove={onDrag3}
        >
          <div className="margin"></div>
          <div className="home-container4-img"></div>
          <div className="home-container4-img"></div>
          <div className="home-container4-img"></div>
        </div>
        <div className="tail-container">
          <div className="tail-item">
            <img src={logoUrl} alt="" style={{ width: "50%" }} />

            <div className="tail-text">
              애견미용샵 ｜상품입점｜제휴문의｜상담문의
            </div>
            <div className="tail-number">070-4571-7580</div>
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
      </div>
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

export default MainPage;
