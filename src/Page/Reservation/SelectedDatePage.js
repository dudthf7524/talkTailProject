import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import {
  format,
  addMonths,
  getDay,
  isWithinInterval,
  parse,
  addMinutes,
} from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import "../../CSS/calender.css";
import { setDate } from "../../redux/reservationData";
import { setStartTime } from "../../redux/reservationData";
import { useDispatch, useSelector } from "react-redux";
import api from "../../Api";
import SelectedDateModal from "./SelectedDateModal";
import Modal from "../../modal";

function generateTimeSlots(start_time, end_time, intervalMinutes) {
  const start = parse(start_time, "HH:mm", new Date());
  const end = parse(end_time, "HH:mm", new Date());

  const totalIntervals = Math.floor(
    (end - start) / (intervalMinutes * 60 * 1000)
  ); // 총 간격 수 계산

  return Array.from({ length: totalIntervals + 1 }, (_, index) => {
    const newTime = addMinutes(start, intervalMinutes * index);
    return format(newTime, "HH:mm");
  });
}

const SelectedDatePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  const hours = useSelector((state) => state.reservationData.hour); // Redux 상태 가져오기
  if (hours === null) {
    navigate("list/beauty");
  }
  const { id } = useParams();
  const [reservationDesinger, setReservationDesinger] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(
          `/api/beauty/reservation/desinger/${id}`,
          { withCredentials: true }
        );
        setReservationDesinger(response.data);
      } catch (error) {
        console.error("예약관리 상세보기 실패", error);
        // navigate('/'); // 로그인 페이지로 리디렉션
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const list = async () => {
      try {
        const response = await api.get(
          `/api/desinger/day/list/${id}`,
          { id: id },
          { withCredentials: true }
        );
        setLists(response.data);
      } catch (e) {
        console.error("휴무일 리스트 오류:", e);
      }
    };
    list();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const [activeTime, setActiveTime] = useState(null);

  const filterDisabledDays = (date) => {
    if (hours === null) {
      navigate("/list/beauty"); // hours가 null일 때 이동
      return false; // 이후 로직은 처리하지 않음
    }
    const day = getDay(date);

    return hours[day]?.isOperatingDay;
  };

  const handleButtonClick = (time) => {
    setActiveTime(time);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;

  const goBack = () => {
    navigate(-1);
  };

  function createDate(year, month, day) {
    // JavaScript에서 월은 0부터 시작하므로, 입력값에서 1을 빼서 월을 설정합니다.
    return new Date(year, month - 1, day);
  }
  for (let i = 0; i < lists.length; i++) {}

  const disabledDates = lists.map((item) =>
    createDate(
      parseInt(item.desinger_close_day.split("-")[0]), // 년도
      parseInt(item.desinger_close_day.split("-")[1]), // 월
      parseInt(item.desinger_close_day.split("-")[2]) // 일
    )
  );

  const dateLabels = {};

  const monthsAhead = 3;
  const maxDate = addMonths(new Date(), monthsAhead);

  const renderDayContents = (day, date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const label = dateLabels[formattedDate]; // 특별한 날짜 라벨 (예: 크리스마스)
    const dayIndex = getDay(date); // 요일 정보 추출 (0: 일요일, 6: 토요일)

    const isOperatingDay = hours?.[dayIndex]?.isOperatingDay; // 해당 요일의 영업 상태 확인
    const isSelected =
      startDate && format(startDate, "yyyy-MM-dd") === formattedDate;
    const isDisabledDate = disabledDates.some(
      (disabledDate) => format(disabledDate, "yyyy-MM-dd") === formattedDate
    ); // 비활성화된 날짜 확인

    // "휴무" 라벨 적용 조건: 영업하지 않는 요일 또는 기존 라벨
    const displayLabel = isOperatingDay ? label : "휴무";
    const disabledLabel = isDisabledDate ? "휴무일" : null;

    return (
      <div
        className={`day-content ${!isOperatingDay ? "closed" : ""} ${
          isSelected ? "selected" : ""
        }`}
        // style={{ backgroundColor: isSelected ? "#216ba5" : "transparent" }}
      >
        <div className="day-number">{day}</div>
        {displayLabel && <div className="day-label">{displayLabel}</div>}
        {disabledLabel && (
          <div className="day-label disabled-label">{disabledLabel}</div>
        )}{" "}
        {/* 휴무 라벨 추가 */}
      </div>
    );

    // return (
    //   <div
    //     className={`day-content ${!isOperatingDay ? "closed" : ""} ${isSelected ? "selected" : ""}`}
    //     style={{
    //       border: "1px solid #ccc", // 칸막이 효과
    //       borderRadius: "0", // 모서리 둥글기 제거 (표처럼 보이게 하기 위해)
    //       boxSizing: "border-box", // 테두리를 포함한 박스 크기 계산
    //       padding: "4px", // 내부 간격
    //       backgroundColor: isSelected ? "#f0663f" : "", // 선택된 날짜 배경색
    //     }}
    //   >
    //     <div className="day-number">{day}</div>
    //     {displayLabel && <div className="day-label">{displayLabel}</div>}
    //   </div>
    // );
  };

  const getDisabledTimesByDate = (selectedDate, st, dt) => {
    if (!selectedDate) return [];

    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    const reservations =
      reservationDesinger?.filter((item) => item.date === formattedDate) || [];
    const disabledTimes = [];

    reservations.forEach(({ start_time, end_time }) => {
      const start = parse(start_time, "HH:mm", new Date());
      const end = parse(end_time, "HH:mm", new Date());

      // 현재 날짜의 모든 가능한 시간 슬롯을 생성하고 예약된 시간만 비활성화합니다.
      const timeSlots = generateTimeSlots(st, dt, 30);

      timeSlots.forEach((time) => {
        const current = parse(time, "HH:mm", new Date());

        if (
          isWithinInterval(current, { start, end: new Date(end.getTime() - 1) })
        ) {
          disabledTimes.push(time);
        }
      });
    });

    return disabledTimes;
  };

  const [startDate, setStartDate] = useState("");
  const [selectDate, setSelectDate] = useState("");
  const [selectDay, setSelectDay] = useState("");
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const handleDateChange = (date) => {
    const formatDate = format(date, "yyyy-MM-dd");
    setStartDate(date);
    setSelectDate(formatDate);
    const dayIndex = getDay(date);
    setSelectDay(daysOfWeek[dayIndex]);
    if (date) {
      const day = getDay(date);
      const dayHours = hours[day];

      if (dayHours?.isOperatingDay) {
        const timeSlots = generateTimeSlots(
          dayHours.start_time,
          dayHours.end_time,
          30
        );

        const disabledTimesForDate = getDisabledTimesByDate(
          date,
          dayHours.start_time,
          dayHours.end_time
        );

        // 오늘 날짜 처리
        if (format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")) {
          const now = new Date();

          const filteredTimeSlots = timeSlots.filter((time) => {
            const timeObj = parse(time, "HH:mm", new Date());
            return timeObj >= now;
          });

          setModalData({
            date: format(date, "yyyy-MM-dd"),
            disabledTimes: disabledTimesForDate,
            filteredTimeSlots: filteredTimeSlots,
          });
        } else {
          setModalData({
            date: format(date, "yyyy-MM-dd"),
            disabledTimes: disabledTimesForDate,
            filteredTimeSlots: timeSlots,
          });
        }
        setIsModalOpen(true);
      }
    }
  };

  const disabledTimes = modalData?.disabledTimes || [];

  const dispatch = useDispatch();

  const handleItemClick = async () => {
    const selectedDateObject = new Date(selectDate);
    const dayOfWeek = selectedDateObject.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
  };

  return (
    <>
      <div className="mid selectedDate_total" lang="ko">
        <div className="navigation">
          <button>
            <img src={arrowButtonUrl} alt="" onClick={goBack} />
          </button>
          예약날짜
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
                dateFormatCalendar="yyyy년 MM월"
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
            left: 25%; /* 월 텍스트의 왼쪽에 배치 */
          }

          /* 오른쪽 화살표 */
          .react-datepicker__navigation--next {
            right: 25%; /* 월 텍스트의 오른쪽에 배치 */
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
                    className={`time-box ${
                      activeTime === time ? "clicked" : ""
                    } ${disabledTimes.includes(time) ? "disabled" : ""}`}
                    onClick={() =>
                      !disabledTimes.includes(time) && handleButtonClick(time)
                    }
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className="selectedDate_btn Nbutton"
        // onClick={handleItemClick}
        onClick={() => {
          setModalTitle("예약오류");
          if (!selectDate) {
            setModalContent("예약날짜를 선택해주세요.");
            setOpenAlertModal(true);
          } else if (!activeTime) {
            setModalContent("예약시간을 선택해주세요.");
            setOpenAlertModal(true);
          } else {
            setOpenModal(true);
          }
          // handleItemClick();
        }}
        style={{ cursor: "pointer" }}
      >
        다음 단계
      </div>
      {openModal ? (
        <SelectedDateModal
          openModal={() => {
            setOpenModal(false);
          }}
          selectDate={selectDate}
          activeTime={activeTime}
          selectDay={selectDay}
        />
      ) : (
        ""
      )}
      {openAlertModal ? (
        <Modal
          openModal={() => {
            setOpenAlertModal(false);
          }}
          title={modalTitle}
          content={modalContent}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default SelectedDatePage;
