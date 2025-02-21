import "../masterCss/masterHeader.css";
import React from "react";
import { useNavigate } from "react-router-dom";
const MasterHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="master_header">
      <img src="/image/talkTail_logo.png" alt="" />
      <p
        onClick={() => {
          navigate("/master/main");
        }}
      >
        Master Admin
      </p>
      <p>로그아웃</p>
      <div className="btn_box">
        <div
          className="btn"
          onClick={() => {
            navigate("/");
          }}
        >
          고객용
        </div>
        <div
          className="btn"
          onClick={() => {
            navigate("/business/login");
          }}
        >
          가게용
        </div>
      </div>
    </div>
  );
};

export default MasterHeader;
