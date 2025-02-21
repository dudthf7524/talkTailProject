import "../masterCss/masterBusiness.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MasterBusinessModal from "./masterBusinessModal";
import dayjs from "dayjs";
const MasterBusiness = () => {
  const [businessLists, setBusinessLists] = useState([]);
  const [businessId, setBusinessId] = useState();
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const loadDatas = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/master/loadBusiness`
        );
        setBusinessLists(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    loadDatas();
  }, []);
  return (
    <div className="master_business master_section">
      <div className="row_head row">
        <p>No</p>
        <p>가게명</p>
        <p>가게전화번호</p>
        <p>등록일시</p>
        <div>내용보기</div>
      </div>
      {businessLists?.map((list, index) => {
        return (
          <div
            className={`row_body row ${index % 2 === 1 ? "even" : ""}`}
            key={index}
          >
            <p>{index + 1}</p>
            <p>{list.business_registration_name}</p>
            <p>{list.business_owner_phone}</p>
            <p>{dayjs(list.created_at).format("YY.MM.DD - HH:mm")}</p>
            <div
              onClick={() => {
                setBusinessId(list.business_registration_number);
                setOpenModal(true);
              }}
            >
              내용보기
            </div>
          </div>
        );
      })}
      {openModal ? (
        <MasterBusinessModal
          openModal={() => {
            setOpenModal(false);
          }}
          businessId={businessId}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default MasterBusiness;
