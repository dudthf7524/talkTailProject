import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/auth.css'
import '../CSS/reservation.css'
import api from '../Api'
const ReservationManagement = () => {

  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/button/arrow_left.svg`;

  const [reservationManagementList, setReservationManagementList] = useState([]);


  useEffect(() => {
    const fetchReservationManagement = async () => {
      try {
        const response = await api.get('/api/beauty/reservation', { withCredentials: true });
        setReservationManagementList(response.data);
        console.log(response.data)
      } catch (error) {

        console.error('로그인 인증 실패:', error);
        navigate('/business/login'); // 로그인 페이지로 리디렉션
      }
    };
    fetchReservationManagement();
  }, []);

  const reservations = [
    {
      requestTime: '24-05-10-13:39',
      desiredTime: '24-05-12-15:00',
      status: '완료',
      detailButton: '상세보기'
    },
    {
      requestTime: '24-05-10-13:39',
      desiredTime: '24-05-12-15:00',
      status: '완료',
      detailButton: '상세보기'
    },
  ];

  return (
    <div className='page-container' lang='ko'>
      <div className='navigation'>
        <button>
          <img src={arrowButtonUrl} alt='' onClick={() => navigate('/admin-menu')} />
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
      <div class="horizontal-line"></div>
      {reservationManagementList.map((reservationManagement, index) => (
        <div key={index} className='reservation-row'>
          <div className='reservation-item'>{reservationManagement.reservationApplicationTime}</div>
          <div className='reservation-item'>{reservationManagement.reservationDesiredTime}</div>
          {
            reservationManagement.beauty_reservation_is_avaiable
              ?
              <div className='reservation-item'>완료</div>
              :
              <div className='reservation-item'>예약대기 중</div>

          }
          <div className='reservation-item'>
            <button className='detail-button' onClick={() => navigate(`/business/reservation/detail/${reservationManagement.beauty_reservation_id}`)}>상세보기</button>
          </div>
        </div>
      ))}

    </div>
  );
};

export default ReservationManagement;