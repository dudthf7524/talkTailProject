import "../masterCss/masterNav.css";
import React, { useState } from "react";

const MasterNav = ({ selectPage }) => {
  const [currentPage, setCurrentPage] = useState("");
  return (
    <div className="master_nav">
      <div
        className={`tab ${currentPage === "notice" ? "active" : ""}`}
        onClick={() => {
          selectPage("notice");
          setCurrentPage("notice");
        }}
      >
        알림장
      </div>
      <div
        className={`tab ${currentPage === "business" ? "active" : ""}`}
        onClick={() => {
          selectPage("business");
          setCurrentPage("business");
        }}
      >
        가게
      </div>
      <div
        className={`tab ${currentPage === "customer" ? "active" : ""}`}
        onClick={() => {
          selectPage("customer");
          setCurrentPage("customer");
        }}
      >
        고객
      </div>
      <div
        className={`tab ${currentPage === "reservation" ? "active" : ""}`}
        onClick={() => {
          selectPage("reservation");
          setCurrentPage("reservation");
        }}
      >
        예약
      </div>
    </div>
  );
};

export default MasterNav;
