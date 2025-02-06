import React, { useState } from "react";
import "../../CSS/calender.css";
import { useNavigate, useParams } from "react-router-dom";
// import { setDesiredReservationTime } from '../../redux/reservationData';
import { useDispatch, useSelector } from "react-redux";

function SelectDatePage() {
  const [selectAfternoon, setSelectAfternoon] = useState("");
  const designerName = useSelector((state) => state.reservationData);
  const dispatch = useDispatch();

  const morning = ["10:30", "11:00", "11:30"];
  const afternoon = [
    "12:00",
    "12:30",
    "1:00",
    "1:30",
    "2:00",
    "2:30",
    "3:00",
    "3:30",
    "4:00",
    "4:30",
    "5:00",
    "5:30",
    "6:00",
    "6:30",
    "7:00",
    "7:30",
  ];

  const [date, setDate] = useState(new Date());
  const [reservationDate, setReservationDate] = useState("");
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTime, setActiveTime] = useState(null);

  // 최대 예약 가능한 월을 설정 (예: 6개월)
  const impossibleMonths = 3; // 6개월 후까지 예약 가능

  const handleButtonClick = (time) => {
    setActiveTime(time);
    setSelectAfternoon(time);
  };

  const renderCalendar = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth() + 1;
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

      const isDateDisabled = new Date(viewYear, viewMonth - 1, d) < new Date(); // 오늘 이후 날짜는 비활성화

      return (
        <div
          key={i}
          className={`date ${condition} ${isToday ? "today" : ""} ${
            isDateDisabled ? "disabled" : ""
          }`}
          onClick={() => !isDateDisabled && openModal(viewYear, viewMonth, d)} // 비활성화된 날짜는 클릭되지 않음
        >
          <span className="day-number">{d}</span>
        </div>
      );
    });
  };

  const openModal = (year, month, day) => {
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    setReservationDate(formattedDate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const changeMonth = (offset) => {
    setDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

  const goToday = () => {
    setDate(new Date());
  };

  // 오늘보다 이전으로 이동할 수 있는지 확인
  const canGoPrev = () => {
    return date > new Date(); // 오늘보다 이전으로는 이동할 수 없게 설정
  };

  // 오늘 이후로 최대 몇 개월까지 예약 가능한지 확인
  const canGoNext = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + impossibleMonths - 1);
    return date <= maxDate;
  };

  const calendarDays = renderCalendar();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
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
          예약하기
          <div></div>
        </div>
        <div className="main-mid">
          <div className="year-month">
            {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
          </div>
          <div className="nav">
            <button
              className="nav-btn go-prev"
              onClick={() => changeMonth(-1)}
              disabled={!canGoPrev()} // 오늘 이전으로 이동 불가능하도록 비활성화
            >
              &lt;
            </button>
            <button className="nav-btn go-today" onClick={goToday}>
              Today
            </button>
            <button
              className="nav-btn go-next"
              onClick={() => changeMonth(1)}
              disabled={!canGoNext()} // 6개월 이후로 이동 불가능하도록 비활성화
            >
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
          {isModalOpen && (
            <div id="modal-body">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <p>{reservationDate}</p>
              <p>예약시간을 선택해주세요</p>

              <p className="b">오전</p>
              <table>
                <thead>
                  <tr>
                    {morning.map((time) => (
                      <th key={time}>
                        <div
                          className={`a ${
                            activeTime === time ? "clicked" : ""
                          }`}
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
                                className={`a ${
                                  activeTime === t ? "clicked" : ""
                                }`}
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
      <div
        className="Nbutton"
        onClick={handleItemClick}
        style={{ cursor: "pointer" }}
      >
        예약하기
      </div>
    </>
  );
}

export default SelectDatePage;
