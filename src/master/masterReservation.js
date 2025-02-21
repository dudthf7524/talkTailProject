import "../masterCss/masterReservation.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
const MasterReservation = () => {
  const [reservationLists, setReservationLists] = useState([]);
  useEffect(() => {
    const loadDatas = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/master/loadReservation`
        );
        setReservationLists(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    loadDatas();
  }, []);
  console.log("reservationLists : ", reservationLists);
  return (
    <div className="master_reservation master_section">
      {/* <div className="row_head row">
        <p>No</p>
        <p>플랫폼</p>
        <p>고객명</p>
        <p>전화번호</p>
        <p>가입일시</p>
        <div>내용보기</div>
      </div> */}
      {/* {reservationLists?.map((list, index) => {
              return (
                <div
                  className={`row_body row ${index % 2 === 1 ? "even" : ""}`}
                  key={index}
                >
                  <p>{index + 1}</p>
                  <p>{list.platform}</p>
                  <p>{list.user_name}</p>
                  <p>{list.user_phone}</p>
                  <p>{dayjs(list.created_at).format("YYYY.MM.DD")}</p>
                  <div
                    onClick={() => {
                      setNoticeId(list.platfor_id);
                      setOpenModal(true);
                    }}
                  >
                    내용보기
                  </div>
                </div>
              );
            })} */}
    </div>
  );
};

export default MasterReservation;
