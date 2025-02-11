import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../Api";

function RegisterStyle() {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const [user, setUser] = useState(null);
  const [lists, setLists] = useState([]);

  const [formData, setFormData] = useState({
    business_beauty_significant1: "",
    business_beauty_significant2: "",
    business_beauty_significant3: "",
    business_beauty_significant4: "",
    business_beauty_significant5: "",
  });

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
      business_registration_number: user.business_registration_number,
    };

    try {
      // 서버로 FormData를 전송
      const response = await axios.put(
        `${apiUrl}/api/business/beauty/significant`,
        dataToSend
      );

      console.log("Upload successful:", response.data);

      // 성공적으로 업로드된 후 페이지를 이동하거나 추가 작업 수행
      alert("수정이 완료되었습니다.");
      navigate("/business/register/style"); // 성공 페이지로 이동
    } catch (error) {
      console.error("Error during upload:", error);
      // 오류 처리
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/business/auth", {
          withCredentials: true,
        });
        if (!response.data) navigate("/business/login");
        setUser(response.data);
      } catch (error) {
        console.error("로그인 인증 실패:", error);
        navigate("/business/login");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchStyleSignificant = async () => {
      try {
        const response = await api.get("/api/business/style/significantGet", {
          withCredentials: true,
        });
        setLists(response.data);
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

  useEffect(() => {
    if (lists) {
      setFormData({
        business_beauty_significant1: lists.business_beauty_significant1 || "",
        business_beauty_significant2: lists.business_beauty_significant2 || "",
        business_beauty_significant3: lists.business_beauty_significant3 || "",
        business_beauty_significant4: lists.business_beauty_significant4 || "",
        business_beauty_significant5: lists.business_beauty_significant5 || "",
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
        특이사항
        <div style={{cursor : "pointer"}} onClick={handleSave}>수정</div>
      </div>
      <div className="main-mid">
        <div className="input-container">
          <p>특이사항 step1</p>
          <input
            type="text"
            name="business_beauty_significant1"
            value={formData.business_beauty_significant1}
            onChange={handleInputChange}
            placeholder="특이사항 step1"
          />
        </div>
        <div className="input-container">
          <p>특이사항 step2</p>
          <input
            type="text"
            name="business_beauty_significant2"
            value={formData.business_beauty_significant2}
            onChange={handleInputChange}
            placeholder="특이사항 step2"
          />
        </div>

        <div className="input-container">
          <p>특이사항 step3</p>
          <input
            type="text"
            name="business_beauty_significant3"
            value={formData.business_beauty_significant3}
            onChange={handleInputChange}
            placeholder="특이사항 step3"
          />
        </div>

        <div className="input-container">
          <p>특이사항 step4</p>
          <input
            type="text"
            name="business_beauty_significant4"
            value={formData.business_beauty_significant4}
            onChange={handleInputChange}
            placeholder="특이사항 step4"
          />
        </div>

        <div className="input-container">
          <p>특이사항 step5</p>
          <input
            type="text"
            name="business_beauty_significant5"
            value={formData.business_beauty_significant5}
            onChange={handleInputChange}
            placeholder="특이사항 step5"
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterStyle;
