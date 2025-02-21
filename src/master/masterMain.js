import "../masterCss/masterMain.css";
import "../masterCss/masterModal.css";
import "../masterCss/masterSection.css";
import React, { useEffect, useState } from "react";
import MasterHeader from "./masterHeader";
import MasterNav from "./masterNav";
import MasterBusiness from "./masterBusiness";
import MasterCustomer from "./masterCustomer";
import MasterNotice from "./masterNotice";
import MasterReservation from "./masterReservation";
import api from "../Api";
import { useNavigate } from "react-router-dom";

const MasterMain = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("");
  const [master, setMaster] = useState(false);


  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await api.get("/master/auth", {
  //         withCredentials: true,
  //       });
  //       setMaster(response.data);
  //       if (!response.data) {
  //         navigate("/master"); // 로그인 페이지로 리디렉션
  //       }
  //     } catch (error) {
  //       console.error("로그인 인증 실패:", error);
  //       navigate("/master"); // 로그인 페이지로 리디렉션
  //     }
  //   };
  //   fetchUser();
  // }, []);

  
  return (

    
    <>
      <MasterHeader />
      <MasterNav
        selectPage={(page) => {
          setCurrentPage(page);
        }}
      />
      {currentPage === "notice" && <MasterNotice />}
      {currentPage === "business" && <MasterBusiness />}
      {currentPage === "customer" && <MasterCustomer />}
      {currentPage === "reservation" && <MasterReservation />}
    </>
  );
};

export default MasterMain;
