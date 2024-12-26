import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale';
import { format, addMonths, getDay, isWithinInterval, parse, addMinutes } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import '../../CSS/calender.css';



// 직관적인 월을 받아서 Date 객체를 생성하는 함수
function createDate(year, month, day) {
  return new Date(year, month - 1, day);
}
const filterDisabledDays = (date) => {
  const day = getDay(date);
  return day !== 0 && day !== 6; // 화요일(2)과 수요일(3)을 제외한 날짜만 활성화
};
function generateTimeSlots(startTime, endTime, intervalMinutes) {
  const start = parse(startTime, 'HH:mm', new Date());
  const end = parse(endTime, 'HH:mm', new Date());

  const totalIntervals = Math.floor((end - start) / (intervalMinutes * 60 * 1000)); // 총 간격 수 계산

  return Array.from({ length: totalIntervals + 1 }, (_, index) => {
    const newTime = addMinutes(start, intervalMinutes * index);
    return format(newTime, 'HH:mm');
  });
}

const ReservationCalendar = () => {

  const businessStartTime = '09:00';
  const businessEndTime = '18:00';
  const timeSlots = generateTimeSlots(businessStartTime, businessEndTime, 30);
  console.log(timeSlots)
  const [selectAfternoon, setSelectAfternoon] = useState('');
  const [startTime, setStartTime] = useState(null); // 시작 시간
  const [endTime, setEndTime] = useState(null); // 종료 시간

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // const morning = ['10:00', '10:30', '11:00', '11:30'];
  // const afternoon = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'];
  // const afternoon = ['12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30'];
  const [activeTime, setActiveTime] = useState(null);
  const handleButtonClick = (time) => {
    console.log(time)
    setActiveTime(time);
    setSelectAfternoon(time);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
  const [startDate, setStartDate] = useState(null);
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
      starttime: '13:00',
      endtime: '15:00'
      ,
    },
    {
      date: '2024-12-26',
      starttime: '16:00',
      endtime: '17:00'
      ,
    },
    {
      date: '2024-12-27',
      starttime: '15:00',
      endtime: '15:30'
    }
    ,
    {
      date: '2024-12-27',
      starttime: '11:00',
      endtime: '12:30'
    },
    {
      date: '2024-12-27',
      starttime: '9:00',
      endtime: '10:30'
    }
  ];


  const monthsAhead = 3;
  const maxDate = addMonths(new Date(), monthsAhead);

  

  const renderDayContents = (day, date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const label = dateLabels[formattedDate]; // 라벨을 찾음
    const isSunday = getDay(date) === 0; // 일요일 체크
    const isSelected = startDate && format(startDate, 'yyyy-MM-dd') === formattedDate;

    return (
      <div className={`day-content ${isSunday ? "sunday" : ""} ${isSelected ? "selected" : ""}`}>
        <div className="day-number">{day}</div>
        {label && <div className="day-label">{label}</div>} {/* 라벨을 표시 */}
      </div>
    );
  };
  const handleItemClick = () => {
    // dispatch(setDesiredReservationTime(reservationDate + ' ' + selectAfternoon));
    // navigate(`/pet-select/1`);
  };


  const getDisabledTimesByDate = (selectedDate) => {
    console.log("selectedDate")
    console.log(selectedDate)
    if (!selectedDate) return []; // 선택된 날짜가 없으면 빈 배열 반환

    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    console.log("timeDate")
    console.log(timeDate)

    const reservations = timeDate.filter((item) => item.date === formattedDate);
    console.log("reservations")
    console.log(reservations)
    const disabledTimes = [];
    reservations.forEach(({ starttime, endtime }) => {
      console.log(starttime)
      console.log(endtime)

      const start = parse(starttime, 'HH:mm', new Date());
      console.log('start')
      console.log(start)
      const end = parse(endtime, 'HH:mm', new Date());
      console.log("end")
      console.log(end)
      const allTimes = [...timeSlots];
      console.log("allTimes")
      console.log(allTimes)
      allTimes.forEach((time) => {
        const current = parse(time, 'HH:mm', new Date());
        console.log("current")
        console.log(current)
        if (isWithinInterval(current, { start, end: new Date(end.getTime() - 1) })) {
          console.log(disabledDates)
          disabledTimes.push(time);
        }
      });
    });

    return disabledTimes;
  };
  const handleDateChange = (date) => {
    setStartDate(date);
    if (date) {
      const disabledTimesForDate = getDisabledTimesByDate(date);
      console.log(disabledTimesForDate)
      console.log("Disabled Times:", disabledTimesForDate);
      setModalData({ date: format(date, 'yyyy-MM-dd'), disabledTimes: disabledTimesForDate });
      setIsModalOpen(true);
    }
  };
  const disabledTimes = modalData?.disabledTimes || [];



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
        `}
              </style>

            </div>
          </div>
          {isModalOpen && (
            <div id="modal-body">
              <p className="am">오전</p>
              <div className="time-selection">
                {timeSlots.map((time) => (
                  <div
                    key={time}
                    className={`time-box ${activeTime === time ? 'clicked' : ''} ${disabledTimes.includes(time) ? 'disabled' : ''}`}
                    onClick={() => !disabledTimes.includes(time) && handleButtonClick(time)}
                  >
                    {time}
                  </div>
                ))}
              </div>

              <p className="pm">오후</p>
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

export default ReservationCalendar;
