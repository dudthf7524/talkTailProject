import React, { useEffect, useContext, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from '../../Api';

function UserInformation() {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/button/arrow_left.svg`;
  const keyButtonUrl = `${process.env.PUBLIC_URL}/images/icon/keyboard_return.svg`;

  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/user/auth", {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
          },
        })
        .then((response) => {
          console.log(response.data); // 서버에서 전달하는 사용자 정보 출력
          setUser(response.data);
        })
        .catch((error) => {
          console.error("에러 발생:", error);
        });
    }
    else{
      navigate('/')
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

  console.log(formData);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const nameRef = useRef(null);
  const userPhoneRef1 = useRef(null);
  const userPhoneRef2 = useRef(null);
  const userPhoneRef3 = useRef(null);

  const [name, setName] = useState('');
  const [user_phone, setUserPhone] = useState('');

  const [user_phone1, setUserPhone1] = useState('');
  const [user_phone2, setUserPhone2] = useState('');
  const [user_phone3, setUserPhone3] = useState('');


  const validateForm = () => {
    const koreanRegex = /^[\uAC00-\uD7A3]{1,5}$/; // 한글만 5자
    const numberRegexThree = /^\d{3}$/;
    const numberRegexFour = /^\d{4}$/;

    setName('');
    setUserPhone('');

    if (!formData.user_name.trim()) {
      setName('이름을 입력해주세요.');
      nameRef.current.focus();
      return;
    }
    if (!koreanRegex.test(formData.user_name)) {
      setName('이름은 한글, 5글자 이하만 입력 가능합니다.');
      nameRef.current.focus();
      return;
    }
    if (!formData.user_phone1.trim()) {
      setUserPhone('전화번호1을 입력해주세요');
      userPhoneRef1.current.focus();
      return;
    }
    if (!numberRegexThree.test(formData.user_phone1)) {
      setUserPhone('전화번호1은 숫자, 3글자만 입력 가능합니다.');
      userPhoneRef1.current.focus();
      return;
    }
    if (!formData.user_phone2.trim()) {
      setUserPhone('전화번호2을 입력해주세요');
      userPhoneRef2.current.focus();
      return;
    }
    if (!numberRegexFour.test(formData.user_phone2)) {
      setUserPhone('전화번호2는 숫자, 4글자만 입력 가능합니다.');
      userPhoneRef2.current.focus();
      return;
    }

    if (!formData.user_phone3.trim()) {
      setUserPhone('전화번호3을 입력해주세요');
      userPhoneRef3.current.focus();
      return;
    }
    if (!numberRegexFour.test(formData.user_phone3)) {
      setUserPhone('전화번호3은 숫자, 4글자만 입력 가능합니다.');
      nameRef.current.focus();
      return;
    }
    return true;
  }


  const handleSave = async () => {

    if (!validateForm()) return;

    console.log(user.id);
    console.log(formData);
    if (!user) {
      console.error("사용자 정보가 없습니다.");
      return;
    }

    // user.id를 formData에 추가
    const userInforMationData = {
      ...formData,
      platform_id: user.id, // user.id를 formData에 추가
    };
    console.log(userInforMationData);
    try {
      // 서버로 FormData를 전송
      const response = await axios.post(
        `${apiUrl}/api/user/register/information`,
        userInforMationData,
        {}
      );

      console.log("Upload successful:", response.data);

      // 성공적으로 업로드된 후 페이지를 이동하거나 추가 작업 수행
      navigate("/home"); // 성공 페이지로 이동
    } catch (error) {
      console.error("Error during upload:", error);
      // 오류 처리
    }
  };

  return (
    <div className="mid user_information_total" lang="ko">
      <div className="navigation">
        <button>
          <img
            src={arrowButtonUrl}
            alt=""
            onClick={() => navigate("/admin-menu")}
          />
        </button>
        사용자 정보 등록
        <div onClick={handleSave} style={{ cursor: "pointer" }}>
          저장
        </div>
      </div>
      <div className="main-mid">
        <div className="input-container">
          <p>이름</p>
          <input
            maxLength={5}
            type="text"
            name="user_name"
            ref={nameRef}
            value={formData.user_name}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="이름"
          />
          {name && <div className="pet-registration-page-error-box">{name}</div>}

        </div>
        <div className="input-container">
          <p>전화번호</p>
          <div className="input_box">
            <input
              maxLength={3}
              type="text"
              name="user_phone1"
              ref={userPhoneRef1}
              value={formData.user_phone1}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="전화번호1"
            />
            -
            <input
              maxLength={4}
              type="text"
              name="user_phone2"
              ref={userPhoneRef2}
              value={formData.user_phone2}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="전화번호2"
            />
            -
            <input
              maxLength={4}
              type="text"
              name="user_phone3"
              ref={userPhoneRef3}
              value={formData.user_phone3}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="전화번호3"
            />
          </div>
          {user_phone && <div className="pet-registration-page-error-box">{user_phone}</div>}
        </div>
      </div>
    </div>
  );
}

export default UserInformation;
