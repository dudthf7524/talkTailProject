import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import {format, addMonths, getDay} from "date-fns";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../../CSS/calender.css";
import api from "../../../Api";
import LoginModal from "../../Modal/LoginModal.js";
import DesingerRemoveModal from "../../Modal/DesingerRemoveModal.js";
import DesingerCheckModal from "../../Modal/DesingerCheckModal.js";



const DesingerClosedDays = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openCheckModal, setOpenCheckModal] = useState(false);
  const modalTitle = "알림";
  const modalContent = "휴무일 등록이 완료되었습니다.";
  const removeTitle = "알림";
  const removeContent = "정말로 삭제하시겠습까?";
  const checkTitle = "알림";
  const checkContent = "날짜를 선택해주세요";
  const location = useLocation();
  const id = location.state?.id; // state로 받은 값
  console.log(id);
  const [lists, setLists] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [closeId, setCloseId] = useState(null);
  
  const navigate = useNavigate();
  const [hours, setHours] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/reservation/hours`, {
          withCredentials: true,
        });
        if (response.data === "common") {
          navigate("/business/login");
        }
        setHours(response.data);
      } catch (error) {
        console.error("예약관리 상세보기 실패", error);
        // navigate('/'); // 로그인 페이지로 리디렉션
      }
    };
    fetchUser();
  }, []);

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
    console.log(id);
    const list = async () => {
      try {
        const response = await api.get(
          `/api/desinger/day/list/${id}`,
          { id: id },
          { withCredentials: true }
        );
        setLists(response.data);
        console.log(response.data);
      } catch (e) {
        console.error("휴무일 리스트 오류:", e);
      }
    };
    list();
  }, []);

  //   useEffect(() => {
  //     console.log(id)
  //     const list = async () => {
  //       try {
  //         const response = await api.get(`/api/desinger/day/list/${id}`, { id: id }, { withCredentials: true });
  //         setLists(response.data);
  //         console.log(response.data)

  //       } catch (e) {
  //         console.error('휴무일 리스트 오류:', e);
  //       }
  //     };
  //     list();
  //   }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const [activeTime, setActiveTime] = useState([]);

  const filterDisabledDays = (date) => {
    if (hours === null) {
      navigate("/business/login"); // hours가 null일 때 이동
      return false; // 이후 로직은 처리하지 않음
    }
    const day = getDay(date);
    return hours[day]?.isOperatingDay;
  };

  const handleButtonClick = (time) => {
    setActiveTime((prev) => {
      if (prev.includes(time)) {
        return prev.filter((t) => t !== time); // 이미 선택된 시간 클릭 시 해제
      }

      return [...prev, time].sort((a, b) => a - b); // 새로운 시간 추가 후 정렬
    });
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
  for (let i = 0; i < lists.length; i++) {
    console.log(lists[i].desinger_close_day)
  }

  // const disabledDates = [
  //   createDate(2025, 2, 26), // 12월 31일

  // ];

  const disabledDates = lists.map(item => createDate(
    parseInt(item.desinger_close_day.split('-')[0]), // 년도
    parseInt(item.desinger_close_day.split('-')[1]), // 월
    parseInt(item.desinger_close_day.split('-')[2]) // 일
  ));

  const dateLabels = {
    "2025-01-01": "새해",
  };

  const monthsAhead = 3;
  const maxDate = addMonths(new Date(), monthsAhead);

  const renderDayContents = (day, date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const label = dateLabels[formattedDate]; // 특정 기념일 라벨
    const dayIndex = getDay(date);
    const isOperatingDay = hours?.[dayIndex]?.isOperatingDay;
    const isSelected = startDate && format(startDate, "yyyy-MM-dd") === formattedDate;
    const isDisabledDate = disabledDates.some(
      (disabledDate) => format(disabledDate, "yyyy-MM-dd") === formattedDate
    ); // 휴무일 체크

    const displayLabel = isOperatingDay ? label : "휴무";
    const disabledLabel = isDisabledDate ? "휴무일" : null;

  
    const handleRemove = () => {
      // Find the relevant desinger_close_day_id from the lists
      const dayToRemove = lists.find(
        (item) => format(date, "yyyy-MM-dd") === item.desinger_close_day
      );
      if (dayToRemove) {
        // handleRemove(dayToRemove.desinger_close_day_id); 
        setCloseId(dayToRemove.desinger_close_day_id);
      }
      setOpenRemoveModal(true);
    };

    return (
      <div
        className={`day-content ${!isOperatingDay ? "closed" : ""} ${isSelected ? "selected" : ""
          }`}
        style={{
          border: "1px solid #ccc", // 칸막이 효과
          borderRadius: "0", // 모서리 둥글기 제거 (표처럼 보이게 하기 위해)
          boxSizing: "border-box", // 테두리를 포함한 박스 크기 계산
          padding: "4px", // 내부 간격
          backgroundColor: isSelected ? "#f0663f" : "", // 선택된 날짜 배경색
        }}
      >
        <div className="day-number">{day}</div>
        {displayLabel && <div className="day-label">{displayLabel}</div>}
        {disabledLabel && (
          <div
            className="day-label disabled-label"
            style={{
              color: isDisabledDate ? "red" : "inherit", // 휴무일에 빨간색 적용
              fontWeight: isDisabledDate ? "bold" : "normal", // 휴무일에 굵게 적용
            }}
          >
            {disabledLabel}
          </div>
        )}
        {isDisabledDate && (
          <div
            className="remove-disabled-date"
            onClick={handleRemove}
            style={{
              position: "absolute",
              top: "4%",
              right: "4%",
              color: "red",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            ✖
          </div>
        )}
      </div>
    );
  };
  // const [disabledDates, setDisabledDates] = useState([
  //   createDate(2025, 2, 26), // 12월 31일
  // ]);
  const getDisabledTimesByDate = (selectedDate, st, dt) => {
    if (!selectedDate) return [];

    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    const reservations =
      reservationDesinger?.filter((item) => item.date === formattedDate) || [];
    console.log(reservations);


    return disabledTimes;
  };

  const [startDate, setStartDate] = useState("");


  const handleDateChange = (date) => {
    const formatDate = format(date, "yyyy-MM-dd");
    setStartDate(formatDate);

    setSelectedDate(formatDate)
    if (date) {
      const disabledTimesForDate = getDisabledTimesByDate(date);
      console.log(disabledTimesForDate)
      console.log("Disabled Times:", disabledTimesForDate);
      setModalData({ date: format(date, 'yyyy-MM-dd'), disabledTimes: disabledTimesForDate });
      setIsModalOpen(true);
    }
  };
  const disabledTimes = modalData?.disabledTimes || [];


  const writeDesingerClosedDays = async () => {
    if (!selectedDate) {
      setOpenCheckModal(true)
      return;
    }
    console.log("선택한 날짜는 : ", selectedDate);
    try {
      const response = await api.post(
        "/api/designer/day",
        { id: id, selectedDate: selectedDate },
        {
          withCredentials: true,
        }
      );
      if (response) {
        setOpenModal(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000); // 2초 후 새로고침
      }
    } catch (e) {
      console.error("휴무일 입력 오류:", e);
    }
  };

  const removeDay = async () => {
    console.log(closeId)
    if(!closeId){
      return;
    }
    try {
      const response = await api.post(
        "/api/designer/day/remove",
        { closeId },
        {
          withCredentials: true,
        }
      );
      if (response) {
          window.location.reload();
      }
    } catch (error) {

    }
   
  }
 

  return (
    <>
      <div className="" lang="ko">
        <div className="navigation">
          <button>
            <img src={arrowButtonUrl} alt="" onClick={goBack} />
          </button>
          수기관리
          <div style={{ cursor: "pointer" }} onClick={writeDesingerClosedDays}>등록</div>
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
        </div>
      </div>
      {openModal ? (
        <LoginModal
          openModal={() => {
            setOpenModal(false);
          }}
          title={modalTitle}
          content={modalContent}
        />
      ) : (
        ""
      )}
      {openRemoveModal ? (
        <DesingerRemoveModal
          openRemoveModal={() => {
            setOpenRemoveModal(false);
          }}
          title={removeTitle}
          content={removeContent}
          onClose={() => setOpenRemoveModal(false)}
          onConfirm={removeDay}
        />
      ) : (
        ""
      )}
      {openCheckModal ? (
        <DesingerCheckModal
          openCheckModal={() => {
            setOpenCheckModal(false);
          }}
          title={checkTitle}
          content={checkContent}
          onClose={() => setOpenCheckModal(false)}
          
        />
      ) : (
        ""
      )}
    </>
  );
};

export default DesingerClosedDays;
