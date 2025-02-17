import "../../CSS/selectedDateModal.css";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDate } from "../../redux/reservationData";
import { setStartTime } from "../../redux/reservationData";

const SelectedDateModal = ({
  openModal,
  selectDate,
  activeTime,
  selectDay,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleItemClick = async () => {
    console.log("모달 속 selecteDate : ", selectDate);
    console.log("모달 속 activeTime : ", activeTime);

    dispatch(setDate(selectDate));
    dispatch(setStartTime(activeTime));

    navigate(`/pet-select/1`);
  };
  return (
    <>
      <div className="back" onClick={openModal}></div>
      <div className="modal_container selectedDateModal">
        <img onClick={openModal} src="/PageImage/components/X.svg" alt="" />
        <p className="title">예약하기</p>
        <p className="content">
          아래 내용이 맞는지 확인해주세요<br />
          일정 : {selectDate}({selectDay}) {activeTime}시
        
        </p>
        <div className="btn_box">
          <div className="btn" onClick={openModal}>
            다시선택
          </div>
          <div className="btn" onClick={handleItemClick}>
            다음단계
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedDateModal;
