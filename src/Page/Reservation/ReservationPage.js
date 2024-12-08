import React, { useState } from 'react';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import { useNavigate } from "react-router-dom";
import '../styles/myPage.css';

const ReservationPage = () => {
  const navigate = useNavigate();

    return (
      <div lang='ko'>
          <div className='mid'>
            <div className='navigation'>
                <div></div>
                예약내역
                <div></div>
            </div>
            <div className='review-mid'>
                {/* <div className='reservation-content'>
                    <h1>한라마운틴미용실</h1>
                    <h1>2024.02.26 오후 3시30분으로 예약완료.</h1>
                    <p>제주특별자치도 한라시 한라읍 한라동387-8번지 101호 백록담</p>
                    <div>
                        <p>2024.02.06</p>
                        <button className='cancel-button' onClick={()=>navigate('/cancle-reservation')}>
                            예약취소
                        </button>
                    </div>
                </div> */}
            </div>
          </div>
          <NButtonContainer />
      </div>
    );
  };
  
  export default ReservationPage;