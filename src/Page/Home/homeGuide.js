import "../../CSS/homeGuide.css";
import React from "react";
import { useNavigate } from "react-router-dom";
const HomeGuide = () => {
  const navigate = useNavigate();
  const talktailuser = `${process.env.PUBLIC_URL}/image/talktailuser.png`;

  return (
    <div className="homeGuide">
      <div
        className="home-container2"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <img src={talktailuser}></img>
        <p
          onClick={() => {
            navigate("/guide_detail");
          }}
        >
          detail
        </p>
      </div>
      <div className="down_btn">
        <a href="/talktailuser.pdf" download>
          가이드 다운 ⬇️
        </a>
      </div>
    </div>
  );
};

export default HomeGuide;
