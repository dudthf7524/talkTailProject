import "../masterCss/masterCustomer.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const MasterCustomer = () => {
  const [customerLists, setCustomerLists] = useState([]);
  useEffect(() => {
    const loadDatas = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/master/loadNotice`
        );
        setCustomerLists(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    loadDatas();
  }, []);
  console.log("customerLists : ", customerLists);
  return (
    <div className="master_customer master_section">
      <p>No</p>
      <p>명</p>
      <p>고객명/펫이름</p>
      <p>예약일시</p>
      <p>작성일시</p>
      <div>내용보기</div>
    </div>
  );
};

export default MasterCustomer;
