import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const [checkMessage, setCheckMessage] = useState(""); // 메시지 상태
  const [isIdValid, setIsIdValid] = useState(false); // 아이디 유효성 상태
  const [formData, setFormData] = useState({
    login_id: "",
    login_password: "",
    business_registration_name: "",
    business_registration_number: "",
    business_owner_name: "",
    business_owner_email: "",
    business_owner_phone1: "",
    business_owner_phone2: "",
    business_owner_phone3: "",
    category: "beauty"
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
    if (!isIdValid) {
      alert("아이디를 확인해주세요.");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/api/businesses`, formData);
      console.log("Upload successful:", response.data);
      navigate("/business/login");
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  async function checkLogin() {
    if (!formData.login_id.trim()) { // 아이디 입력이 비어 있는지 확인
      setCheckMessage("아이디를 입력해주세요.");
      setIsIdValid(false);
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/api/business/checkLogin`, { login_id: formData.login_id });

      if (response.data === "1") {
        setCheckMessage("사용중인 아이디입니다.");
        setIsIdValid(false);
      } else if (response.data === "0") {
        setCheckMessage("사용 가능한 아이디입니다.");
        setIsIdValid(true);
      }
    } catch (error) {
      console.error("Error during login check:", error);
      setCheckMessage("오류가 발생했습니다. 다시 시도해주세요.");
      setIsIdValid(false);
    }
  }

  return (
    <div className='mid' lang='ko'>

      <div className='navigation'>

        <button>
          <img src={arrowButtonUrl} alt='' onClick={() => navigate('/admin-menu')} />
        </button>
        회원가입
        <div onClick={handleSave} disabled={!isIdValid}>저장</div>
      </div>
      <div className='main-mid'>
        회원가입
        <div className="input-container-id">
          <p>아이디</p>
          <input
            type="text"
            name="login_id"
            value={formData.login_id}
            onChange={(e) => {
              handleInputChange(e);
              setCheckMessage(""); // 메시지 초기화
              setIsIdValid(false); // 상태 초기화
            }}
            placeholder="아이디를 입력해 주세요"
          />
          <button className="checkLogin" onClick={checkLogin}>
            아이디 중복확인
          </button>
          {checkMessage && (
            <p style={{ color: isIdValid ? "green" : "red", marginTop: "5px" }}>
              {checkMessage}
            </p>
          )}
        </div>
        <div className='input-container'>
          <p>비밀번호</p>
          <input type='password' name='login_password' value={formData.login_password} onChange={handleInputChange} placeholder='비밀번호를 입력해주세요' />
        </div>
        사업자 정보
        <div className='input-container'>
          <p>사업자 등록명</p>
          <input type='text' name='business_registration_name' value={formData.business_registration_name} onChange={handleInputChange} placeholder='사업자 등록명을 입력해주세요' />
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
        <div className='input-container-phone'>
          <p>대표번호</p>
          <input type='text' name='business_owner_phone1' value={formData.business_owner_phone1} onChange={handleInputChange} placeholder='010' />
          <span>-</span>
          <input type='text' name='business_owner_phone2' value={formData.business_owner_phone2} onChange={handleInputChange} placeholder='0000' />
          <span>-</span>
          <input type='text' name='business_owner_phone3' value={formData.business_owner_phone3} onChange={handleInputChange} placeholder='0000' />
        </div>

      </div>
    </div>
  );
}

export default Register;
