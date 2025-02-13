import "../../CSS/homeBookmarks.css";
import "../../CSS/homeCarousel.css";
import React, { useState } from "react";

const HomeBookmarks = ({ reservationtLists, categoryRef, user }) => {
  console.log("user : ", user);
  const [openBanner, setOpenBanner] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollCategory = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const controlImg = (direction) => {
    if (direction === "left") {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };
  return (
    <div className="homeBookmarks">
      {reservationtLists.length > 0 ? (
        <>
          <p>즐겨찾기</p>
          <div
            className={`home_carousel_section ${
              openBanner ? "" : "small_section"
            }`}
          >
            <div
              className="btn"
              onClick={() => {
                if (currentIndex !== 0) {
                  controlImg("left");
                }
              }}
            >
              {"<"}
            </div>
            <div className="img_box">
              <img
                src={reservationtLists[currentIndex].business_main_image}
                alt=""
              />
            </div>
            <div
              className="btn"
              onClick={() => {
                if (currentIndex !== reservationtLists.length - 1) {
                  controlImg("right");
                }
              }}
            >
              {">"}
            </div>
          </div>
          <div className="text_box">
            <p>
              업체명 : {reservationtLists[currentIndex].business_name} / 예약수
              : {reservationtLists[currentIndex].user_count}
            </p>
            <div
              className="control color"
              onClick={() => {
                setOpenBanner(!openBanner);
              }}
            >
              {openBanner ? "축소" : "확대"}
            </div>
          </div>
        </>
      ) : user ? (
        <div className="home-container1 homeBookmarks">
          <p className="content">
            단골 내역이 없어요.😂
            <br />
            {user.pet_name
              ? `${user.pet_name}의 단골가게를 만들어 주세요.😊`
              : "펫 등록 후 예약을 진행해주세요."}
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
      ) : (
        <div className="home-container1 homeBookmarks">
          <p className="content">로그인 해주세요.</p>
        </div>
      )}
    </div>
  );
};

export default HomeBookmarks;
