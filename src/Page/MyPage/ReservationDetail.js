import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import '../CSS/auth.css'
// import '../CSS/reservation.css'
// import ReservationAcceptModal from './Modal/ReservationAccept';
// import ReservationRejectModal from './Modal/ReservationReject';
// import ReservationCheckModal from './Modal/ReservationCheck';
// import '../CSS/reservationModal.css'
import api from "../../Api";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { addMinutes, format, isWithinInterval, parse } from "date-fns";
const ReservationDetail = () => {
  dayjs.locale("ko");
  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const { id } = useParams();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isCheckModalOpen, setCheckModalOpen] = useState(false);
  const [checkMessage, setCheckMessage] = useState("");
  const [actionType, setActionType] = useState("");
  const [reservationManagementList, setReservationManagementList] = useState(
    []
  );
  const [reservationCompleteTime, setReservationCompleteTime] = useState(""); // 완료 시간 상태 추가

  const [formData, setFormData] = useState({
    beauty_price: 0,
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/beauty/reservation/detail/${id}`, {
          withCredentials: true,
        });
        setReservationManagementList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("예약관리 상세보기 실패", error);
      }
    };
    fetchUser();
  }, []);

  const formatInfo = (text) => {
    return text.split("\n").map((item, index) => (
      <React.Fragment key={index}>
        {item}
        <br />
      </React.Fragment>
    ));
  };

  const openModal = (type) => {
    setActionType(type);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleConfirm = async () => {
    console.log(reservationManagementList.business_name);
    console.log(reservationManagementList.business_phone);
    console.log(formData.business_no_show);
    console.log("reservationCompleteTime");
    console.log(reservationCompleteTime);
    console.log("reservationCompleteTime");
    const beauty_price = formData.beauty_price;
    const business_name = reservationManagementList.business_name;
    const business_phone = reservationManagementList.business_phone;
    const start_time = reservationManagementList.start_time;
    const date = reservationManagementList.date;
    const user_phone = reservationManagementList.user_phone;
    const paid_price = reservationManagementList.paid_price;
    try {
      console.log(reservationCompleteTime);
      const response = await api.put(
        `/api/beauty/reservation/setCompleteTime/${id}`,
        {
          reservationCompleteTime,
          beauty_price,
          business_name,
          business_phone,
          start_time,
          date,
          user_phone,
          paid_price,
        },
        { withCredentials: true }
      );
      console.log("수락");

      console.log(response.data);
      if (response.data === "success") {
        setCheckMessage("확정되었습니다.");
        setModalOpen(false);
        setCheckModalOpen(true);
        setTimeout(() => {
          window.location.href = "/business/reservation/management";
        }, 2000); // 2초 후 리다이렉트
      }
    } catch (error) {
      console.error("예약 완료 실패:", error);
    }
  };

  const handleReject = async (rejectComment) => {
    console.log("거절:", rejectComment); // 거절 사유 확인
    console.log("거절:", rejectComment); // 거절 사유 확인
    const business_name = reservationManagementList.business_name;
    const business_phone = reservationManagementList.business_phone;
    const user_phone = reservationManagementList.user_phone;

    try {
      const response = await api.put(
        `/api/beauty/reservation/reject/${id}`,
        { rejectComment, business_name, business_phone, user_phone },
        { withCredentials: true }
      );
      console.log("수락");
      setCheckMessage("확정되었습니다.");
      setModalOpen(false);
      setCheckModalOpen(true);

      console.log(response.data);

      setTimeout(() => {
        navigate("/business/reservation/management");
      }, 2000); // 2초 후 리다이렉트
    } catch (error) {
      console.error("예약 완료 실패:", error);
    }
    setCheckMessage("거절사유를 전송했습니다.");
    setModalOpen(false);
    setCheckModalOpen(true);
  };

  if (!reservationManagementList) {
    return <div>로딩 중... </div>;
  }
  const handleButtonClick = (time) => {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="page-container2" lang="ko">
      <div className="navigation">
        <button>
          <img src={arrowButtonUrl} alt="" onClick={() => navigate(-1)} />
        </button>
        상세보기
        <div> </div>
      </div>

      <div className="detail-form1">
        <div className="detail-form2">
          <div className="detail-title">디자이너</div>
          <div className="detail-info">
            {reservationManagementList.business_desinger_name}
          </div>
        </div>
        {/* <div className="detail-form2">
          <div className="detail-title">보호자 연락처</div>
          <div className="detail-info">
            {reservationManagementList.user_phone}
          </div>
        </div>
        <div className="detail-form2">
          <div className="detail-title">반려동물 이름</div>
          <div className="detail-info">
            {reservationManagementList.pet_name}
          </div>
        </div>
        <div className="detail-form2">
          <div className="detail-title">반려동물 종</div>
          <div className="detail-info">
            {reservationManagementList.pet_species}
          </div>
        </div>
        <div className="detail-form2">
          <div className="detail-title">반려동물 품종</div>
          <div className="detail-info">
            {reservationManagementList.pet_breed}
          </div>
        </div>
        <div className="detail-form2">
          <div className="detail-title">몸무게</div>
          <div className="detail-info">
            {reservationManagementList.pet_weight} kg
          </div>
        </div>
        <div className="detail-form2">
          <div className="detail-title">나이</div>
          <div className="detail-info">
            {reservationManagementList.pet_birth} 세
          </div>
        </div>
        <div className="detail-form2">
          <div className="detail-title">성별</div>
          {reservationManagementList.pet_gender ? (
            <div className="detail-info">남</div>
          ) : (
            <div className="detail-info">여</div>
          )}
        </div>
        <div className="detail-form2">
          <div className="detail-title">중성화 여부</div>
          <div className="detail-info">
            {reservationManagementList.pet_neuter}
          </div>
        </div> */}
        <div className="detail-form2">
          <div className="detail-title">스타일</div>
          <div className="detail-info">
            {reservationManagementList.beauty_style}
          </div>
        </div>
        {/* <div className="detail-form2">
          <div className="detail-title">특이사항</div>
          <div className="detail-info">
            {reservationManagementList.beauty_significant}
          </div>
        </div>
        <div className="detail-form2">
          <div className="detail-title">주의사항</div>
          <div className="detail-info">
            {reservationManagementList.beauty_caution}
          </div>
        </div> */}
        <div className="detail-form2">
          <div className="detail-title">예약날짜</div>
          <div className="detail-info">
            {dayjs(reservationManagementList.date).format("M월DD일 (ddd)")}
          </div>
        </div>
        <div className="detail-form2">
          <div className="detail-title">시작시간</div>
          <div className="detail-info">
            {reservationManagementList.start_time}
          </div>
        </div>

        <div className="detail-form2">
          {reservationManagementList.reservation_state === "픽업완료" ? (
            <div className="detail-title">완료시간</div>
          ) :reservationManagementList.reservation_state === "완료" ? (
            <div className="detail-title">완료시간</div>
          ) : reservationManagementList.reservation_state === "대기" ? (
            <div className="detail-title">완료시간</div>
          ) : reservationManagementList.reservation_state === "거절" ? (
            <div className="detail-title">사유</div>
          ) : (
            <div style={{ fontWeight: "bold", color: "gray" }}>알 수 없음</div>
          )}

          {reservationManagementList.reservation_state === "픽업완료" ? (
            <div className="detail-info">
              {reservationManagementList.end_time}
            </div>
          ) :reservationManagementList.reservation_state === "완료" ? (
            <div className="detail-info">
              {reservationManagementList.end_time}
            </div>
          ) : reservationManagementList.reservation_state === "대기" ? (
            <div className="detail-info">
              {reservationManagementList.business_name}에서<br></br> 시간을 확인
              중 입니다.
            </div>
          ) : reservationManagementList.reservation_state === "거절" ? (
            <div
              className="detail-info"
              style={{ color: "red", fontWeight: "bold" }}
            >
              {reservationManagementList.reject_content}
            </div>
          ) : (
            <div style={{ fontWeight: "bold", color: "gray" }}>알 수 없음</div>
          )}
        </div>
        {reservationManagementList.reservation_state === "픽업완료" ? (
          <div className="detail-form2">
            <div className="detail-title">미용금액</div>
            <div className="detail-info">
              {reservationManagementList.beauty_price.toLocaleString()}원
            </div>
          </div>
        ) : reservationManagementList.reservation_state === "완료" ? (
          <div className="detail-form2">
            <div className="detail-title">미용금액</div>
            <div className="detail-info">
              {reservationManagementList.beauty_price.toLocaleString()}원
            </div>
          </div>
        ) : reservationManagementList.reservation_state === "대기" ? (
          <div className="detail-form2">
            <div className="detail-title">미용금액</div>
            <div className="detail-info">
              {reservationManagementList.business_name}에서<br></br> 금액을
              책정중입니다.
            </div>
          </div>
        ) : (
          <div className="detail-info"></div>
        )}
      </div>

      {reservationManagementList.reservation_state === "완료" ? (
        <div className="footer-button">예약이 완료되었습니다:)</div>
      ) : reservationManagementList.reservation_state === "대기" ? (
        <div className="footer-button">
          {/* <button className='reject-btn' onClick={() => openModal('reject')}>거절</button>
            <button className='accept-btn' onClick={() => openModal('accept')}>수락</button> */}
        </div>
      ) : reservationManagementList.reservation_state === "거절" ? (
        <div
          className="footer-button"
          style={{ color: "red", fontWeight: "bold" }}
        >
          예약이 거절되었습니다.
        </div>
      ) : (
        <div style={{ fontWeight: "bold", color: "gray" }}>알 수 없음</div>
      )}
    </div>
  );
};

export default ReservationDetail;
