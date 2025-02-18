import NButtonContainer from "../Components/NavigatorBar/NButtonContainer";
import { useNavigate } from "react-router-dom";
import "../../CSS/myPage.css";
import { useEffect, useState } from "react";
import api from "../../Api";
import "../../CSS/reservation.css";
import dayjs from "dayjs";
const Reservation = () => {
  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;

  const [reservationtList, setReservationtList] = useState([]);

  useEffect(() => {
    const reservationManagement = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found.");
        }
        const response = await api.get("/api/user/reservation", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReservationtList(response.data.reservation);
        console.log(response.data);
      } catch (error) {
        console.error("로그인 인증 실패:", error);
      }
    };
    reservationManagement();
  }, []);

  return (
    <div lang="ko">
      <div className="userReservation_total">
        <div className="navigation ">
          <div>
            <button>
              <img src={arrowButtonUrl} alt="" onClick={() => navigate(-1)} />
            </button>
          </div>
          예약내역
          <div></div>
        </div>
        <div className="reservation-title">
          <div className="reservation-text">펫이름</div>
          <div className="reservation-text">예약일시</div>
          <div className="reservation-text">상태</div>
          <div className="reservation-text">상세보기</div>
        </div>
        <div className="horizontal-line"></div>
        {reservationtList.map((reservation, index) => (
          <div key={index} className="reservation-row">
            <div className="reservation-item">
              {reservation.pet_name}
            </div>
            <div className="reservation-item">
              {dayjs(reservation.date).format("YYYY년 M월DD일 (ddd)")}
              {reservation.start_time}
            </div>
            {reservation.reservation_state === "완료" ? (
              <div style={{ fontWeight: "bold", color: "green" }}>예약완료</div>
            ) : reservation.reservation_state === "대기" ? (
              <div style={{ fontWeight: "bold", color: "orange" }}>
                예약대기
              </div>
            ) : reservation.reservation_state === "거절" ? (
              <div style={{ fontWeight: "bold", color: "red" }}>예약거절</div>
            ) : (
              <div style={{ fontWeight: "bold", color: "gray" }}>
                알 수 없음
              </div>
            )}
            <div className="reservation-item">
              <button
                className="detail-button"
                onClick={() =>
                  navigate(
                    `/reservation/detail/${reservation.beauty_reservation_id}`
                  )
                }
              >
                상세보기
              </button>
            </div>
          </div>
        ))}
      </div>

      <NButtonContainer />
    </div>
  );
};

export default Reservation;
