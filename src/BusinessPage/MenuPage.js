import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../BusinessCSS/menu.css'
import axios from 'axios';

const AdminMenu = () => {
  const logoUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/logo/logo.svg`;
  const reservationIcon = `${process.env.PUBLIC_URL}/BusinessPageImage/icon/reservationIcon.svg`;
  const customerIcon = `${process.env.PUBLIC_URL}/BusinessPageImage/icon/customerIcon.png`;
  const reviewIcon = `${process.env.PUBLIC_URL}/BusinessPageImage/icon/reviewIcon.png`;
  const calculateIcon = `${process.env.PUBLIC_URL}/BusinessPageImage/icon/calculateIcon.png`;
  const ImageIcon = `${process.env.PUBLIC_URL}/BusinessPageImage/icon/ImageIcon.png`;
  const informationIcon = `${process.env.PUBLIC_URL}/BusinessPageImage/icon/informationIcon.png`;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8383/user/auth', { withCredentials: true });
        setUser(response.data);
        console.log(response.data)
      } catch (error) {
        
        console.error('로그인 인증 실패:', error);
        navigate('/login'); // 로그인 페이지로 리디렉션
      }
    };
    fetchUser();
  }, []);
  if (!user) {
    return <div>로딩 중...</div>;
  }
  return (
    <div className='page-container'>
      <div className='menu-form' lang='ko'>
        <div className='greet-text'>안녕하세요.🙂</div>
        <div className='greet-text'>{user.business_owner_name} 님</div>
        <div className='admin-menu-text'>Admin Menu</div>
        <div className='menu-grid'>
          <button className='menu-tbt-btn' onClick={()=>navigate('/reservation-management')}>
            <img src={reservationIcon} alt="reservation icon" className='menu-icon'/>
            <span className='menu-text'><br/>예약관리</span>
          </button>
          <button className='menu-tbt-btn' onClick={()=>navigate('/customer-management')}>
            <img src={customerIcon} alt="customer icon" className='menu-icon'/>
            <span className='menu-text'><br/>고객관리</span>
          </button>
          <button className='menu-tbt-btn' onClick={()=>navigate('/review-management')}>
            <img src={reviewIcon} alt="review icon" className='menu-icon'/>
            <span className='menu-text'><br/>후기관리</span>
          </button>
          <button className='menu-tbt-btn' onClick={()=>navigate('/calculation-management')}>
            <img src={calculateIcon} alt="calculate icon" className='menu-icon'/>
            <span className='menu-text'><br/>정산관리</span>
          </button>
        </div>
        <button className='menu-tbt-btn2' onClick={()=>navigate('/business/register/information')}>
          <img src={informationIcon} alt="information icon" className='menu-icon'/>
          <span className='menu-text'><br/>첫 등록 자료 올리기</span>
        </button>
        <button className='menu-tbt-btn2' onClick={()=>navigate('/business/register/desinger')}>
         <img src={customerIcon} alt="customer icon" className='menu-icon'/>
          <span className='menu-text'><br/>디자이너 등록</span>
        </button>
        <img src={logoUrl} alt="logo img" className='logo-img'></img>
      </div>
    </div>
  );
};

export default AdminMenu;