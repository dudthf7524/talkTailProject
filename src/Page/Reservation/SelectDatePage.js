import React, { useEffect, useContext, useState } from 'react';
import '../../CSS/calender.css'
import { useNavigate } from 'react-router-dom';
import { setMonthAndDay } from '../../redux/reservationData';
import { setTime } from '../../redux/reservationData';
import { useDispatch, useSelector } from 'react-redux';
function SelectDatePage2() {
    //=====================================================================================================================================================
    const [selectAfternoon, setSelectAfternoon] = useState('');

    const designerName = useSelector((state) => state.reservationData); // Redux 상태 가져오기
    console.log("Selected Designer Name:", designerName); // 리덕스 상태 출력
   

    
    useEffect(() => {
        console.log(selectAfternoon)
    }, [selectAfternoon])


    const dispatch = useDispatch();

    const morning = ['10:30', '11:00', '11:30'];
    const afternoon = ['12:00', '12:30', '1:00', '1:30',
        '2:00', '2:30', '3:00', '3:30',
        '4:00', '4:30', '5:00', '5:30',
        '6:00', '6:30', '7:00', '7:30',]


    const [date, setDate] = useState(new Date());
    const [reservationDate, setReservationDate] = useState('')
    const [modalData, setModalData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [activeTime, setActiveTime] = useState(null); // 현재 활성화된 시간

    const handleButtonClick = (time) => {
        setActiveTime(time); // 클릭된 시간을 활성화 상태로 설정
        setSelectAfternoon(time); // 선택한 시간을 업데이트
    };
    // 날짜를 렌더링하는 함수
    const renderCalendar = () => {
        const viewYear = date.getFullYear();
        const viewMonth = date.getMonth() + 1; // 0부터 시작하므로 +1
        const prevLast = new Date(viewYear, viewMonth - 1, 0);
        const thisLast = new Date(viewYear, viewMonth, 0);

        const PLDate = prevLast.getDate();
        const PLDay = prevLast.getDay();
        const TLDate = thisLast.getDate();
        const TLDay = thisLast.getDay();

        const prevDates = [];
        const thisDates = [...Array(TLDate + 1).keys()].slice(1);
        const nextDates = [];

        if (PLDay !== 6) {
            for (let i = 0; i < PLDay + 1; i++) {
                prevDates.unshift(PLDate - i);
            }
        }

        for (let i = 1; i < 7 - TLDay; i++) {
            nextDates.push(i);
        }

        const dates = prevDates.concat(thisDates, nextDates);

        return dates.map((d, i) => {
            const condition =
                i >= prevDates.length && i < prevDates.length + thisDates.length
                    ? "this"
                    : "other";
            const isToday =
                d === new Date().getDate() &&
                viewMonth - 1 === new Date().getMonth() &&
                viewYear === new Date().getFullYear();
            return (
                <div
                    key={i}
                    className={`date ${condition} ${isToday ? "today" : ""}`}
                    onClick={() => openModal(viewYear, viewMonth, d)}
                >
                    <span className="day-number">{d}</span>
                </div>
            );
        });
    };

    // 모달 열기
    const openModal = (year, month, day) => {
        const formattedMonth = month.toString().padStart(2, "0");
        console.log(formattedMonth)
        const formattedDay = day.toString().padStart(2, "0");
        console.log(formattedDay)
        const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
        console.log(formattedDate)
        setReservationDate(formattedDate)
        setIsModalOpen(true);

        // fetch(`/api/financial-info?date=${formattedDate}`)
        //   .then((response) => response.json())
        //   .then((data) => {
        //     setModalData({
        //       date: formattedDate,
        //       ...data,
        //     });
        //     setIsModalOpen(true);
        //   })
        //   .catch((error) => {
        //     console.error("Error fetching financial data:", error);
        //     setModalData({
        //       date: formattedDate,
        //       error: "데이터를 가져오는 중 오류가 발생했습니다.",
        //     });
        //     setIsModalOpen(true);
        //   });
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
        setModalData(null);
    };

    // 이전, 다음, 오늘 버튼 동작
    const changeMonth = (offset) => {
        setDate((prev) => {
            const newDate = new Date(prev); // 기존 Date 객체를 복제
            newDate.setMonth(newDate.getMonth() + offset); // 새로운 객체에서 월 변경
            return newDate; // 새로운 객체를 상태로 설정
        });
    };
    const goToday = () => {
        setDate(new Date());
    };

    // 캘린더 렌더링
    const calendarDays = renderCalendar();
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const openPaymentModal = () => {
        setShowPaymentModal(true);
    };
    //=====================================================================================================================================================

    const handleItemClick = (id) => {
        console.log(reservationDate)
        console.log(selectAfternoon)
        dispatch(setMonthAndDay(reservationDate));
        dispatch(setTime(selectAfternoon));
        navigate(`/pet-select/1`);
    };


    return (
        <>
            <div className='mid' lang='ko'>

                <div className='navigation'>

                    <button>
                        <img src={arrowButtonUrl} alt='' onClick={goBack} />
                    </button>
                    예약 신청서
                    <div></div>
                </div>
                <div className='main-mid'>
                    <div className="year-month">
                        {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
                    </div>
                    <div className="nav">
                        <button className="nav-btn go-prev" onClick={() => changeMonth(-1)}>
                            &lt;
                        </button>
                        <button className="nav-btn go-today" onClick={goToday}>
                            Today
                        </button>
                        <button className="nav-btn go-next" onClick={() => changeMonth(1)}>
                            &gt;
                        </button>
                    </div>
                    <div className="main">
                        <div className="days">
                            <div className="day">일</div>
                            <div className="day">월</div>
                            <div className="day">화</div>
                            <div className="day">수</div>
                            <div className="day">목</div>
                            <div className="day">금</div>
                            <div className="day">토</div>
                        </div>
                        <div className="dates">{calendarDays}</div>
                    </div>
                    {isModalOpen === true
                        ? <div id="modal-body">
                            <>
                                <span className="close" onClick={closeModal}>
                                    &times;
                                </span>
                                <p> {reservationDate}</p>
                                <p>예약시간을 선택해주세요</p>

                                <p className="b">오전</p>
                                <table>
                                    <thead>
                                        <tr>
                                            {morning.map((time) => (
                                                <th key={time}>
                                                    <div
                                                        className={`a ${activeTime === time ? 'clicked' : ''}`}
                                                        onClick={() => handleButtonClick(time)}
                                                    >
                                                        {time}
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                </table>
                                <p className="b">오후</p>
                                <table>
                                    <thead>
                                        {afternoon.map((time, index) => {
                                            if (index % 4 === 0) {
                                                return (
                                                    <tr key={index}>
                                                        {afternoon.slice(index, index + 4).map((t) => (
                                                            <th key={t}>
                                                                <div
                                                                    className={`a ${activeTime === t ? 'clicked' : ''}`}
                                                                    onClick={() => handleButtonClick(t)}
                                                                >
                                                                    {t}
                                                                </div>
                                                            </th>
                                                        ))}
                                                    </tr>
                                                );
                                            }
                                            return null;
                                        })}
                                    </thead>
                                </table>
                            </>
                        </div> : <div>예약 날짜를 선택해주세요</div>
                    }
                </div>
            </div>
            <div className='Nbutton' onClick={() => handleItemClick()}>예약하기</div>
        </>
    );
}

export default SelectDatePage2;
