import "../../CSS/homeAd.css";
import React, { useState, useEffect } from "react";

const HomeAd = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const imageArr = ["/image/ad_01.png", "/image/ad_02.png", "/image/ad_03.png"];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % imageArr.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homeAd">
      <img src={imageArr[currentImg]} alt="" />;
    </div>
  );
};

export default HomeAd;
