import "../../CSS/homeCarousel.css";
import React, { useRef, useState } from "react";
const HomeCarousel = () => {
  const imageArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
  return (
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
  );
};

export default HomeCarousel;
