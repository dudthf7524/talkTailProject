import "../../CSS/homeAd.css";
import React, { useState, useEffect } from "react";

const HomeAd = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const imageArr = [
    {
      imgUrl: "/image/ad_01.png",
      link: "https://smartstore.naver.com/comitor_pet?NaPm=ct%3Dm7cy7ebc%7Cci%3Dcheckout%7Ctr%3Dds%7Ctrx%3Dnull%7Chk%3D1456157867bdd98bd98c18c661ba4e12d7c0672a",
    },
    { imgUrl: "/image/ad_02.png", link: "https://naver.me/GkRSK5TC" },
    {
      imgUrl: "/image/ad_03.png",
      link: "https://m.booking.naver.com/booking/6/bizes/1198260?area=bmp&service-target=nmap&theme=place&fbclid=PAZXh0bgNhZW0CMTEAAaY2vlrDvTo0oPZldWurATBDCTT-g2bvIVvahU2FKOm-4LcJQjFST-8e7rQ_aem_i-OQ1vJFP6X7UoLxS-iV7A",
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % imageArr.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homeAd">
      <a href={imageArr[currentImg].link} target="_blank">
        <img src={imageArr[currentImg].imgUrl} alt="" />
      </a>
    </div>
  );
};

export default HomeAd;
