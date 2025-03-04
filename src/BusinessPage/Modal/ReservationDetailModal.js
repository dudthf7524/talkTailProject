import "../../CSS/reservationDetailModal.css";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import api from "../../Api";

const ReservationDetailModal = ({ openModal, id, petName, userPhone }) => {
  const [selectMinute, setSelectMinute] = useState(20);
  const [completeTime, setCompleteTime] = useState("");

  const sendMessage = async () => {
    const calculatedTime = dayjs().add(selectMinute, "minute").format("HH:mm");

    try {
      const response = await api.post(
        `/api/reservation/picup`,
        { id, userPhone, petName, selectMinute, completeTime },
        { withCredentials: true }
      );
      window.location.href = "/business/reservation/management";
    } catch (error) {
      console.error(error);
    }
  };
  const minutes = [10, 20, 30];
  const showMessage = (e) => {
    const selectedValue = Number(e.target.value);
    setSelectMinute(selectedValue);

    // 현재 시간에 선택한 분(minute) 추가
    const calculatedTime = dayjs().add(selectedValue, "minute").format("HH:mm");
    setCompleteTime(calculatedTime);
  };
  useEffect(() => {
    const calculatedTime = dayjs().add(selectMinute, "minute").format("HH:mm");
    setCompleteTime(calculatedTime);
  }, []);
  const formatCompleteTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    return `${hour}시 ${minute}분`;
  };
  const btnUrl = `${process.env.PUBLIC_URL}/image/plane_btn.png`;
  return (
    <div className="reservation_modal">
      <img onClick={openModal} src="/PageImage/components/X.svg" alt="" />
      <p className="title">픽업 요청 안내문</p>
      <p className="subTitle">픽업 요청 시간</p>
      <div className="selectBox">
        <p></p>
        <select value={selectMinute} onChange={showMessage}>
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute}분
            </option>
          ))}
        </select>
        <p>후</p>
      </div>

      <p>" {formatCompleteTime(completeTime)} "</p>
      <p className="subTitle">전송되는 메시지</p>
      <p className="text">
        :안녕하세요! 😊
        <br />
        {petName} 보호자님~ {petName}의 미용이 {selectMinute}분 후에 마무리될
        예정입니다.
        <br />
        우리 아이가 너무 오래 기다리지 않도록, "{" "}
        {formatCompleteTime(completeTime)} " 까지 픽업 부탁드립니다! 💖
        <br />
        혹시 시간 내 픽업이 어려우신 경우 연락 부탁드리며, 예정된 픽업 시간 이후
        추가 요금이 발생할 수 있는 점 양해 부탁드립니다.
        <br />
        감사합니다. 😊
      </p>
      <div className="sendBtn" onClick={sendMessage}>
        <img src={btnUrl} alt="" />
      </div>
    </div>
  );
};

export default ReservationDetailModal;
