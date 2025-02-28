import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../CSS/auth.css";
import "../../../CSS/reservation.css";
import api from "../../../Api";
import dayjs from "dayjs";
import ReservationDetailModal from "../../Modal/ReservationDetailModal";

const ReservationManagement = () => {
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const navigate = useNavigate();
  dayjs.locale("ko");

  const [reservationManagementList, setReservationManagementList] = useState(
    []
  );
  const [openPickup, setOpenPickup] = useState(false);
  const [id, setId] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [petNmae, setPetName] = useState("");

  useEffect(() => {
    const fetchReservationManagement = async () => {
      try {
        const response = await api.get("/api/beauty/reservation", {
          withCredentials: true,
        });
        setReservationManagementList(response.data);
        if (response.data == "common") {
          navigate("/business/login");
        }
      } catch (error) {
        console.error("로그인 인증 실패:", error);
        navigate("/business/login"); // 로그인 페이지로 리디렉션
      }
    };
    fetchReservationManagement();
  }, []);

  return (
    <div className="page-container reservation_management_total" lang="ko">
      <div className="navigation">
        <button>
          <img
            src={arrowButtonUrl}
            alt=""
            onClick={() => navigate("/business/menu")}
          />
        </button>
        예약내역
        <div> </div>
      </div>
      <div className="reservation-title">
        <div className="reservation-text">펫이름</div>
        <div className="reservation-text">예약일시</div>
        <div className="reservation-text">상태</div>
        <div className="reservation-text">상세</div>
      </div>
      <div className="horizontal-line"></div>
      {reservationManagementList.map((reservationManagement, index) => (
        <div key={index} className="reservation-row">
          <div className="reservation-item">
            {reservationManagement.pet_name}
          </div>
          <div className="reservation-item">
            {dayjs(reservationManagement.date).format("YYYY년 M월 DD일")}
            <br />
            {dayjs(reservationManagement.date).format("(ddd) ")}
            {reservationManagement.start_time}
          </div>
          {reservationManagement.reservation_state === "픽업완료" ? (
            <div
              className="reservation-item"
              style={{ fontWeight: "bold", color: "green" }}
            >
              완료
            </div>
          ) : reservationManagement.reservation_state === "완료" ? (
            <div className="reservation-item">
              <button
                className="pickupBtn"
                onClick={() => {
                  setOpenPickup(true);
                  setId(reservationManagement.beauty_reservation_id);
                  setUserPhone(reservationManagement.user_phone);
                  setPetName(reservationManagement.pet_name);
                }}
              >
                픽업요청
              </button>
            </div>
          ) : reservationManagement.reservation_state === "대기" ? (
            <div
              className="reservation-item"
              style={{ fontWeight: "bold", color: "orange" }}
            >
              예약대기
            </div>
          ) : reservationManagement.reservation_state === "거절" ? (
            <div
              className="reservation-item"
              style={{ fontWeight: "bold", color: "red" }}
            >
              거절
            </div>
          ) : reservationManagement.reservation_state === "전화" ? (
            <div className="reservation-item">수기예약</div>
          ) : (
            <div
              className="reservation-item"
              style={{ fontWeight: "bold", color: "gray" }}
            >
              알 수 없음
            </div>
          )}

          {reservationManagement.reservation_state === "픽업완료" ? (
            <div className="reservation-item">
              <button
                className="detail-button"
                onClick={() => {
                  navigate(`/business/reservation/detail`, {
                    state: {
                      date: reservationManagement.date,
                      id: reservationManagement.beauty_reservation_id, // 추가
                    },
                  });
                }}
              >
                싱세보기
              </button>
            </div>
          ) : reservationManagement.reservation_state === "완료" ? (
            <div className="reservation-item">
              <button
                className="detail-button"
                onClick={() => {
                  navigate(`/business/reservation/detail`, {
                    state: {
                      date: reservationManagement.date,
                      id: reservationManagement.beauty_reservation_id, // 추가
                    },
                  });
                }}
              >
                싱세보기
              </button>
            </div>
          ) : reservationManagement.reservation_state === "전화" ? (
            <div className="reservation-item"></div>
          ) : (
            <div className="reservation-item">
              <button
                className="detail-button"
                onClick={() => {
                  navigate(`/business/reservation/detail`, {
                    state: {
                      date: reservationManagement.date,
                      id: reservationManagement.beauty_reservation_id, // 추가
                    },
                  });
                }}
              >
                예약확인
              </button>
            </div>
          )}
        </div>
      ))}
      {openPickup ? (
        <ReservationDetailModal
          openModal={() => {
            setOpenPickup(false);
          }}
          id={id}
          petName={petNmae}
          userPhone={userPhone}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ReservationManagement;
