import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../../Api";

function BusinessBeautyEditOption() {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const [lists, setLists] = useState([]);

  const [formData, setFormData] = useState({
    business_beauty_option1: "",
    business_beauty_option2: "",
    business_beauty_option3: "",
    business_beauty_option4: "",
    business_beauty_option5: "",
  });

  useEffect(() => {
    const fetchStyleSignificant = async () => {
      try {
        const response = await api.get("/api/business/beauty/option", {
          withCredentials: true,
        });
        setLists(response.data);
        if (response.data === "common") {
          navigate("/business/login"); // 로그인 페이지로 리디렉션
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/business/login"); // 로그인 페이지로 리디렉션
        } else {
          console.error("권한 조회 실패:", error.message);
        }
      }
    };
    fetchStyleSignificant();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData);

  const handleSave = async () => {
    const dataToSend = {
      ...formData,
    };
    
    try {
      // 서버로 FormData를 전송
      const response = await axios.put(
        `${apiUrl}/api/business/beauty/option`,
        dataToSend,
        { withCredentials: true }
      );

      console.log("Upload successful:", response.data);

      // 성공적으로 업로드된 후 페이지를 이동하거나 추가 작업 수행

      window.location = "/business/edit/option";
    } catch (error) {
      console.error("Error during upload:", error);
      // 오류 처리
    }
  };

  useEffect(() => {
    if (lists) {
      setFormData({
        business_beauty_option1: lists.business_beauty_option1 || "",
        business_beauty_option2: lists.business_beauty_option2 || "",
        business_beauty_option3: lists.business_beauty_option3 || "",
        business_beauty_option4: lists.business_beauty_option4 || "",
        business_beauty_option5: lists.business_beauty_option5 || "",
      });
    }
  }, [lists]);
  // if (!user) {
  //     return <div>로딩 중...</div>;
  // }

  return (
    <div className="mid" lang="ko">
      <div className="navigation">
        <button>
          <img
            src={arrowButtonUrl}
            alt=""
            onClick={() => navigate("/business/menu")}
          />
        </button>
        매장옵션
        <div style={{cursor : "pointer"}} onClick={handleSave}>수정</div>
      </div>
      <div className="main-mid">
        <div className="input-container">
          <p>옵션 step1</p>
          <input
            type="text"
            name="business_beauty_option1"
            value={formData.business_beauty_option1}
            onChange={handleInputChange}
            placeholder="옵션 step1"
          />
        </div>
        <div className="input-container">
          <p>옵션 step2</p>
          <input
            type="text"
            name="business_beauty_option2"
            value={formData.business_beauty_option2}
            onChange={handleInputChange}
            placeholder="옵션 step2"
          />
        </div>

        <div className="input-container">
          <p>옵션 step3</p>
          <input
            type="text"
            name="business_beauty_option3"
            value={formData.business_beauty_option3}
            onChange={handleInputChange}
            placeholder="옵션 step3"
          />
        </div>

        <div className="input-container">
          <p>옵션 step4</p>
          <input
            type="text"
            name="business_beauty_option4"
            value={formData.business_beauty_option4}
            onChange={handleInputChange}
            placeholder="옵션 step4"
          />
        </div>

        <div className="input-container">
          <p>옵션 step5</p>
          <input
            type="text"
            name="business_beauty_option5"
            value={formData.business_beauty_option5}
            onChange={handleInputChange}
            placeholder="옵션 step5"
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessBeautyEditOption;
