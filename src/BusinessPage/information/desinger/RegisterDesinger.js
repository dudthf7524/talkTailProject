import React, { useEffect, useContext, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterDesinger() {
  // 주소 api
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const keyButtonUrl = `${process.env.PUBLIC_URL}/BusinessImage/icon/keyboard_return.svg`;
  const defaultPetImgUrl = `${process.env.PUBLIC_URL}/PageImage/pet/pet_img_L.png`;
  const [petImgUrl, setPetImgUrl] = useState(defaultPetImgUrl);

  useEffect(() => {
    const textarea = document.getElementById("greetingTextarea");
    const placeholderText = "간단한 소개글\n30자 이내";
    textarea.setAttribute("placeholder", placeholderText);
    textarea.style.whiteSpace = "pre-line";
  }, []);

  const [formData, setFormData] = useState({
    business_desinger_name: "",
    business_desinger_introduce: "",
  });

  console.log(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      // 서버로 FormData를 전송
      const response = await axios.post(
        `${apiUrl}/api/business/register/desinger`,
        formData,
        { withCredentials: true }
      );
      if (response.data === 'common') {
        navigate('/business/login')
      }
      console.log("Upload successful:", response.data);
      // 성공적으로 업로드된 후 페이지를 이동하거나 추가 작업 수행
      navigate("/business/list/desinger"); // 성공 페이지로 이동
    } catch (error) {
      console.error("Error during upload:", error);
      // 오류 처리
    }
  };

  return (
    <div className="mid" lang="ko">
      <div className="navigation">
        <img style={{ cursor: "pointer" }}
          src={arrowButtonUrl}
          alt=""
          onClick={() => navigate("/business/list/desinger")}
        />
        디자이너 등록
        <div style={{ cursor: "pointer" }} onClick={handleSave}>저장</div>
      </div>
      <div className="main-mid">
        <div className="upload-img" >
          {/* 업로드된 이미지를 미리보기로 표시 */}
          프로필
          <label htmlFor="imageUpload">
            <img src={petImgUrl} alt="" tabIndex={0} style={{ cursor: "pointer" }} />
          </label>
        </div>
        <div className="input-container">
          <p>디자이너 이름</p>
          <input
            type="text"
            name="business_desinger_name"
            value={formData.business_desinger_name}
            onChange={handleInputChange}
            placeholder="상호명을 입력해 주세요."
          />
        </div>

        <div className="input-container">
          <p>소개글</p>
          <div className="textarea-wrapper">
            <textarea
              id="greetingTextarea"
              name="business_desinger_introduce"
              value={formData.business_desinger_introduce}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterDesinger;
