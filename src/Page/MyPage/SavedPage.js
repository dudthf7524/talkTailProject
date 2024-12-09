import React, { useEffect, useState } from 'react';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import { useNavigate } from "react-router-dom";
import api from '../Api';
import Modal from '../Components/Modal';
import '../styles/myPage.css';

const MyPage = () => {
  const [savedList, setSavedList] = useState([]); // 찜한 업체 리스트 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // 삭제할 항목의 ID를 저장
  const navigate = useNavigate();

  useEffect(() => {
    fetchSaved();
  }, []);

  const fetchSaved = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found.');
      }

      const response = await api.get('/api/saved', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const savedData = response.data;
      setSavedList(savedData); // 상태 업데이트
    } catch (error) {
      console.error('Error fetching saved data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found.');
      }

      await api.delete(`/api/saved/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 삭제 후 리스트 업데이트
      setSavedList(savedList.filter(item => item.id !== selectedId));
      closeModal();
    } catch (error) {
      console.error('Error deleting saved item:', error);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id); // 삭제할 항목의 ID 설정
    openModal(); // 모달 열기
  };

  const handleReservation = (id) => {
    // 예약 페이지로 이동
    navigate(`/pet-select/${id}`);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div lang='ko'>
      <div className='mid'>
        <div className='navigation'>
          <div></div>
          찜한내역
          <div></div>
        </div>
        <div className='review-mid'>
          {savedList.map(item => (
            <div key={item.id} className='saved-container'>
              <div className='saved-textbox'>
                <h1>{item.name}</h1>
                <p>{item.location}</p>
              </div>
              <div className='saved-buttonbox'>
                <button onClick={() => handleDeleteClick(item.id)}>
                  삭제
                </button>
                <button className='r-b' onClick={() => handleReservation(item.id)}>
                  바로 예약
                </button>
              </div>
            </div>
          ))}
        </div>
        {isModalOpen && (
          <Modal
            closeModal={closeModal}
            isWarning={true}
            cancelText="취소"
            confirmText="확인"
            onCancel={closeModal} // 취소 버튼을 누르면 모달 닫기
            onConfirm={handleDelete} // 확인 버튼을 누르면 삭제 실행
          >
            찜한 내역에서 삭제하시겠습니까?
          </Modal>
        )}
      </div>
      <NButtonContainer />
    </div>
  );
};

export default MyPage;
