import "../../CSS/homeCarousel.css";
import React, { useRef, useState, useEffect } from "react";
const HomeCarousel = () => {
  const imageArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // 드래그 속도 조절
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const getWindowWidth = () => window.innerWidth;

  const handleSlide = (direction) => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    const windowWidth = getWindowWidth();
    let slideAmount = 0;
    if (windowWidth > 500) {
      slideAmount = 387 + 8.6;
    } else {
      slideAmount = windowWidth * 0.92;
    }
    if (direction === "left") {
      sliderRef.current.scrollTo({
        left: scrollLeft - slideAmount,
        behavior: "smooth",
      });
    } else {
      const newScrollLeft = scrollLeft + slideAmount;

      if (newScrollLeft + clientWidth >= scrollWidth) {
        sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        sliderRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (!sliderRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

      if (scrollLeft + clientWidth >= scrollWidth) {
        // 마지막까지 가면 처음으로 이동
        sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        handleSlide("right");
      }
    }, 2000); // 2초마다 이동

    return () => clearInterval(interval);
  }, [isPlaying]);
  return (
    <div className="home_carousel_section">
      <div className="carousel_container">
        <div className="slide_wrapper">
          <div
            className="slide_container"
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {imageArray.map((image, index) => {
              return (
                <div className="img_div" key={index}>
                  <p>{index}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="btn_box">
        <p onClick={() => handleSlide("left")}>{"<"}</p>
        {!isPlaying ? (
          <p
            onClick={() => {
              setIsPlaying(true);
            }}
          >
            ▶
          </p>
        ) : (
          <p
            onClick={() => {
              setIsPlaying(false);
            }}
          >
            ⏸
          </p>
        )}

        <p onClick={() => handleSlide("right")}>{">"}</p>
      </div>
    </div>
  );
};

export default HomeCarousel;
