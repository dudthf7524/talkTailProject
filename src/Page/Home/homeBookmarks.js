import "../../CSS/homeBookmarks.css";
import React, { useState } from "react";
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
        </>
      ) : (
        <div className="home-container1">
          <p>
            단골 내역이 없어요.😂
            <br />
            OOO(이)의 단골가게를 만들어 주세요.😊
          </p>
          <div
            className="btn"
            onClick={scrollCategory}
            style={{ borderRadius: "5px" }}
          >
            단골 가게 찾기🏸
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeBookmarks;
