import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../CSS/auth.css'
import '../CSS/reservation.css'
import ReservationAcceptModal from './Modal/ReservationAccept';
import ReservationRejectModal from './Modal/ReservationReject';
import ReservationCheckModal from './Modal/ReservationCheck';
import '../CSS/reservationModal.css'
import api from '../Api'
import { addMinutes, format, isWithinInterval, parse } from 'date-fns';
const ReservationDetail = () => {

  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const { id } = useParams();
  const location = useLocation();

  // 부모 컴포넌트에서 전달된 date 값 가져오기
  const { date } = location.state || {}; // state가 없는 경우 대비
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCheckModalOpen, setCheckModalOpen] = useState(false);
  const [checkMessage, setCheckMessage] = useState('');
  const [actionType, setActionType] = useState('');
  const [reservationManagementList, setReservationManagementList] = useState([]);
  const [reservationCompleteTime, setReservationCompleteTime] = useState(''); // 완료 시간 상태 추가
  const [timeList, setTimeLists] = useState([]);
 
  const [formData, setFormData] = useState({
    beauty_price: 0,
  });

  
  useEffect(() => {
    const fetchUser = async () => {
      console.log(date)
      try {
        const response = await api.get(`/api/beauty/reservation/detail/${id}/${date}`, { withCredentials: true });
        console.log(response.data)
        setReservationManagementList(response.data[0]);
        setTimeLists(response.data[1]);
        
      } catch (error) {

        console.error('예약관리 상세보기 실패', error);
        navigate('/business/login'); // 로그인 페이지로 리디렉션
      }
    };
    fetchUser();
  }, []);

 
  console.log(timeList)
  const openModal = (type) => {
    setActionType(type);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleConfirm = async () => {

    console.log(reservationManagementList.business_name)
    console.log(reservationManagementList.business_phone)
    console.log(formData.business_no_show)
    console.log("reservationCompleteTime")
    console.log(reservationCompleteTime)
    console.log("reservationCompleteTime")
    const beauty_price = formData.beauty_price;
    const business_name = reservationManagementList.business_name;
    const business_phone = reservationManagementList.business_phone;
    const start_time = reservationManagementList.start_time;
    const date = reservationManagementList.date;
    const user_phone = reservationManagementList.user_phone;
    const paid_price = reservationManagementList.paid_price;
    try {
      console.log(reservationCompleteTime)
      const response = await api.put(`/api/beauty/reservation/setCompleteTime/${id}`, { reservationCompleteTime, beauty_price, business_name, business_phone, start_time, date, user_phone, paid_price }, { withCredentials: true });
      console.log('수락');


      console.log(response.data)
      if (response.data === 'success') {
        setCheckMessage('확정되었습니다.');
        setModalOpen(false);
        setCheckModalOpen(true);
        setTimeout(() => {
          window.location.href = '/business/reservation/management';
        }, 2000); // 2초 후 리다이렉트
      }


    } catch (error) {
      console.error('예약 완료 실패:', error);
    }


  };

  const handleReject = async (rejectComment) => {

    console.log('거절:', rejectComment); // 거절 사유 확인
    console.log('거절:', rejectComment); // 거절 사유 확인
    const business_name = reservationManagementList.business_name;
    const business_phone = reservationManagementList.business_phone;
    const user_phone = reservationManagementList.user_phone;
    
    try {

      const response = await api.put(`/api/beauty/reservation/reject/${id}`, { rejectComment, business_name, business_phone, user_phone }, { withCredentials: true });
      console.log('수락');
      setCheckMessage('확정되었습니다.');
      setModalOpen(false);
      setCheckModalOpen(true);

      console.log(response.data)


      setTimeout(() => {
        navigate('/business/reservation/management');
      }, 2000); // 2초 후 리다이렉트
    } catch (error) {
      console.error('예약 완료 실패:', error);
    }
    setCheckMessage('거절사유를 전송했습니다.');
    setModalOpen(false);
    setCheckModalOpen(true);
  };
  const businessStartTime = '09:00';
  const businessEndTime = '18:00';

  const timeSlots = generateTimeSlots(businessStartTime, businessEndTime, 30);

  function generateTimeSlots(start_time, end_time, intervalMinutes) {
    const start = parse(start_time, 'HH:mm', new Date());
    const end = parse(end_time, 'HH:mm', new Date());

    const totalIntervals = Math.floor((end - start) / (intervalMinutes * 60 * 1000)); // 총 간격 수 계산

    return Array.from({ length: totalIntervals + 1 }, (_, index) => {
      const newTime = addMinutes(start, intervalMinutes * index);
      return format(newTime, 'HH:mm');
    });
  }

  let start_time = reservationManagementList?.start_time || '00:00';
  let end_time = reservationManagementList?.end_time || '23:59';


  const now = new Date();


  const filteredTimeSlots = timeSlots.filter((time) => {
    const current = parse(time, 'HH:mm', new Date());
    const start = parse(start_time, 'HH:mm', new Date());
    return current >= start; // starttime 이후의 시간대만 필터링
  });

  const disabledTimes = (() => {
    const start = parse(start_time, 'HH:mm', new Date());
    const end = parse(end_time, 'HH:mm', new Date());
    const disabledTimes = [];

    timeSlots.forEach((time) => {
      const current = parse(time, 'HH:mm', new Date());
      if (isWithinInterval(current, { start, end: new Date(end.getTime() - 1) })) {
        disabledTimes.push(time);
      }
    });

    return disabledTimes;
  })();







  const [modalData, setModalData] = useState(null);
  const [activeTime, setActiveTime] = useState(null);


  if (!reservationManagementList) {
    return (
      <div>로딩 중... </div>
    )
  }
  const handleButtonClick = (time) => {
    console.log("time")
    console.log(time)
    console.log("time")

    console.log("reservationCompleteTime")
    setReservationCompleteTime(time)

    console.log(reservationCompleteTime)
    console.log("reservationCompleteTime")
    setActiveTime(time);

    console.log("activeTime")
    console.log(activeTime)
    console.log("activeTime")

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className='page-container2' lang='ko'>
      <div className='navigation'>
        <button>
          <img src={arrowButtonUrl} alt='' onClick={() => navigate('/business/reservation/management')} />
        </button>
        상세보기
        <div> </div>
      </div>

      <div className='detail-form1'>
        <div className='detail-form2'>
          <div className='detail-title'>미용사</div>
          <div className='detail-info'>{reservationManagementList.business_desinger_name}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>보호자 연락처</div>
          <div className='detail-info'>{reservationManagementList.user_phone}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>반려동물 이름</div>
          <div className='detail-info'>{reservationManagementList.pet_name}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>반려동물 종</div>
          <div className='detail-info'>{reservationManagementList.pet_species}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>반려동물 품종</div>
          <div className='detail-info'>{reservationManagementList.pet_breed}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>몸무게</div>
          <div className='detail-info'>{reservationManagementList.pet_weight} kg</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>나이</div>
          <div className='detail-info'>{reservationManagementList.pet_birth} 세</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>성별</div>
          {
            reservationManagementList.pet_gender
              ? <div className='detail-info'>남</div>
              : <div className='detail-info'>여</div>
          }
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>중성화 여부</div>
          <div className='detail-info'>{reservationManagementList.pet_neuter}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>스타일</div>
          <div className='detail-info'>{reservationManagementList.beauty_style}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>특이사항</div>
          <div className='detail-info'>{reservationManagementList.beauty_significant}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>주의사항</div>
          <div className='detail-info'>{reservationManagementList.beauty_caution}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>예약날짜</div>
          <div className='detail-info'>{reservationManagementList.date}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>시작시간</div>
          <div className='detail-info'>{reservationManagementList.start_time}</div>
        </div>

        <div className='detail-form2'>
          {
            reservationManagementList.reservation_state === '완료' ? (
              <div className='detail-title'>완료시간</div>
            ) : reservationManagementList.reservation_state === '대기' ? (
              <div className='detail-title'>완료시간</div>
            ) : reservationManagementList.reservation_state === '거절' ? (
              <div className='detail-title'>거절내용</div>
            ) : (
              <div style={{ fontWeight: 'bold', color: 'gray' }}>알 수 없음</div>
            )
          }


          {
            reservationManagementList.reservation_state === '완료' ? (
              <div className='detail-info'>
                {reservationManagementList.end_time}
              </div>
            ) : reservationManagementList.reservation_state === '대기' ? (
              <div id="modal-body">
                <div className="time-selection">
                  {filteredTimeSlots?.map((time) => (
                    <div
                      key={time}
                      className={`time-box ${activeTime === time ? 'clicked' : ''} ${disabledTimes.includes(time) ? 'disabled' : ''}`}
                      onClick={() => !disabledTimes.includes(time) && handleButtonClick(time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            ) : reservationManagementList.reservation_state === '거절' ? (
              <div className='detail-info' style={{ color: "red", fontWeight: "bold" }}>
                {reservationManagementList.reject_content}
              </div>
            ) : (
              <div style={{ fontWeight: 'bold', color: 'gray' }}>알 수 없음</div>
            )
          }
        </div>
        {
          reservationManagementList.reservation_state === '완료' ? (
            <div className='detail-form2'>
              <div className='detail-title'>미용금액</div>
              <div className='detail-info'>{reservationManagementList.beauty_price} 원</div>
            </div>
          ) : reservationManagementList.reservation_state === '대기' ? (
            <div className='detail-form2'>
              <div className='detail-title'>미용가격</div>
              <div className='detail-info'><input
                type="number"
                name="beauty_price"
                min="0"
                step="1000" // 1000 단위로 값 증가
                onChange={handleInputChange}
              />
              </div>
            </div>
          ) : (
            <div className='detail-info'>

            </div>
          )
        }

      </div>



      {
        reservationManagementList.reservation_state === '완료' ? (
          <div className='footer-button'>
            예약이 완료되었습니다.
          </div>
        ) : reservationManagementList.reservation_state === '대기' ? (
          <div className='footer-button'>
            <button className='reject-btn' onClick={() => openModal('reject')}>거절</button>
            <button className='accept-btn' onClick={() => openModal('accept')}>수락</button>
          </div>
        ) : reservationManagementList.reservation_state === '거절' ? (
          <div className='footer-button' style={{ color: "red", fontWeight: "bold" }}>
            예약이 거절되었습니다.
          </div>
        ) : (
          <div style={{ fontWeight: 'bold', color: 'gray' }}>알 수 없음</div>
        )
      }

      <ReservationAcceptModal
        isOpen={isModalOpen && actionType === 'accept'}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
        actionType={actionType}
      />

      <ReservationRejectModal
        isOpen={isModalOpen && actionType === 'reject'}
        onClose={() => setModalOpen(false)}
        onConfirm={handleReject}
        actionType={actionType}
      />

      <ReservationCheckModal
        isOpen={isCheckModalOpen}
        onClose={() => setCheckModalOpen(false)}
        message={checkMessage}
      />
    </div>
  );
};

export default ReservationDetail;