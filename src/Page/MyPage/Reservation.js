import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import { useNavigate } from "react-router-dom";
import '../../CSS/myPage.css';
import { useEffect, useState } from 'react';
import api from '../../Api'
import '../../CSS/reservation.css'
const Reservation = () => {
    const navigate = useNavigate();
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;

    const [reservationtList, setReservationtList] = useState([]);

    useEffect(() => {
        const reservationManagement = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found.');
                }
                const response = await api.get('/api/user/reservation', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setReservationtList(response.data.reservation);
                console.log(response.data)

            } catch (error) {

                console.error('로그인 인증 실패:', error);

            }
        };
        reservationManagement();
    }, []);
    console.log("reservationtList")
    console.log(reservationtList)
    console.log("reservationtList")
    return (
        <div lang='ko'>
            <div>
                <div className='navigation'>
                    <div>
                        <button>
                            <img src={arrowButtonUrl} alt='' onClick={() => navigate('/my-Page')} />
                        </button>
                    </div>
                    예약내역
                    <div></div>
                </div>
                <div className='reservation-title'>
                    <div className='reservation-text'>예약신청시간</div>
                    <div className='reservation-text'>예약희망시간</div>
                    <div className='reservation-text'>상태</div>
                    <div className='reservation-text'>상세</div>
                </div>
                <div className="horizontal-line" ></div>
                {reservationtList.map((reservation, index) => (
                    <div key={index} className='reservation-row'>
                        <div className='reservation-item'>{reservation.reservation_applicationTime}</div>
                        <div className='reservation-item'>{reservation.date} {reservation.start_time}~{reservation.end_time}</div>
                        {
                            reservation.reservation_state === '완료' ? (
                                <div style={{ fontWeight: 'bold', color: 'green' }}>완료</div>
                            ) : reservation.reservation_state === '대기' ? (
                                <div style={{ fontWeight: 'bold', color: 'orange' }}>예약대기 중</div>
                            ) : reservation.reservation_state === '거절' ? (
                                <div style={{ fontWeight: 'bold', color: 'red' }}>거절</div>
                            ) : (
                                <div style={{ fontWeight: 'bold', color: 'gray' }}>알 수 없음</div>
                            )
                        }
                        <div className='reservation-item'>
                            <button className='detail-button' onClick={() => navigate(`/business/reservation/detail/${reservation.beauty_reservation_id}`)}>상세보기</button>
                        </div>
                    </div>
                ))}
            </div>

            <NButtonContainer />
        </div>
    );
};

export default Reservation;