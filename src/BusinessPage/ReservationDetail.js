import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../CSS/auth.css'
import '../CSS/reservation.css'
import ReservationAcceptModal from './Modal/ReservationAccept';
import ReservationRejectModal from './Modal/ReservationReject';
import ReservationCheckModal from './Modal/ReservationCheck';
import '../CSS/reservationModal.css'
import api from '../Api'
import { addMinutes, format, isWithinInterval, parse } from 'date-fns';
const ReservationDetail = () => {

  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const { id } = useParams();
  const location = useLocation();

  // 부모 컴포넌트에서 전달된 date 값 가져오기
  const { date } = location.state || {}; // state가 없는 경우 대비
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCheckModalOpen, setCheckModalOpen] = useState(false);
  const [checkMessage, setCheckMessage] = useState('');
  const [actionType, setActionType] = useState('');
  const [reservationManagementList, setReservationManagementList] = useState([]);
  const [reservationCompleteTime, setReservationCompleteTime] = useState(''); // 완료 시간 상태 추가
  const [timeList, setTimeLists] = useState([]);
  const [hourday, setHourDay] = useState([]);

  const [formData, setFormData] = useState({
    beauty_price: 0,
  });


  useEffect(() => {
    const fetchUser = async () => {
      console.log(date)
      try {
        const response = await api.get(`/api/beauty/reservation/detail/${id}/${date}`, { withCredentials: true });

        console.log(response.data)
        setReservationManagementList(response.data[0]);
        setTimeLists(response.data[1]);
        setHourDay(response.data[2]);


      } catch (error) {

        console.error('예약관리 상세보기 실패', error);
        navigate('/business/login'); // 로그인 페이지로 리디렉션
      }
    };
    fetchUser();
  }, []);


  const openModal = (type) => {
    setActionType(type);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  console.log(hourday)
  const handleConfirm = async () => {

    console.log(reservationManagementList.business_name)
    console.log(reservationManagementList.business_phone)
    console.log(formData.business_no_show)
    console.log("reservationCompleteTime")
    console.log(reservationCompleteTime)
    console.log("reservationCompleteTime")
    const beauty_price = formData.beauty_price;
    const business_name = reservationManagementList.business_name;
    const business_phone = reservationManagementList.business_phone;
    const start_time = reservationManagementList.start_time;
    const date = reservationManagementList.date;
    const user_phone = reservationManagementList.user_phone;
    const paid_price = reservationManagementList.paid_price;
    try {
      console.log(reservationCompleteTime)
      const response = await api.put(`/api/beauty/reservation/setCompleteTime/${id}`, { reservationCompleteTime, beauty_price, business_name, business_phone, start_time, date, user_phone, paid_price }, { withCredentials: true });
      console.log('수락');


      console.log(response.data)
      if (response.data === 'success') {
        setCheckMessage('확정되었습니다.');
        setModalOpen(false);
        setCheckModalOpen(true);
        setTimeout(() => {
          window.location.href = '/business/reservation/management';
        }, 2000); // 2초 후 리다이렉트
      }


    } catch (error) {
      console.error('예약 완료 실패:', error);
    }


  };

  const handleReject = async (rejectComment) => {

    console.log('거절:', rejectComment); // 거절 사유 확인
    console.log('거절:', rejectComment); // 거절 사유 확인
    const business_name = reservationManagementList.business_name;
    const business_phone = reservationManagementList.business_phone;
    const user_phone = reservationManagementList.user_phone;

    try {

      const response = await api.put(`/api/beauty/reservation/reject/${id}`, { rejectComment, business_name, business_phone, user_phone }, { withCredentials: true });
      console.log('수락');
      setCheckMessage('확정되었습니다.');
      setModalOpen(false);
      setCheckModalOpen(true);

      console.log(response.data)


      setTimeout(() => {
        navigate('/business/reservation/management');
      }, 2000); // 2초 후 리다이렉트
    } catch (error) {
      console.error('예약 완료 실패:', error);
    }
    setCheckMessage('거절사유를 전송했습니다.');
    setModalOpen(false);
    setCheckModalOpen(true);
  };

  const businessStartTime = hourday?.start_time || "09:00"; // 기본값 09:00
  const businessEndTime = hourday?.end_time || "18:00"; // 기본값 18:00

  const timeSlots = generateTimeSlots(businessStartTime, businessEndTime, 30);

  function generateTimeSlots(start_time, end_time, intervalMinutes) {
    const start = parse(start_time, 'HH:mm', new Date());
    const end = parse(end_time, 'HH:mm', new Date());


    const totalIntervals = Math.floor((end - start) / (intervalMinutes * 60 * 1000)); // 총 간격 수 계산
    return Array.from({ length: totalIntervals + 1 }, (_, index) => {
      const newTime = addMinutes(start, intervalMinutes * index);
      return format(newTime, 'HH:mm');
    });
  }




  const now = new Date();
  const today = format(now, 'yyyy-MM-dd'); // 오늘 날짜 형식: yyyy-MM-dd
  const currentTime = format(now, 'HH:mm'); // 현재 시간 형식: HH:mm


  const disabledTimes = [];

  const allTimeSlots = generateTimeSlots(businessStartTime, businessEndTime, 30);

  timeList.forEach(({ start_time, end_time }) => {
    const start = parse(start_time, 'HH:mm', new Date());
    const end = parse(end_time, 'HH:mm', new Date());

    allTimeSlots.forEach((time) => {
      const current = parse(time, 'HH:mm', new Date());

      // 예약된 시간 범위에 포함된 슬롯만 비활성화
      if (isWithinInterval(current, { start, end: new Date(end.getTime() - 1) })) {
        disabledTimes.push(time);
      }
    });
  });

  var filteredTimeSlots;

  const completeTimeProcess = () => {
    if (reservationManagementList.date > today) {
      filteredTimeSlots = timeSlots.filter((time) => {
        const current = parse(time, 'HH:mm', new Date());
        let start_time = reservationManagementList?.start_time || '00:00';
        const start = parse(start_time, 'HH:mm', new Date());


        // 예약 날짜가 오늘 이전인 경우, 모든 시간을 포함
        if (reservationManagementList.date < today) {
          console.log('11')
          return false;
        }

        // 예약 날짜가 오늘인 경우, 현재 시간 이후의 시간만 표시
        if (reservationManagementList.date === today) {
          console.log('22')
          return current >= start && format(current, 'HH:mm') >= currentTime;
        }

        // 예약 날짜가 미래인 경우, 기존 조건 적용
        console.log('33')

        return current >= start;
      });
    }
  }
  completeTimeProcess();

  // const completeTimeProcess = () => {
  //   if (reservationManagementList.date > today) {
  //     filteredTimeSlots = timeSlots.filter((time) => {
  //       const current = parse(time, 'HH:mm', new Date()); // 현재 시간대
  //       const start = parse(reservationManagementList?.start_time || '00:00', 'HH:mm', new Date()); // 예약 시작 시간

  //       // 비활성화된 시간을 정렬하여 마지막 비활성화된 시간 구하기
  //       const sortedDisabledTimes = disabledTimes
  //         .map((t) => parse(t, 'HH:mm', new Date()))
  //         .sort((a, b) => a - b); // 시간 순으로 정렬

  //       const lastDisabledTime = sortedDisabledTimes[sortedDisabledTimes.length - 1]; // 마지막 비활성화된 시간

  //       // 조건:
  //       // 1. 예약 시작 시간 이후만 선택
  //       // 2. 비활성화된 시간대는 제외
  //       // 3. 마지막 비활성화된 시간 이후는 선택 불가
  //       return (
  //         current > start && // 예약 시작 시간 이후만 선택
  //         !disabledTimes.includes(time) && // 비활성화된 시간 제외
  //         (lastDisabledTime ? current <= lastDisabledTime : true) // 마지막 비활성화된 시간 이후는 선택 불가
  //       );
  //     });
  //   }
  // };


  console.log(timeList)


  const isDisabledForCompletion = (startTime) => {
    if (!startTime) return false; // 시작 시간이 없으면 패스
    const parsedStartTime = parse(startTime, 'HH:mm', new Date());
    const startPlus30 = addMinutes(parsedStartTime, 30);
    const formattedStartPlus30 = format(startPlus30, 'HH:mm');
    return disabledTimes.includes(formattedStartPlus30);
  };
  console.log(disabledTimes)
  console.log(isDisabledForCompletion(reservationManagementList.start_time))


  if (isDisabledForCompletion(reservationManagementList.start_time)) {

  }


  var reservationNo = isDisabledForCompletion(reservationManagementList.start_time)



  console.log(reservationNo)





  // 30분 단위로 순서대로 되어 있는지 확인하는 함수
const isTimeSlotsInOrder = (timeSlots) => {
  // timeSlots 배열이 비어있는지 확인
  if (timeSlots.length === 0) return true;

  // 시간을 HH:mm 형식으로 파싱하여 배열을 비교
  for (let i = 1; i < timeSlots.length; i++) {
    const prevTime = parse(timeSlots[i - 1], 'HH:mm', new Date());
    const currentTime = parse(timeSlots[i], 'HH:mm', new Date());

    // 두 시간 차이가 30분인지 확인
    const timeDiff = (currentTime - prevTime) / (1000 * 60); // 차이 (분 단위)

    if (timeDiff !== 30) {
      console.log(`Error at index ${i}: ${timeSlots[i - 1]} -> ${timeSlots[i]}`);

      return false; // 30분 단위가 아니면 false 반환
    }
  }

  return true; // 모든 시간이 30분 단위로 순서대로 되어 있으면 true 반환
};

// disabledTimes가 30분 단위로 순서대로 되어 있는지 확인
const isDisabledTimesValid = isTimeSlotsInOrder(disabledTimes);

console.log(isDisabledTimesValid); // true 또는 false 출력



const uniqueAndSortDisabledTimes = (times) => {
  // Set을 사용해 중복 제거
  const uniqueTimes = [...new Set(times)];

  // 내림차순으로 정렬 (HH:mm 형식으로 파싱하여 비교)
  return uniqueTimes.sort((a, b) => {
    const timeA = parse(a, 'HH:mm', new Date());
    const timeB = parse(b, 'HH:mm', new Date());

    // 내림차순으로 정렬하려면 b - a를 반환
    return timeA - timeB;
  });
};


// 중복을 제거하고 내림차순으로 정렬한 disabledTimes
const sortedDisabledTimes = uniqueAndSortDisabledTimes(disabledTimes);

console.log(sortedDisabledTimes);



  const [modalData, setModalData] = useState(null);
  const [activeTime, setActiveTime] = useState(null);


  if (!reservationManagementList) {
    return (
      <div>로딩 중... </div>
    )
  }
  const handleButtonClick = (time) => {
    console.log("time")
    console.log(time)
    console.log("time")

    console.log("reservationCompleteTime")
    setReservationCompleteTime(time)

    console.log(reservationCompleteTime)
    console.log("reservationCompleteTime")
    setActiveTime(time);

    console.log("activeTime")
    console.log(activeTime)
    console.log("activeTime")

  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className='page-container2' lang='ko'>
      <div className='navigation'>
        <button>
          <img src={arrowButtonUrl} alt='' onClick={() => navigate('/business/reservation/management')} />
        </button>
        상세보기
        <div> </div>
      </div>

      <div className='detail-form1'>
        <div className='detail-form2'>
          <div className='detail-title'>미용사</div>
          <div className='detail-info'>{reservationManagementList.business_desinger_name}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>보호자 연락처</div>
          <div className='detail-info'>{reservationManagementList.user_phone}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>반려동물 이름</div>
          <div className='detail-info'>{reservationManagementList.pet_name}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>반려동물 종</div>
          <div className='detail-info'>{reservationManagementList.pet_species}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>반려동물 품종</div>
          <div className='detail-info'>{reservationManagementList.pet_breed}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>몸무게</div>
          <div className='detail-info'>{reservationManagementList.pet_weight} kg</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>나이</div>
          <div className='detail-info'>{reservationManagementList.pet_birth} 세</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>성별</div>
          {
            reservationManagementList.pet_gender
              ? <div className='detail-info'>남</div>
              : <div className='detail-info'>여</div>
          }
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>중성화 여부</div>
          <div className='detail-info'>{reservationManagementList.pet_neuter}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>스타일</div>
          <div className='detail-info'>{reservationManagementList.beauty_style}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>특이사항</div>
          <div className='detail-info'>{reservationManagementList.beauty_significant}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>주의사항</div>
          <div className='detail-info'>{reservationManagementList.beauty_caution}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>예약날짜</div>
          <div className='detail-info'>{reservationManagementList.date}</div>
        </div>
        <div className='detail-form2'>
          <div className='detail-title'>시작시간</div>
          <div className='detail-info'>{reservationManagementList.start_time}</div>
        </div>

        <div className='detail-form2'>
          {
            reservationManagementList.reservation_state === '완료' ? (
              <div className='detail-title'>완료시간</div>
            ) : reservationManagementList.reservation_state === '대기' ? (
              <div className='detail-title'>완료시간</div>
            ) : reservationManagementList.reservation_state === '거절' ? (
              <div className='detail-title'>거절내용</div>
            ) : (
              <div style={{ fontWeight: 'bold', color: 'gray' }}>알 수 없음</div>
            )
          }


          {
            reservationManagementList.reservation_state === '완료' ? (
              <div className='detail-info'>
                {reservationManagementList.end_time}
              </div>
            ) : reservationManagementList.reservation_state === '대기' ? (
              <div id="modal-body">
                <div className="time-selection">
                  {
                    reservationNo ? (
                      <div className="time-selection" style={{color : "red", fontWeight : "bold"}}>
                        예약불가
                      </div>
                    ) : (
                      <div className="time-selection">
                        {filteredTimeSlots?.map((time) => (
                          <div
                            key={time}
                            className={`time-box ${activeTime === time ? 'clicked' : ''} ${disabledTimes.includes(time) ? 'disabled' : ''}`}
                            onClick={() => !disabledTimes.includes(time) && handleButtonClick(time)} // 비활성화된 시간 클릭 방지
                          >
                            {time}
                          </div>
                        ))}

                      </div>
                    )
                  }
                </div>
              </div>
            ) : reservationManagementList.reservation_state === '거절' ? (
              <div className='detail-info' style={{ color: "red", fontWeight: "bold" }}>
                {reservationManagementList.reject_content}
              </div>
            ) : (
              <div style={{ fontWeight: 'bold', color: 'gray' }}>알 수 없음</div>
            )
          }
        </div>
        {
          reservationManagementList.reservation_state === '완료' ? (
            <div className='detail-form2'>
              <div className='detail-title'>미용금액</div>
              <div className='detail-info'>{reservationManagementList.beauty_price} 원</div>
            </div>
          ) : reservationManagementList.reservation_state === '대기' ? (
            <div className='detail-form2'>
              <div className='detail-title'>미용가격</div>
              <div className='detail-info'><input
                type="number"
                name="beauty_price"
                min="0"
                step="1000" // 1000 단위로 값 증가
                onChange={handleInputChange}
              />
              </div>
            </div>
          ) : (
            <div className='detail-info'>

            </div>
          )
        }

      </div>



      {
        reservationManagementList.reservation_state === '완료' ? (
          <div className='footer-button'>
            예약이 완료되었습니다.
          </div>
        ) : reservationManagementList.reservation_state === '대기' ? (
          <div className='footer-button'>
            <button className='reject-btn' onClick={() => openModal('reject')}>거절</button>
            <button className='accept-btn' onClick={() => openModal('accept')}>수락</button>
          </div>
        ) : reservationManagementList.reservation_state === '거절' ? (
          <div className='footer-button' style={{ color: "red", fontWeight: "bold" }}>
            예약이 거절되었습니다.
          </div>
        ) : (
          <div style={{ fontWeight: 'bold', color: 'gray' }}>알 수 없음</div>
        )
      }

      <ReservationAcceptModal
        isOpen={isModalOpen && actionType === 'accept'}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
        actionType={actionType}
      />

      <ReservationRejectModal
        isOpen={isModalOpen && actionType === 'reject'}
        onClose={() => setModalOpen(false)}
        onConfirm={handleReject}
        actionType={actionType}
      />

      <ReservationCheckModal
        isOpen={isCheckModalOpen}
        onClose={() => setCheckModalOpen(false)}
        message={checkMessage}
      />
    </div>
  );
};

export default ReservationDetail;