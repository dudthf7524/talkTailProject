import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale';
import { format, addMonths, getDay } from 'date-fns';
import { useNavigate } from 'react-router-dom';

// 직관적인 월을 받아서 Date 객체를 생성하는 함수
function createDate(year, month, day) {
  return new Date(year, month - 1, day);
}

const ReservationCalendar = () => {
  const [selectAfternoon, setSelectAfternoon] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const morning = ['10:30', '11:00', '11:30'];
  const afternoon = ['12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30'];
  const [activeTime, setActiveTime] = useState(null);
  const handleButtonClick = (time) => {
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
    "2024-01-01": "새해 첫날",
    "2024-03-14": "화이트데이",
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      console.log("Selected Date:", formattedDate);
      setModalData({ date: formattedDate });
      setIsModalOpen(true);
    }
  };

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
            <div id="modal-body" style={{background : "red"}}>
              {/* <span className="close" onClick={closeModal}>
                &times;
              </span> */}
              {/* <p>{reservationDate}</p> */}
              {/* <p>예약시간을 선택해주세요</p> */}

              <p className="b">오전</p>
              <table style={{background :"green"}}>
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
