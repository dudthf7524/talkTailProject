import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../CSS/listPage.css";
import api from "../../Api";
import { useDispatch, useSelector } from "react-redux";
import { setBusinessInfo } from "../../redux/reservationData";
import { setHour } from "../../redux/reservationData";
import AcceptModal from "./AcceptModal";
const EventDetailPage = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
  const locationUrl = `${process.env.PUBLIC_URL}/PageImage/list/location.svg`;
  const callUrl = `${process.env.PUBLIC_URL}/PageImage/list/call.svg`;
  const shareUrl = `${process.env.PUBLIC_URL}/PageImage/list/share.svg`;
  const heartUrl = `${process.env.PUBLIC_URL}/PageImage/list/heart.svg`;
  const noteUrl = `${process.env.PUBLIC_URL}/PageImage/list/note.svg`;

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  console.log(isButtonClicked);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false); // 이미지 상태 추가
  const [business, setBusiness] = useState({});
  const [hours, setHours] = useState({});
  console.log(business);
  const accordionRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [openAcceptModal, setOpenAcceptModal] = useState(false);
  const dispatch = useDispatch();
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"]; // 요일 배열





  const sliderRef = useRef(null);


  const handleDragStart = (e) => {
    e.preventDefault();
  };

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const getWindowWidth = () => window.innerWidth;

  const moveCircle = (index) => {
    setIsPlaying(false);
    setCurrentIndex(Math.min(index + 1, imageArray.length));

    if (!sliderRef.current) return;

    const windowWidth = getWindowWidth();

    let slideAmount = 0;
    if (windowWidth > 500) {
      slideAmount = 387 + 8.6;
    } else {
      slideAmount = windowWidth * 0.92;
    }

    if (index === imageArray.length) {
      sliderRef.current.scrollTo({
        right: 0,
        behavior: "smooth",
      });
    } else {
      sliderRef.current.scrollTo({
        left: slideAmount * index,
        behavior: "smooth",
      });
    }
  };


  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const toggleShowAllImages = () => {
    setShowAllImages(!showAllImages);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - accordionRef.current.offsetLeft);
    setScrollLeft(accordionRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - accordionRef.current.offsetLeft;
    const walk = x - startX; // 스크롤 속도 조절
    accordionRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleSavedClick = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found.");
      }

      // 서버에 요청을 보낼 때 에러가 발생해도 앱이 멈추지 않도록 처리
      await api.post(
        `/api/saved`,
        {
          business_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Saved:", id);
    } catch (error) {
      console.log("Error occurred during save operation.");
      // 에러가 발생해도 사용자에게 표시하지 않고 로그로만 남김
    }
  };
  const designerName = useSelector((state) => state.reservationData); // Redux 상태 가져오기
  console.log("Selected Designer Name:", designerName);
  // 뒤로 가기
  const goBack = () => {
    navigate(-1);
  };

  const handleItemClick = (business) => {
    // console.log(business.business_name);
    // console.log(business.business_registration_number);
    // console.log(business.business_no_show);
    // console.log(hours);
    dispatch(
      setBusinessInfo({
        business_name: business.business_name,
        business_registration_number: business.business_registration_number,
        business_no_show: business.business_no_show,
      })
    );
    dispatch(setHour(hours));
    // navigate(`/designer/list`);
  };

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found.");
        }
        const response = await api.get(`/api/business/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBusiness(response.data);
        setHours(response.data.hours);
        console.log("Business fetched:", response.data);
      } catch (error) {
        console.error("Error fetching business:", error);
      }
    };
    fetchBusiness();
  }, [id]);


  console.log(business)

  const imageArray = [];

  if (business.business_price_image1) {
    imageArray.push({ imgUrl: business.business_price_image1 });
  }

  if (business.business_price_image2) {
    imageArray.push({ imgUrl: business.business_price_image2 });
  }

  if (business.business_price_image3) {
    imageArray.push({ imgUrl: business.business_price_image3 });
  }



  // 주어진 시간 데이터를 'HH:MM:SS' 형식에서 'HH:MM' 형식으로 변환
  const formatTime = (time) => {
    if (!time) return ""; // null 또는 undefined 처리
    const [hour, minute] = time.split(":"); // ':'를 기준으로 분할
    return `${hour}:${minute}`; // 시간과 분을 합쳐서 반환
  };

  // 사용 예시

  const operatingDays = Object.values(hours).filter(
    (day) => day.isOperatingDay === true
  );

  console.log(operatingDays);
  if (!business) {
    return <p>로딩 중...</p>; // 로딩 중일 때 처리
  }

  const moveSlide = (direction) => {
    setIsPlaying(false); 
    const windowWidth = getWindowWidth();
    let slideAmount = windowWidth > 500 ? 387 + 8.6 : windowWidth * 0.92;
  
    let newIndex = currentIndex;
    if (direction === 'left') {
      newIndex = currentIndex === 1 ? imageArray.length : currentIndex - 1;
    } else if (direction === 'right') {
      newIndex = currentIndex === imageArray.length ? 1 : currentIndex + 1;
    }
  
    setCurrentIndex(newIndex);
  
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: slideAmount * (newIndex - 1),
        behavior: 'smooth',
      });
    }
  };
  return (
    <div lang="ko" className="detailPage_total">
      <div className="mid">
        <div className="navigation">
          <button>
            <img src={arrowButtonUrl} alt="" onClick={goBack} />
          </button>
          가게정보
          <div></div>
        </div>
        <div className="event-text-box">{business.business_comment}</div>

        <div className="event-img">
          {business.business_main_image ? (
            <img
              src={business.business_main_image}
              alt="Main Event"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <p>이미지가 없습니다</p> // 이미지가 없는 경우에 대한 대체 텍스트
          )}
        </div>
        <div className="event-title">
          <div>{business.business_name}</div>
          {/* <div className={`event-title-button ${isButtonClicked ? 'clicked' : ''}`} onClick={handleButtonClick}>
                        {EventDetailPage ? '예약대기' : '예약가능'}
                    </div> */}
        </div>

        <div className="event-address">
          영업시간
          {dayNames.map((day, index) => {
            const dayInfo = hours[index]; // 요일별 데이터 가져오기
            return (
              <p key={index}>
                {day}&nbsp;&nbsp;
                {dayInfo && dayInfo.isOperatingDay
                  ? `${formatTime(dayInfo.start_time)} - ${formatTime(
                      dayInfo.end_time
                    )}`
                  : "휴무"}
              </p>
            );
          })}
        </div>
        <div className="event-button-container">
          <div className="event-button">
            <a href={`tel:${business.business_phone}`}>
              <button>
                <img src={callUrl} alt="" />
              </button>
            </a>
            <div className="event-button-text">전화</div>
          </div>
        </div>
        <div className="information-text">가격정보</div>



        <div className="home_carousel_section">
          <div className="carousel_container">

            <div className="slide_wrapper">
              <div className="left-arrow" onClick={() => moveSlide('left')}>{"<"} </div>

              <div className="slide_container" ref={sliderRef}>

                {imageArray.map((image, index) => {
                  return (
                    <div className="img_div" key={index}>
                      <a href={image.linkUrl} target="_blank">
                        <img
                          src={image.imgUrl}
                          alt=""
                          onDragStart={handleDragStart}
                          style={{ width: "300px", height: "300px" }}
                        />
                      </a>
                    </div>
                  );
                })}
              </div>
              <div className="right-arrow" onClick={() => moveSlide('left')}>{">"}</div>

            </div>
            <div className="index_box">
              {currentIndex} / {imageArray.length}
            </div>

          </div>
          <div className="circle_box">
            {imageArray.map((image, index) => {
              return (
                <div
                  className="circle"
                  key={index}
                  style={{
                    backgroundColor:
                      currentIndex === index + 1 ? "#f0663f" : "gray",
                  }}
                  onClick={() => {
                    console.log("index : ", index);
                    moveCircle(index);
                  }}
                ></div>
              );
            })}
          </div>
        </div>



        {/* <div className="img">
          <img
            src={business.business_price_image1}
            style={{ width: "300px", height: "300px" }}
          ></img>
        </div>
        <div className="img">
          <img
            src={business.business_price_image2}
            style={{ width: "300px", height: "300px" }}
          ></img>
        </div>
        {business.business_price_image3 ? (
          <div className="img">
            <img
              src={business.business_price_image3}
              style={{ width: "300px", height: "300px" }}
            ></img>
          </div>
        ) : (
          <div className="img"></div>
        )} */}

        <div className="writing-div">
          <div className="writing">
            <div>예약금 :</div>
            <div>{business.business_no_show} 원</div>
          </div>
        </div>
      </div>
      <div className="Nbutton_box">
        <div className="Nbtn" onClick={() => {}} style={{ cursor: "pointer" }}>
          전화하기
        </div>
        <div
          className="Nbtn"
          onClick={() => {
            handleItemClick(business);
            setOpenAcceptModal(true);
          }}
          style={{ cursor: "pointer" }}
        >
          예약하기
        </div>
      </div>

      {openAcceptModal ? (
        <AcceptModal
          openModal={() => {
            setOpenAcceptModal(false);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default EventDetailPage;
