import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../CSS/auth.css'
import '../CSS/reservation.css'
import ReservationAcceptModal from './Modal/ReservationAccept';
import ReservationRejectModal from './Modal/ReservationReject';
import ReservationCheckModal from './Modal/ReservationCheck';
import '../CSS/reservationModal.css'
import api from '../Api'
const ReservationDetail = () => {

  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const { id } = useParams();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isCheckModalOpen, setCheckModalOpen] = useState(false);
  const [checkMessage, setCheckMessage] = useState('');
  const [actionType, setActionType] = useState('');
  const [reservationManagementList, setReservationManagementList] = useState([]);
  const [reservationCompleteTime, setReservationCompleteTime] = useState(''); // 완료 시간 상태 추가

  console.log(reservationCompleteTime)

  const reservatioInfo = [
    { title: '보호자 연락처', info: '010-5659-9852' },
    { title: '반려동물 이름', info: '누렁이까망이하양이노랑이 파랑이' },
    { title: '반려동물 종', info: '피카츄전기과포켓몬토토로밤만보몬스' },
    { title: '몸무게', info: '6.87kg' },
    { title: '성별', info: '여' },
    { title: '나이', info: '5' },
    { title: '스타일', info: '1cm + 알머리컷' },
    { title: '추가사항', info: '목욕\n위생' },
    { title: '특이사항', info: '피부병\n심장질환\n마킹\n침흘림\n더아프면 유감' },
    { title: '주의사항', info: '우리개는 물어요\n조심하세요' }
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/beauty/reservation/detail/${id}`, { withCredentials: true });
        setReservationManagementList(response.data);
        console.log(response.data)
      } catch (error) {

        console.error('예약관리 상세보기 실패', error);
        navigate('/business/login'); // 로그인 페이지로 리디렉션
      }
    };
    fetchUser();
  }, []);

  const formatInfo = (text) => {
    return text.split('\n').map((item, index) => (
      <React.Fragment key={index}>
        {item}
        <br />
      </React.Fragment>
    ));
  };

  const openModal = (type) => {
    setActionType(type);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleConfirm = async () => {
    try {
      const response = await api.put(`/api/beauty/reservation/setCompleteTime/${id}`, { reservationCompleteTime }, { withCredentials: true });
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


  };

  const handleReject = () => {
    console.log('거절');
    setCheckMessage('거절사유를 전송했습니다.');
    setModalOpen(false);
    setCheckModalOpen(true);
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
          <div className='detail-title'>완료시간</div>
          {
            reservationManagementList.beauty_reservation_is_avaiable
              ? <div className='detail-info'>
                {reservationManagementList.reservationCompleteTime}
              </div>
              : <div className='detail-info'>
                <input
                  type='text'
                  name='reservationConfirm'
                  placeholder='미용완료 시간을 입력해주세요.'
                  value={reservationCompleteTime}
                  onChange={(e) => setReservationCompleteTime(e.target.value)} // 상태 업데이트
                />
              </div>
          }

        </div>
      </div>
      {
        reservationManagementList.beauty_reservation_is_avaiable
          ?
          <div className='footer-button'>
            예약이 완료되었습니다.
          </div>
          :
          <div className='footer-button'>
            <button className='reject-btn' onClick={() => openModal('reject')}>거절</button>
            <button className='accept-btn' onClick={() => openModal('accept')}>수락</button>
          </div>
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