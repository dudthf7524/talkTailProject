import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../BusinessCSS/auth.css'
import '../BusinessCSS/reservation.css'

function AuthorityManagement(){

  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/button/arrow_left.svg`;

  const reservations = [
    {
      requestTime: '24-05-10-13:39',
      desiredTime: '24-05-12-15:00',
      status: '완료',
      detailButton: '수락'
    },
    {
        requestTime: '24-05-10-13:39',
        desiredTime: '24-05-12-15:00',
        status: '완료',
        detailButton: '거절'
      },
  ];

  return (
    <div className='page-container' lang='ko'>
        <div className='navigation'>
            <button>
                <img src={arrowButtonUrl} alt='' onClick={()=>navigate('/admin-menu')} />
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
        {reservations.map((reservation, index) => (
            <div key={index} className='reservation-row'>
                <div className='reservation-item'>{reservation.requestTime}</div>
                <div className='reservation-item'>{reservation.desiredTime}</div>
                <div className='reservation-item'>
                    <button className='detail-button' onClick={()=>navigate('/reservation-detail')}>{reservation.detailButton}</button>
                </div>
                <div className='reservation-item'>
                    <button className='detail-button' onClick={()=>navigate('/reservation-detail')}>{reservation.detailButton}</button>
                </div>
            </div>
        ))}

    </div>
  );
};

export default AuthorityManagement;