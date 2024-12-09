import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../..//CSS/myPage.css';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import { useNavigate } from 'react-router-dom';
import api from '../../Api';

const MyPage = () => {
  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
  const petPageUrl = `${process.env.PUBLIC_URL}/PageImage/user/petPage.svg`;
  const noteUrl = `${process.env.PUBLIC_URL}/PageImage/user/note.svg`;
  const calendarUrl = `${process.env.PUBLIC_URL}/PageImage/user/calendar.svg`;
  const heartUrl = `${process.env.PUBLIC_URL}/PageImage/list/heart.svg`;
  const [nickname, setNickname] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [isEditingNickname, setIsEditingNickname] = useState(false);

  useEffect(() => {
    fetchNickname();
  }, []);

  const fetchNickname = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found.');
      }

      const response = await api.get('/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;
      setNickname(userData.user_nickname);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // 오류 처리 로직 추가
    }
  };

  const saveNickname = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found.');
      }

      const response = await api.put('/api/user/profile', {
        user_nickname: newNickname,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUserData = response.data;
      setNickname(updatedUserData.user_nickname);
      setNewNickname('');
      setIsEditingNickname(false);
    } catch (error) {
      console.error('Error updating nickname:', error);
      // 오류 처리 로직 추가
    }
  };

  const cancelEditingNickname = () => {
    setNewNickname('');
    setIsEditingNickname(false);
  };

  const goBack = () => {
    navigate(-1); // 뒤로 가기
  };

  return (
    <div lang='ko'>
      <div className='mid'>
        <div className='navigation'>
          <button>
            <img src={arrowButtonUrl} alt='' onClick={goBack} />
          </button>
          마이페이지
          <div></div>
        </div>
        <div className='review-mid'>
          <div className='mypage-nickname-container'>
            {isEditingNickname ? (
              <div className='mypage-nickname-edit'>
                <input
                  type='text'
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                />
                <button onClick={saveNickname}>저장</button>
                <button onClick={cancelEditingNickname}>취소</button>
              </div>
            ) : (
              <div className='mypage-nickname'>
                <h1>{nickname}</h1>
                <p onClick={()=>navigate('/edit-user')}>수정</p>
              </div>
            )}
          </div>
          <div className='mypage-button-container'>
            <div className='mypage-button'>
              <div className='event-button'>
                <button onClick={() => navigate('/pet/list')}>
                  <img src={petPageUrl} alt='' />
                </button>
                <div className='event-button-text'>마이펫</div>
              </div>
              <div className='event-button'>
                <button onClick={() => navigate('/notice')}>
                  <img src={noteUrl} alt='' />
                </button>
                <div className='event-button-text'>알림창</div>
              </div>
              <div className='event-button'>
                <button onClick={() => navigate('/reservation')}>
                  <img src={calendarUrl} alt='' />
                </button>
                <div className='event-button-text'>예약내역</div>
              </div>
              <div className='event-button'>
                <button onClick={() => navigate('/saved')}>
                  <img src={heartUrl} alt='' />
                </button>
                <div className='event-button-text'>찜한내역</div>
              </div>
            </div>
          </div>
          <div className='mypage-info-container'>
            <div className='mypage-info'>내정보관리</div>
            <div className='mypage-info-contents'>
              <p>나의 리뷰 내역</p>
              <p>이용내역</p>
              <p>주문내역</p>
              <p>예약패널티</p>
            </div>
          </div>
          <div className='mypage-info-container'>
            <div className='mypage-info'>고객센터</div>
            <div className='mypage-info-contents'>
              <p>공지사항</p>
              <p>1:1 상담</p>
              <p>약관보기</p>
              <p>버전 v01.24.0</p>
            </div>
          </div>
        </div>
      </div>
      <NButtonContainer />
    </div>
  );
};

export default MyPage;
