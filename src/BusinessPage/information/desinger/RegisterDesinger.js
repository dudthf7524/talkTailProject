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

  const notice_analSac_option = [
    "desinger1.png",
    "desinger2.png",
    "desinger3.png",
    "desinger4.png",
  ];

  useEffect(() => {
    const textarea = document.getElementById("greetingTextarea");
    const placeholderText = "간단한 소개글\n30자 이내";
    textarea.setAttribute("placeholder", placeholderText);
    textarea.style.whiteSpace = "pre-line";
  }, []);

  const [formData, setFormData] = useState({
    business_desinger_name: "",
    business_desinger_grade: "",
    business_desinger_introduce: "",
  });

  const [selectedOptions, setSelectedOptions] = useState({
    business_desinger_profile: "",
  });

  const handleCheckboxChange = (category, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    formData.business_desinger_profile =
      selectedOptions.business_desinger_profile;
    try {
      // 서버로 FormData를 전송
      const response = await axios.post(
        `${apiUrl}/api/business/register/desinger`,
        formData,
        { withCredentials: true }
      );
      if (response.data === "common") {
        navigate("/business/login");
      }
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
        <img
          style={{ cursor: "pointer" }}
          src={arrowButtonUrl}
          alt=""
          onClick={() => navigate("/business/list/desinger")}
        />
        디자이너 등록
        <div style={{ cursor: "pointer" }} onClick={handleSave}>
          저장
        </div>
      </div>
      <div className="main-mid">
        <div className="desinger_profile">
          <p>디자이너 프로필을 선택해주세요</p>
          <div className="desinger_profile_box">
            {notice_analSac_option.map((option) => (
              <label
                key={option}
                style={{
                  color: selectedOptions.business_desinger_profile.includes(
                    option
                  )
                    ? "black"
                    : "#C4C4C4",
                }}
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.business_desinger_profile.includes(
                    option
                  )}
                  onChange={() =>
                    handleCheckboxChange("business_desinger_profile", option)
                  }
                />
                &nbsp;
                <img
                  src={`${process.env.PUBLIC_URL}/profile/${option}`}
                  style={{ cursor: "pointer", width: "150px", height: "150px" }}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="input-container">
          <p>디자이너 이름</p>
          <input
            type="text"
            name="business_desinger_name"
            value={formData.business_desinger_name}
            onChange={handleInputChange}
            placeholder="디자이너 이름을 입력해 주세요."
          />
        </div>

        <div className="input-container">
          <p>디자이너 직함</p>
          <input
            type="text"
            name="business_desinger_grade"
            value={formData.business_desinger_grade}
            onChange={handleInputChange}
            placeholder="디자이너 직함을 입력해 주세요."
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
