import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../BusinessCSS/auth.css';
// import '../BusinessCSS/reservation.css';
import api from '../Api';

function DateEdit() {
    const [dateList, setDateLists] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;

    // 요일 매핑
    const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

    useEffect(() => {
        const fetchAndAuthorizeUser = async () => {
            try {
                const response = await api.get('/api/business/date/edit', { withCredentials: true });
                setDateLists(response.data);
                console.log(response.data)
                if (response.data == "common") {
                    navigate('/business/login');
                }
            } catch (e) {
                console.error('권한 조회 실패:', e);
            }
        };

        fetchAndAuthorizeUser();
    }, [location.pathname]);

    // 영업일 여부 변경 핸들러
    const handleOperatingDayChange = (dayIndex, value) => {
        setDateLists((prev) => {
            const updatedDateList = {
                ...prev,
                hours: {
                    ...prev.hours,
                    [dayIndex]: {
                        ...prev.hours[dayIndex],
                        isOperatingDay: value, // 영업일 여부 업데이트
                    },
                },
            };
            console.log(`Updated isOperatingDay for ${dayNames[dayIndex]}:`, updatedDateList.hours[dayIndex].isOperatingDay);
            return updatedDateList;
        });
    };

    // 저장 핸들러
    const handleSave = async () => {
        console.log('Saving updated times:', dateList); // 저장된 전체 시간 출력
        try {
            await api.put('/api/business/day-on-off/edit', dateList, { withCredentials: true });
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
                <div className='date-text'>영업일</div>
                <div className='date-text'>휴무일</div>
            </div>
            <div className="horizontal-line"></div>

            {dayNames.map((day, index) => {
                const hours = dateList.hours ? dateList.hours[index] : {};

                return (
                    <div className='date-row' key={index}>
                        <div className='date-item'>{day}</div>
                        <div className='date-item'>
                            {/* 영업일 체크박스 */}
                            <label>
                                <input
                                    type="checkbox"
                                    checked={hours.isOperatingDay || false}
                                    onChange={(e) => handleOperatingDayChange(index, true)} // 영업일 체크
                                />

                            </label>
                        </div>
                        <div className='date-item'>
                            {/* 휴무일 체크박스 */}
                            <label>
                                <input
                                    type="checkbox"
                                    checked={!hours.isOperatingDay} // 영업일이 아니면 체크 (휴무일)
                                    onChange={(e) => handleOperatingDayChange(index, false)} // 휴무일 체크
                                />

                            </label>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default DateEdit;
