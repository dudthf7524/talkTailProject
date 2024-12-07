import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../Api'; // axios 인스턴스나 API 호출 모듈
import Popup from './PopupModal'; // 팝업 컴포넌트

const PrivateRoute = ({ element: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // 팝업 상태 추가

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const response = await api.get('/api/verify-token', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.status === 200) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            localStorage.removeItem('token'); // 유효하지 않은 토큰 제거
            setShowPopup(true); // 팝업 표시
          }
        } else {
          setIsAuthenticated(false);
          setShowPopup(true); // 팝업 표시
        }
      } catch (error) {
        console.error('토큰 검증 오류:', error);
        setIsAuthenticated(false);
        setShowPopup(true); // 팝업 표시
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false); // 팝업 닫기
    window.location.href = '/'; // 로그인 페이지로 이동
  };

  if (loading) {
    return <div>Loading...</div>; // 토큰 검증 중 로딩 화면 표시
  }

  if (!isAuthenticated) {
    return (
      <>
        {showPopup && (
          <Popup closeModal={handleClosePopup} 
          isWarning={true}
          text=' 로그인 페이지로 이동합니다.'
          >
            로그인이 필요합니다
          </Popup>
        )}
        {null}
      </>
    );
  }

  return <Component {...rest} />;
};

export default PrivateRoute;