import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../BusinessCSS/auth.css';
import '../BusinessCSS/reservation.css';
import api from '../Api';

function DateRegister() {
    const [dateList, setDateLists] = useState({
        hours: new Array(7).fill({ isOperatingDay: true, start_time: '09:00', end_time: '19:00' }) // 기본값 설정
    });
    const [step, setStep] = useState(1); // 단계 (1: 영업일 선택, 2: 시간 선택)
    const navigate = useNavigate();
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;

    // 요일 매핑
    const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

    // 시간 목록 생성 (7:00 ~ 22:30)
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

    // 영업일 여부 변경 핸들러
    const handleOperatingDayChange = (dayIndex, value) => {
        setDateLists((prev) => {
            const updatedDateList = {
                ...prev,
                hours: prev.hours.map((hour, index) =>
                    index === dayIndex ? { ...hour, isOperatingDay: value } : hour
                ),
            };
            return updatedDateList;
        });
    };
    const transformDateList = (dateList) => {
        const transformed = dateList.hours.reduce((acc, current, index) => {
            acc[index] = current; // 인덱스를 키로 사용
            return acc;
        }, {});
        return { hours: transformed };
    };
    
    // 예시 사용
    const transformedDateList = transformDateList(dateList);
    console.log(transformedDateList);
    
    // 시간 변경 핸들러
    const handleTimeChange = (dayIndex, type, value) => {
        setDateLists((prev) => {
            const updatedDateList = {
                ...prev,
                hours: prev.hours.map((hour, index) =>
                    index === dayIndex ? { ...hour, [type]: value } : hour
                ),
            };
            return updatedDateList;
        });
    };

    // 저장 핸들러
    const handleSave = async () => {
        const transformedDateList = transformDateList(dateList);

        try {
            await api.post('/api/business/date/register', transformedDateList, { withCredentials: true });
            alert('시간이 등록되었습니다.');
            navigate('/business/menu'); // 등록 후 메뉴로 이동
        } catch (e) {
            console.error('시간 등록 실패:', e);
            alert('시간 등록에 실패했습니다.');
        }
    };

    // 시간 선택 화면으로 이동
    const handleGoToTimeSelection = () => {
        setStep(2);
    };

    return (
        <div className='page-container' lang='ko'>
            <div className='navigation'>
                {step === 1 && (
                    <button>
                        <img src={arrowButtonUrl} alt='뒤로가기' onClick={() => navigate('/business/menu')} />
                    </button>
                )}
                {step === 2 && (
                    <button onClick={() => setStep(step - 1)}>
                        <img src={arrowButtonUrl} alt='뒤로가기' />
                    </button>
                )}

                {step === 1 && (
                    <span>
                        영업일&휴무일
                    </span>
                )}


                {step === 2 && (
                    <span>
                        시간 설정
                    </span>
                )}

                {step === 1 && (
                    <div style={{cursor : "pointer"}} onClick={handleGoToTimeSelection}>시간설정</div>
                )}

                {step === 2 && (
                    <div style={{cursor : "pointer"}} onClick={handleSave}>저장</div>
                )}

            </div>

            {/* 영업일/휴무일 선택 화면 (단계 1) */}
            {step === 1 && (
                <div>
                    <div className='date-title'>
                        <div className='date-text'>DAY</div>
                        <div className='date-text'>영업일</div>
                        <div className='date-text'>휴무일</div>
                    </div>
                    <div className="horizontal-line"></div>

                    {dayNames.map((day, index) => {
                        const hours = dateList.hours[index];

                        return (
                            <div className='date-row' key={index}>
                                <div className='date-item'>{day}</div>
                                <div className='date-item'>
                                    {/* 영업일 체크박스 */}
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={hours.isOperatingDay}
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
            )}

            {/* 시간 선택 화면 (단계 2) */}
            {step === 2 && (
                <div>
                    <div className='date-title'>
                        <div className='date-text'>DAY</div>
                        <div className='date-text'>OPEN</div>
                        <div className='date-text'>CLOSE</div>
                    </div>
                    <div className="horizontal-line"></div>
                    {dayNames.map((day, index) => {
                        const hours = dateList.hours[index];

                        if (hours.isOperatingDay) {
                            return (
                                <div className='date-row' key={index}>
                                    <div className='date-item'>{day}</div>
                                    <div className='date-item'>
                                        {/* 시작 시간 선택 */}
                                        <select
                                            className="select-box"
                                            value={hours.start_time || ''}
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
                                        {/* 종료 시간 선택 */}
                                        <select
                                            className="select-box"
                                            value={hours.end_time || ''}
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
                        }

                        return null; // 영업일이 아닌 경우 시간 선택 항목을 렌더링하지 않음
                    })}
                   
                </div>
            )}
        </div>
    );
}

export default DateRegister;
