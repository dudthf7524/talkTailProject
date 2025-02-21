import "../masterCss/masterMain.css";
import "../masterCss/masterModal.css";
import "../masterCss/masterSection.css";
import React, { useState } from "react";
import MasterHeader from "./masterHeader";
import MasterNav from "./masterNav";
import MasterBusiness from "./masterBusiness";
import MasterCustomer from "./masterCustomer";
import MasterNotice from "./masterNotice";
import MasterReservation from "./masterReservation";

const MasterMain = () => {
  const [currentPage, setCurrentPage] = useState("");
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
