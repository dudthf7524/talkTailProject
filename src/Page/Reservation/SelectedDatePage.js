import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale';
import { format, addMonths, getDay, isWithinInterval, parse, addMinutes } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import '../../CSS/calender.css';
import { setDate } from '../../redux/reservationData';
import { setStartTime } from '../../redux/reservationData';
import { useDispatch } from 'react-redux';
import api from '../../Api'

// 직관적인 월을 받아서 Date 객체를 생성하는 함수
function createDate(year, month, day) {
  return new Date(year, month - 1, day);
}
const filterDisabledDays = (date) => {
  const day = getDay(date);
  return day !== 0 && day !== 6 ; // 화요일(2)과 수요일(3)을 제외한 날짜만 활성화
};
function generateTimeSlots(start_time, end_time, intervalMinutes) {
  const start = parse(start_time, 'HH:mm', new Date());
  const end = parse(end_time, 'HH:mm', new Date());

  const totalIntervals = Math.floor((end - start) / (intervalMinutes * 60 * 1000)); // 총 간격 수 계산

  return Array.from({ length: totalIntervals + 1 }, (_, index) => {
    const newTime = addMinutes(start, intervalMinutes * index);
    return format(newTime, 'HH:mm');
  });
}

const SelectedDatePage = () => {

  const {id} = useParams();
  console.log(id)
  const [reservationDesinger, setReservationDesinger] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/beauty/reservation/desinger/${id}`, { withCredentials: true });
        setReservationDesinger(response.data);
      } catch (error) {
        console.error('예약관리 상세보기 실패', error);
        // navigate('/'); // 로그인 페이지로 리디렉션
      }
    };
    fetchUser();
  }, []);
  if(reservationDesinger){
    console.log("reservationDesinger")
    console.log(reservationDesinger)
  }
  const businessStartTime = '09:00';
  const businessEndTime = '18:00';
  const timeSlots = generateTimeSlots(businessStartTime, businessEndTime, 30);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // const morning = ['10:00', '10:30', '11:00', '11:30'];
  // const afternoon = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'];
  // const afternoon = ['12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30'];
  const [activeTime, setActiveTime] = useState(null);

  const handleButtonClick = (time) => {

    setActiveTime(time);
   
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const disabledDates = [
    createDate(2024, 12, 31), // 12월 31일
  ];

  const dateLabels = {
    "2024-12-25": "크리스마스",
    "2024-12-31": "연말",
    "2025-01-01": "새해 첫날",
    "2024-03-14": "화이트데이",
  };
  const timeDate = [
    {
      date: '2024-12-26',
      start_time: '13:00',
      end_time: '15:00'
      ,
    },
    {
      date: '2024-12-26',
      start_time: '16:00',
      end_time: '17:00'
      ,
    },
    {
      date: '2024-12-27',
      start_time: '17:00',
      end_time: '17:30'
    }
    ,
    {
      date: '2024-12-27',
      start_time: '11:00',
      end_time: '12:30'
    },
    {
      date: '2024-12-27',
      start_time: '9:00',
      end_time: '10:30'
    }
  ];

  console.log(timeDate)
  const monthsAhead = 3;
  const maxDate = addMonths(new Date(), monthsAhead);



  const renderDayContents = (day, date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const label = dateLabels[formattedDate]; // 라벨을 찾음
    const isSunday = getDay(date) === 0; // 일요일 체크
    const isSundayOrSaturday = [0, 6].includes(getDay(date)); // 일요일(0) 또는 토요일(6) 체크
    const isSelected = startDate && format(startDate, 'yyyy-MM-dd') === formattedDate;
  
    // 일요일과 토요일일 경우 '휴무'로 표시
    const displayLabel = isSundayOrSaturday ? "휴무" : label;
  
    return (
      <div
        className={`day-content ${isSunday ? "sunday" : ""} ${isSundayOrSaturday ? "closed" : ""} ${isSelected ? "selected" : ""}`}
      >
        <div className="day-number">{day}</div>
        {displayLabel && <div className="day-label">{displayLabel}</div>}
      </div>
    );
  };



  const getDisabledTimesByDate = (selectedDate) => {

    if (!selectedDate) return []; // 선택된 날짜가 없으면 빈 배열 반환

    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const reservations = reservationDesinger.filter((item) => item.date === formattedDate);

    const disabledTimes = [];
    reservations.forEach(({ start_time, end_time }) => {
      const start = parse(start_time, 'HH:mm', new Date());
      const end = parse(end_time, 'HH:mm', new Date());
      const allTimes = [...timeSlots];
      allTimes.forEach((time) => {
        const current = parse(time, 'HH:mm', new Date());
        if (isWithinInterval(current, { start, end: new Date(end.getTime() - 1) })) {
          disabledTimes.push(time);
        }
      });
    });

    return disabledTimes;
  };

  const [startDate, setStartDate] = useState('');
  const [selectDate, setSelectDate] = useState('')

  const handleDateChange = (date) => {

    const formatDate = format(date, 'yyyy-MM-dd');
    setStartDate(date);
    setSelectDate(formatDate);

    if (date) {
      const disabledTimesForDate = getDisabledTimesByDate(date);

      // 오늘 날짜라면 현재 시간 이후의 시간만 필터링
      if (format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')) {
        const now = new Date();
        console.log(now);

        // 현재 시간 이후의 시간만 필터링
        const filteredTimeSlots = timeSlots.filter((time) => {
          const timeObj = parse(time, 'HH:mm', new Date());
          return timeObj >= now; // 현재 시간 이후만 남깁니다
        });

        // Modal 데이터에 필터링된 시간 추가
        setModalData({ date: format(date, 'yyyy-MM-dd'), disabledTimes: disabledTimesForDate, filteredTimeSlots });

      } else {
        // 오늘 날짜가 아니라면 모든 시간대를 그대로 표시
        setModalData({ date: format(date, 'yyyy-MM-dd'), disabledTimes: disabledTimesForDate, filteredTimeSlots: timeSlots });

      }

      setIsModalOpen(true);
    }
  };

  // const handleDateChange = (date) => {
  //   setStartDate(date);
  //   if (date) {
  //     const disabledTimesForDate = getDisabledTimesByDate(date);
  //     console.log(disabledTimesForDate)
  //     console.log("Disabled Times:", disabledTimesForDate);
  //     setModalData({ date: format(date, 'yyyy-MM-dd'), disabledTimes: disabledTimesForDate });
  //     setIsModalOpen(true);
  //   }
  // };
  const disabledTimes = modalData?.disabledTimes || [];

  const dispatch = useDispatch();

  const handleItemClick = () => {
    console.log(selectDate)
    console.log(activeTime)
    dispatch(setDate(selectDate));
    dispatch(setStartTime(activeTime));
    navigate(`/pet-select/1`);
  };

  return (
    <>
      <div className="mid" lang="ko">
        <div className="navigation">
          <button>
            <img src={arrowButtonUrl} alt="" onClick={goBack} />
          </button>
          예약 신청서
          <div></div>
        </div>
        <div className="main-mid">
          <div>
            <div>
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                inline
                minDate={new Date()}
                excludeDates={disabledDates}
                filterDate={filterDisabledDays} // 특정 요일 비활성화
                locale={ko}
                dateFormat="yyyy-MM-dd"
                maxDate={maxDate}
                className="large-datepicker"
                renderDayContents={renderDayContents}
              />
              <style>
                {`
          .react-datepicker {
            border: none;
            background: transparent;
            box-shadow: none;
          }

          .react-datepicker__triangle {
            display: none;
          }

          .react-datepicker__header {
            background-color: transparent;
            border-bottom: none;
            font-size: 50px;
          }
          .react-datepicker__day:hover {
            background-color: white; /* hover 효과를 제거 */
           
          }
          .react-datepicker__current-month {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
          }

          .react-datepicker__navigation {
            top: 7.5px;
          }

          .react-datepicker__month {
            font-size: 20px;
          }

          .react-datepicker__day {
            font-size: 0;
            width: 50px;
            height: 60px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            position: relative;
            text-align: center;
          }

          .day-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            height: 100%;
            width: 100%;
            position: relative;
            text-align: center;
            border-radius: 8px;
            padding: 4px;
          }

          .day-number {
            font-size: 15px;
          }

          .day-label {
            font-size: 12px;
            font-weight: bold;
            color: red;
          }

          .sunday .day-number {
            color: red;
          }
          /* 왼쪽 화살표 */
          .react-datepicker__navigation--previous {
            left: 30%; /* 월 텍스트의 왼쪽에 배치 */
          }

          /* 오른쪽 화살표 */
          .react-datepicker__navigation--next {
            right: 30%; /* 월 텍스트의 오른쪽에 배치 */
          }
         

          .react-datepicker__day-name {
            width: 50px;
            text-align: center;
            font-size: 18px;
          }

          .react-datepicker__week {
            display: flex;
            justify-content: space-between;
          }

          .selected {
            background-color: #f0663f;
            color: white;
            border-radius: 8px;
          }

          .selected .day-number {
            font-weight: bold;
          }
          .closed .day-number {
            color: gray; /* 휴무 색상 */
          }
          .closed .day-label {
            font-size: 12px;
            font-weight: bold;
            color: gray; /* "휴무" 색상 */
          }
        `}
              </style>

            </div>
          </div>
          {isModalOpen && (
            <div id="modal-body">
              <div className="time-selection">
                {modalData?.filteredTimeSlots?.map((time) => (
                  <div
                    key={time}
                    className={`time-box ${activeTime === time ? 'clicked' : ''} ${disabledTimes.includes(time) ? 'disabled' : ''}`}
                    onClick={() => !disabledTimes.includes(time) && handleButtonClick(time)}
                  >
                    {time}
                  </div>
                ))}
              </div>
              {/* <div className="time-selection">
                {timeSlots.map((time) => (
                  <div
                    key={time}
                    className={`time-box ${activeTime === time ? 'clicked' : ''} ${disabledTimes.includes(time) ? 'disabled' : ''}`}
                    onClick={() => !disabledTimes.includes(time) && handleButtonClick(time)}
                  >
                    {time}
                  </div>
                ))}
              </div> */}
            </div>
          )}
        </div>
      </div>
      <div className="Nbutton" onClick={handleItemClick}>
        예약하기
      </div>
    </>
  );
};

export default SelectedDatePage;
