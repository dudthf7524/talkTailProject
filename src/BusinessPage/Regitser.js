import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  
  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/button/arrow_left.svg`;
  const keyButtonUrl = `${process.env.PUBLIC_URL}/images/icon/keyboard_return.svg`;



  const [formData, setFormData] = useState({
    login_id: "",
    login_password: "",
    business_registration_name: "",
    business_registration_number: "",
    business_owner_name: "",
    business_owner_email: "",
    business_owner_phone1: 0,
    business_owner_phone2: 0,
    business_owner_phone3: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData)
  const handleUploadClick = (imageType) => {
    navigate(`/imgupload/${imageType}`);
  };

  const handleSave = async () => {
    try {
      // 서버로 FormData를 전송
      const response = await axios.post(`${apiUrl}/api/businesses`, formData, {
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
        회원가입
        <div onClick={handleSave}>저장</div>
      </div>
      <div className='main-mid'>
        카테고리
        <div className='input-container'>
          <p>사업체 운영 종류</p>
          <select name='category' onChange={handleInputChange}>
            <option value="beauty">미용</option>
            <option value="hotel">호텔</option>
            <option value="kindergarten">유치원</option>
          </select>
        </div>
        회원가입
        <div className='input-container'>
          <p>아이디</p>
          <input type='text' name='login_id' value={formData.login_id} onChange={handleInputChange} placeholder='상호명을 입력해 주세요.' />
        </div>
        <div className='input-container'>
          <p>비밀번호</p>
          <input type='password' name='login_password' value={formData.login_password} onChange={handleInputChange} placeholder='상호명을 입력해 주세요.' />
        </div>
        사업자 정보
        <div className='input-container'>
          <p>사업자 등록명</p>
          <input type='text' name='business_registration_name' value={formData.business_registration_name} onChange={handleInputChange} placeholder='사업자 등록명' />
        </div>
        <div className='input-container'>
          <p>사업자 번호</p>
          <input type='text' name='business_registration_number' value={formData.business_registration_number} onChange={handleInputChange} placeholder='000-00-00000' />
        </div>
        <div className='input-container'>
          <p>대표이름</p>
          <input type='text' name='business_owner_name' value={formData.business_owner_name} onChange={handleInputChange} placeholder='대표이름' />
        </div>
        <div className='input-container'>
          <p>이메일</p>
          <input type='text' name='business_owner_email' value={formData.business_owner_email} onChange={handleInputChange} placeholder='이메일' />
        </div>
        <div className='input-container'>
          <p>대표번호</p>
          <input type='text' name='business_owner_phone1' value={formData.business_owner_phone1} onChange={handleInputChange} placeholder='010' />
        </div>
        -
        <div className='input-container'>
          <input type='text' name='business_owner_phone2' value={formData.business_owner_phone2} onChange={handleInputChange} placeholder='0000' />
        </div>
        -
        <div className='input-container'>
          <input type='text' name='business_owner_phone3' value={formData.business_owner_phone3} onChange={handleInputChange} placeholder='0000' />
        </div>
      </div>
    </div>
  );
}

export default Register;
