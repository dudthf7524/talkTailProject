import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../BusinessCSS/auth.css';
import '../BusinessCSS/reservation.css';
import api from '../Api';

function DateEdit() {
    const [dateList, setDateLists] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;

    // 요일 매핑
    const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

    // 시간 목록 생성 (1:00 ~ 24:00)
    const generateTimeOptions = () => {
        const times = [];
        for (let hour = 7; hour <= 22; hour++) {
            ['00', '30'].forEach((minute) => {
                times.push(`${hour.toString().padStart(2, '0')}:${minute}`);
            });
        }
        return times;
    };

    const timeOptions = generateTimeOptions();

    useEffect(() => {
        const fetchAndAuthorizeUser = async () => {
            try {
                const response = await api.get('/api/business/date/edit', { withCredentials: true });
                setDateLists(response.data);
                
                if(response.data == "common"){
                    navigate('/business/login');
                }else if(!response.data){
                    navigate('/business/date/register')
                }
            } catch (e) {
                console.error('권한 조회 실패:', e);
            }
        };

        fetchAndAuthorizeUser();
    }, [location.pathname]);

    // 시간 변경 핸들러
    const handleTimeChange = (dayIndex, type, value) => {
        setDateLists((prev) => {
            const updatedDateList = {
                ...prev,
                hours: {
                    ...prev.hours,
                    [dayIndex]: {
                        ...prev.hours[dayIndex],
                        [type]: value, // start_time 또는 end_time 업데이트
                    },
                },
            };
            console.log(`Updated time for ${dayNames[dayIndex]} - ${type}:`, updatedDateList.hours[dayIndex]);
            return updatedDateList;
        });
    };

    // 저장 핸들러
    const handleSave = async () => {
        console.log('Saving updated times:', dateList); // 저장된 전체 시간 출력
        try {
            await api.put('/api/business/date/edit', dateList, { withCredentials: true });
            alert('시간이 저장되었습니다.');
        } catch (e) {
            console.error('시간 저장 실패:', e);
            alert('시간 저장에 실패했습니다.');
        }
    };

    if (!dateList) {
        return <div>로딩 중 ...</div>;
    }

    return (
        <div className='page-container' lang='ko'>
            <div className='navigation'>
                <button>
                    <img src={arrowButtonUrl} alt='뒤로가기' onClick={() => navigate('/business/menu')} />
                </button>
                요일별 시간 설정
                <div onClick={handleSave}>수정</div>
            </div>

            <div className='date-title'>
                <div className='date-text'>DAY</div>
                <div className='date-text'>OPEN</div>
                <div className='date-text'>END</div>
            </div>
            <div className="horizontal-line"></div>

            {dayNames.map((day, index) => {
                const hours = dateList.hours ? dateList.hours[index] : {};

                // isOperatingDay가 false인 경우 해당 요일을 렌더링하지 않음
                if (!hours.isOperatingDay) {
                    return null;
                }

                return (
                    <div className='date-row' key={index}>
                        <div className='date-item'>{day}</div>
                        <div className='date-item'>
                            <select
                                className="select-box"
                                value={hours?.start_time || ''}
                                onChange={(e) => handleTimeChange(index, 'start_time', e.target.value)}
                            >
                                {timeOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='date-item'>
                            <select
                                className="select-box"
                                value={hours?.end_time || ''}
                                onChange={(e) => handleTimeChange(index, 'end_time', e.target.value)}
                            >
                                {timeOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default DateEdit;
