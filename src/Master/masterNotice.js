import "../masterCss/masterNotice.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MasterNoticeModal from "./masterNoticeModal";

const MasterNotice = () => {
  const [noticeLists, setNoticeLists] = useState([]);
  const [noticeId, setNoticeId] = useState();
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const loadDatas = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/master/loadNotice`
        );
        setNoticeLists(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    loadDatas();
  }, []);
  return (
    <div className="master_notice master_section">
      <div className="row_head row">
        <p>No</p>
        <p>가게명</p>
        <p>고객명/펫이름</p>
        <p>예약일시</p>
        <p>작성일시</p>
        <div>내용보기</div>
      </div>
      {noticeLists?.map((list, index) => {
        return (
          <div
            className={`row_body row ${index % 2 === 1 ? "even" : ""}`}
            key={index}
          >
            <p>{index + 1}</p>
            <p>{list.business_registration_name}</p>
            <p>
              {list.user_name}/{list.pet_name}
            </p>
            <p>2025.02.18 18:00</p>
            <p>2025.02.18 19:15</p>
            <div
              onClick={() => {
                setNoticeId(list.beauty_notice_id);
                setOpenModal(true);
              }}
            >
              내용보기
            </div>
          </div>
        );
      })}
      {openModal ? (
        <MasterNoticeModal
          openModal={() => {
            setOpenModal(false);
          }}
          noticeId={noticeId}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default MasterNotice;
