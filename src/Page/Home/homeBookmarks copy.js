import "../../CSS/homeBookmarks.css";
import "../../CSS/homeCarousel.css";
import React, { useRef, useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const HomeBookmarks = ({ reservationtLists, categoryRef }) => {
  const [openBanner, setOpenBanner] = useState(false);
  const scrollCategory = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const getWindowWidth = () => window.innerWidth;
  const handleSlide = (direction) => {
    if (!sliderRef.current) return;
    const { scrollLeft, clientWidth } = sliderRef.current;
    const windowWidth = getWindowWidth();
    let slideAmount = windowWidth > 500 ? 387 + 8.6 : windowWidth * 0.92;

    if (direction === "left" && currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
      sliderRef.current.scrollTo({
        left: scrollLeft - slideAmount,
        behavior: "smooth",
      });
    } else if (
      direction === "right" &&
      currentIndex < reservationtLists.length
    ) {
      sliderRef.current.scrollTo({
        left: scrollLeft + slideAmount,
        behavior: "smooth",
      });
      setCurrentIndex(currentIndex + 1);
    }
  };
  return (
    <div className="homeBookmarks">
      {reservationtLists.length > 0 ? (
        <>
          <h2>즐겨찾기</h2>
          <Carousel className="Carousel" indicators={false}>
            {reservationtLists.map((reservationtList, index) => (
              <Carousel.Item key={index}>
                <div className="img">
                  <img
                    style={{ width: "70%", height: "250px" }}
                    src={reservationtList.business_main_image}
                  ></img>
                </div>
                <Carousel.Caption>
                  <h3>
                    <div className="">{reservationtList.business_name}</div>
                  </h3>
                  <p>예약 수 {reservationtList.user_count}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
          <p>즐겨찾기</p>
          <div className="homeBookmarks home_carousel_section ">
            <div className="carousel_container">
              <div className="slide_wrapper">
                <div className="slide_container" ref={sliderRef}>
                  {reservationtLists.map((list, index) => {
                    return (
                      <div className="img_div" key={index}>
                        <img src={list.business_main_image} alt="" />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="index_box">
                {currentIndex} / {reservationtLists.length}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="home-container1 homeBookmarks">
          <p className="content">
            단골 내역이 없어요.😂
            <br />
            OOO(이)의 단골가게를 만들어 주세요.😊
          </p>
          {openBanner ? (
            <div
              className="btn"
              onClick={scrollCategory}
              style={{ borderRadius: "5px" }}
            >
              단골 가게 찾기🏸
            </div>
          ) : (
            ""
          )}
          <div
            className="control"
            onClick={() => {
              setOpenBanner(!openBanner);
            }}
          >
            {openBanner ? "▲" : "▼"}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeBookmarks;
