import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/customer.css'
import { useEffect } from 'react';
import api from '../Api'

const CustomerManagement = () => {

    const navigate = useNavigate();
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;

    const [reservationManagementList, setReservationManagementList] = useState([]);

    useEffect(() => {
        const fetchReservationManagement = async () => {
            try {
                const response = await api.get('/api/customer/management', { withCredentials: true });

                if (response.data[0] == null) {
                    setReservationManagementList(response.data[0]);
                } else {
                    setReservationManagementList(response.data);
                }
                console.log(response.data)
            } catch (error) {

                console.error('데이터 가져오기 실패', error);
                navigate('/business/login'); // 로그인 페이지로 리디렉션
            }
        };
        fetchReservationManagement();
    }, []);

    console.log(reservationManagementList)

    const customerResults = [
        {
            reservationtime: '24-05-10-13:00',
            customername: '멍멍이/김인간',
            resultButton: '내용보기',
            detailButton: '상세보기'
        },
        {
            reservationtime: '24-05-10-13:00',
            customername: '야옹이/최사람',
            resultButton: '내용쓰기',
            detailButton: '상세보기'
        },
    ];

    return (
        <div className='page-container' lang='ko'>
            <div className='navigation'>
                <button>
                    <img src={arrowButtonUrl} alt='' onClick={() => navigate('/admin-menu')} />
                </button>
                고객관리
                <div> </div>
            </div>
            <div className='customer-title'>
                <div className='customer-text'>시작시간</div>
                <div className='customer-text'>종료시간</div>
                <div className='customer-text'>반려동물/보호자</div>
                <div className='customer-text'>알림장</div>

            </div>
            <div class="horizontal-line"></div>

            {reservationManagementList != null ? (
                reservationManagementList.map((reservationManagement, index) => (
                    <div key={index} className='customer-row'>
                        <div className='customer-item'>{reservationManagement.reservationDesiredTime}</div>
                        <div className='customer-item'>{reservationManagement.reservationCompleteTime}</div>
                        <div className='customer-item'>{reservationManagement.pet_name}/{reservationManagement.user_name}</div>
                        <div className='customer-item'>
                            {
                                reservationManagement.beauty_notice_is_avaiable
                                    ?
                                    <button
                                        className='result-button-complete'
                                        onClick={() => navigate('/business/write/notice')}
                                    >
                                        작성완료
                                    </button>
                                    :
                                    <button
                                        className='result-button-write'
                                        onClick={() => navigate(`/business/write/notice/${reservationManagement.beauty_reservation_id}`)}
                                    >
                                        작성하기
                                    </button>
                            }

                        </div>
                    </div>
                ))
            ) : (
                <div className='empty-message'>현재 예약된 고객 관리 정보가 없습니다.</div>
            )}



        </div>
    );
};

export default CustomerManagement;