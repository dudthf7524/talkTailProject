import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../CSS/auth.css'
import '../../../CSS/reservation.css'
import api from '../../../Api'
const ReservationManagement = () => {

  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const navigate = useNavigate();
  const [reservationManagementList, setReservationManagementList] = useState([]);

  useEffect(() => {
    const fetchReservationManagement = async () => {
      try {
        const response = await api.get('/api/beauty/reservation', { withCredentials: true });
        setReservationManagementList(response.data);
        console.log(response.data)
        if (response.data == 'common') {
          navigate('/business/login');
        }
      
      } catch (error) {
        console.error('로그인 인증 실패:', error);
        navigate('/business/login'); // 로그인 페이지로 리디렉션
      }
    };
    fetchReservationManagement();
  }, []);

  return (
    <div className='page-container' lang='ko'>
      <div className='navigation'>
        <button>
          <img src={arrowButtonUrl} alt='' onClick={() => navigate('/business/menu')} />
        </button>
        예약관리
        <div> </div>
      </div>
      <div className='reservation-title'>
        <div className='reservation-text'>예약신청시간</div>
        <div className='reservation-text'>예약희망시간</div>
        <div className='reservation-text'>상태</div>
        <div className='reservation-text'>상세</div>
      </div>
      <div className="horizontal-line"></div>
      {reservationManagementList.map((reservationManagement, index) => (
        <div key={index} className='reservation-row'>
          <div className='reservation-item'>{reservationManagement.reservation_applicationTime}</div>
          <div className='reservation-item'>{reservationManagement.date} {reservationManagement.start_time}</div>
          {
            reservationManagement.reservation_state === '완료' ? (
              <div className='reservation-item' style={{ fontWeight: 'bold', color: 'green' }}>완료</div>
            ) : reservationManagement.reservation_state === '대기' ? (
              <div className='reservation-item' style={{ fontWeight: 'bold', color: 'orange' }}>예약대기 중</div>
            ) : reservationManagement.reservation_state === '거절' ? (
              <div className='reservation-item' style={{ fontWeight: 'bold', color: 'red' }}>거절</div>
            ) : (
              <div className='reservation-item' style={{ fontWeight: 'bold', color: 'gray' }}>알 수 없음</div>
            )
          }
          {
            reservationManagement.platform_id === '0' ? (
              <div>전화예약</div>
            ) : (

              <div className='reservation-item'>
                <button
                  className="detail-button"
                  onClick={() =>
                    navigate(`/business/reservation/detail`, {
                      state: {
                        date: reservationManagement.date,
                        id: reservationManagement.beauty_reservation_id, // 추가
                      },
                    })
                  }
                >
                  상세보기
                </button>          
              </div>
            )
          }
        </div>
      ))}

    </div>
  );
};

export default ReservationManagement;