import "../../CSS/homeCarousel.css";
import React, { useRef, useState, useEffect } from "react";
const HomeCarousel = () => {
  const imageArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);

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
    const { scrollLeft, clientWidth } = sliderRef.current;
    const windowWidth = getWindowWidth();
    let slideAmount = windowWidth > 500 ? 387 + 8.6 : windowWidth * 0.92;

    if (direction === "left" && currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
      sliderRef.current.scrollTo({
        left: scrollLeft - slideAmount,
        behavior: "smooth",
      });
    } else if (direction === "right" && currentIndex < imageArray.length) {
      console.log("CC");
      sliderRef.current.scrollTo({
        left: scrollLeft + slideAmount,
        behavior: "smooth",
      });
      console.log("scrollLeft : ", scrollLeft);
      console.log("slideAmount : ", slideAmount);
      setCurrentIndex(currentIndex + 1);
    }
    // sliderRef.current.scrollTo({
    //   left: slideAmount * (currentIndex - 1),
    //   behavior: "smooth",
    // });
  };

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

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (!sliderRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const windowWidth = getWindowWidth();
      let slideAmount = 0;
      if (windowWidth > 500) {
        slideAmount = 387 + 8.6;
      } else {
        slideAmount = windowWidth * 0.92;
      }
      if (scrollLeft + clientWidth >= scrollWidth) {
        sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        sliderRef.current.scrollTo({
          left: scrollLeft + slideAmount,
          behavior: "smooth",
        });
      }
    }, 2000); // 2초마다 이동

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (!sliderRef.current) return;

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const newIndex = Math.round(scrollLeft / clientWidth) + 1; // 1부터 시작
      setCurrentIndex(newIndex);
    };

    sliderRef.current.addEventListener("scroll", handleScroll);
    return () => sliderRef.current.removeEventListener("scroll", handleScroll);
  }, []);
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
                  <p>{index + 1}</p>
                </div>
              );
            })}
          </div>
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
      <div className="btn_box">
        <p
          onClick={() => {
            if (currentIndex !== 1) {
              console.log("currentIndex : ", currentIndex);
              handleSlide("left");
            }
          }}
          style={{
            color: currentIndex !== 1 ? "black" : "gray",
            cursor: currentIndex !== 1 ? "pointer" : "default",
          }}
        >
          {"<"}
        </p>
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
        <p
          onClick={() => {
            if (currentIndex !== imageArray.length) {
              console.log("BB");
              handleSlide("right");
            }
          }}
          style={{
            color: currentIndex !== imageArray.length ? "black" : "gray",
            cursor: currentIndex !== imageArray.length ? "pointer" : "default",
          }}
        >
          {">"}
        </p>
      </div>
    </div>
  );
};

export default HomeCarousel;
