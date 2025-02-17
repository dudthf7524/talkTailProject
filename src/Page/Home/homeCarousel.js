import "../../CSS/homeCarousel.css";
import React, { useRef, useState, useEffect } from "react";
const HomeCarousel = () => {
  // const imageArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const imageArray = [
    {
      imgUrl: "/image/cardnews_thumbnail.png",
      linkUrl: "https://www.talktail.store/guide_detail",
    },
    {
      imgUrl: "/image/cardnews_01.png",
      linkUrl: "https://blog.naver.com/creamoff2021/222747592370",
    },
    {
      imgUrl: "/image/cardnews_02.png",
      linkUrl: "https://blog.naver.com/creamoff2021/222744209767",
    },
    {
      imgUrl: "/image/cardnews_03.png",
      linkUrl: "https://blog.naver.com/creamoff2021/222633761284",
    },
    {
      imgUrl: "/image/cardnews_04.png",
      linkUrl: "https://blog.naver.com/creamoff2021/222626893225",
    },
    {
      imgUrl: "/image/cardnews_05.png",
      linkUrl: "https://blog.naver.com/creamoff2021/222626744676",
    },
  ];
  const sliderRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(1);

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
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (!sliderRef.current) return;

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const newIndex = Math.round(scrollLeft / clientWidth) + 1;
      setCurrentIndex(newIndex);
    };

    if (sliderRef.current) {
      sliderRef.current.addEventListener("scroll", handleScroll);
    }

    sliderRef.current.addEventListener("scroll", handleScroll);
    return () => {
      if (sliderRef.current) {
        sliderRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  const handleDragStart = (e) => {
    e.preventDefault();
  };
  
  return (
    <div className="home_carousel_section">
      <div className="carousel_container">
        <div className="slide_wrapper">
          <div className="slide_container" ref={sliderRef}>
            {imageArray.map((image, index) => {
              return (
                <div className="img_div" key={index}>
                  <a href={image.linkUrl} target="_blank">
                    <img
                      src={image.imgUrl}
                      alt=""
                      onDragStart={handleDragStart}
                     
                    />
                  </a>
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
    </div>
  );
};

export default HomeCarousel;
