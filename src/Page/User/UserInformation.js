import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function UserInformation() {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  
  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/button/arrow_left.svg`;
  const keyButtonUrl = `${process.env.PUBLIC_URL}/images/icon/keyboard_return.svg`;

  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:8383/user/auth', {
        headers: {
          Authorization: `Bearer ${token}`,  // Authorization 헤더에 토큰 추가
        }
      })
        .then(response => {
          console.log(response.data);  // 서버에서 전달하는 사용자 정보 출력
          setUser(response.data)
        })
        .catch(error => {
          console.error('에러 발생:', error);
        });
    }

  }, []);

  const [formData, setFormData] = useState({
    
    user_name: "",
    user_phone1: "",
    user_phone2: "",
    user_phone3: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  const handleSave = async () => {
    console.log(user.id)
    console.log(formData)
    if (!user) {
        console.error('사용자 정보가 없습니다.');
        return;
      }
  
      // user.id를 formData에 추가
      const userInforMationData = {
        ...formData,
        platform_id: user.id,  // user.id를 formData에 추가
      };
      console.log(userInforMationData)
    try {
      // 서버로 FormData를 전송
      const response = await axios.post(`${apiUrl}/api/user/register/information`, userInforMationData, {
       
      });

      console.log('Upload successful:', response.data);

      // 성공적으로 업로드된 후 페이지를 이동하거나 추가 작업 수행
      navigate('/success'); // 성공 페이지로 이동
    } catch (error) {
      console.error('Error during upload:', error);
      // 오류 처리
    }
  };

  return (
    <div className='mid' lang='ko'>
      <div className='navigation'>
        <button>
          <img src={arrowButtonUrl} alt='' onClick={() => navigate('/admin-menu')} />
        </button>
        사용자 정보 등록
        <div onClick={handleSave} style={{cursor : "pointer"}}>저장</div>
      </div>
      <div className='main-mid'>
       
        <div className='input-container'>
          <p>이름</p>
          <input type='text' name='user_name' value={formData.user_name}  onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder='사업자 등록명' />
        </div>
         <div className='input-container'>
          <p>전화번호</p>
          <input type='text' name='user_phone1' value={formData.user_phone1} onChange={handleInputChange} onKeyDown={handleKeyDown}placeholder='010' />
        </div>
        -
        <div className='input-container'>
          <input type='text' name='user_phone2' value={formData.user_phone2} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder='0000' />
        </div>
        -
        <div className='input-container'>
          <input type='text' name='user_phone3' value={formData.user_phone3} onChange={handleInputChange} onKeyDown={handleKeyDown}placeholder='0000' />
        </div>
      </div>
    </div>
  );
}

export default UserInformation;
