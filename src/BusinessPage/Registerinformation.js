import React, { useEffect, useContext, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImageContext } from "../Contexts/ImageContext";
import "../BusinessCSS/registerInformation.css";
import "../BusinessCSS/main.css";
import InformationModal from "./Modal/InformationModal";
import api from "../Api";
function RegisterInformation() {
  // 주소 api
  const [postcode, setPostcode] = useState(""); // 우편번호
  const [roadAddress, setRoadAddress] = useState(""); // 도로명 주소
  const [jibunAddress, setJibunAddress] = useState(""); // 지번 주소
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 열림/닫힘 상태

  const popupRef = useRef(null);

  const handleAddressSearch = () => {
    setIsPopupOpen(true); // 팝업 열기

    const currentScroll = Math.max(
      document.body.scrollTop,
      document.documentElement.scrollTop
    );

    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.body.appendChild(script);

    script.onload = () => {
      new window.daum.Postcode({
        oncomplete: (data) => {
          // 도로명 주소와 지번 주소 선택 처리
          if (data.userSelectedType === "R") {
            setRoadAddress(data.roadAddress); // 도로명 주소
          } else {
            setRoadAddress("");
          }
          setJibunAddress(data.jibunAddress); // 지번 주소
          setPostcode(data.zonecode); // 우편번호

          // 팝업 닫기
          setIsPopupOpen(false);

          // 스크롤 위치 복원
          document.body.scrollTop = currentScroll;
        },
        onresize: (size) => {
          if (popupRef.current) {
            popupRef.current.style.height = `${size.height}px`;
          }
        },
        width: "100%",
        height: "100%",
      }).embed(popupRef.current);
    };
  };

  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const { imageFiles } = useContext(ImageContext);
  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const keyButtonUrl = `${process.env.PUBLIC_URL}/BusinessImage/icon/keyboard_return.svg`;
  console.log("imageFiles");
  console.log(imageFiles);
  console.log("imageFiles");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/business/auth", {
          withCredentials: true,
        });
        setUser(response.data);
        console.log(response.data);
        if (!response.data) {
          navigate("/business/login"); // 로그인 페이지로 리디렉션
        }
      } catch (error) {
        console.error("로그인 인증 실패:", error);
        navigate("/business/login"); // 로그인 페이지로 리디렉션
      }
    };
    fetchUser();
  }, []);
  useEffect(() => {
    const textarea = document.getElementById("greetingTextarea");
    if (textarea) {
      // 요소가 존재하는지 확인
      const placeholderText = "간단한 인삿말\n30자 이내";
      textarea.setAttribute("placeholder", placeholderText);
      textarea.style.whiteSpace = "pre-line";
    }
  }, []);

  const handleUploadClick = (pathName, imageType) => {
    navigate(`/business/imgupload/${pathName}/${imageType}`);
  };
  const [formData, setFormData] = useState({
    business_name: "",
    address_postcode: "",
    address_road: "",
    address_jibun: "",
    business_no_show: "",
  });

  formData.address_postcode = postcode;
  formData.address_road = roadAddress;
  formData.address_jibun = jibunAddress;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData);

  const handleSave = async () => {
    try {
      const data = new FormData();
      // FormData에 텍스트 필드 추가
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      console.log("aaa");
      console.log(data);
      if (user?.business_registration_number) {
        data.append(
          "business_registration_number",
          user.business_registration_number
        );
      }

      console.log(data);

      // FormData에 이미지 파일 추가
      Object.keys(imageFiles).forEach((key) => {
        imageFiles[key].forEach((file) => {
          data.append(key, file);
        });
      });

      const response = await axios.post(
        `${apiUrl}/api/business/register/information`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload successful:", response.data);

      // 성공적으로 업로드된 후 페이지를 이동하거나 추가 작업 수행
      navigate("/business/menu"); // 성공 페이지로 이동
    } catch (error) {
      console.error("Error during upload:", error);
      // 오류 처리
    }
  };
  const [user, setUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [actionType, setActionType] = useState("");

  const openModal = (type) => {
    setActionType(type);
    setModalOpen(true);
  };

  if (!user) {
    return <div>로딩 중...</div>;
  }

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
        등록자료 올리기
        <div style={{cursor : "pointer"}} onClick={() => openModal("accept")}>저장</div>
      </div>
      <div className="main-mid">
        <div
          className="upload-box"
          onClick={() => handleUploadClick("register", "main")}
        >
          <p>메인사진(상세페이지 최상단 노출)</p>
          <p>jpg 해상도 430*468</p>
          <div>
            <img src={keyButtonUrl} alt="" />
            파일올리기
          </div>
        </div>
        <div
          className="upload-box"
          onClick={() => handleUploadClick("register", "pricing")}
        >
          <p>가격표</p>
          <p>엑셀,이미지,pdf,한글 파일 등</p>
          <div>
            <img src={keyButtonUrl} alt="" />
            파일올리기
          </div>
        </div>
        <div className="input-container">
          <p>상호명</p>
          <input
            type="text"
            name="business_name"
            value={formData.business_name}
            onChange={handleInputChange}
            placeholder="상호명을 입력해 주세요."
          />
        </div>
        {isPopupOpen && (
          <div
            style={{
              display: "block",
              position: "relative",
              width: "100%",
              height: "300px",
              border: "1px solid #ddd",
              marginTop: "10px",
            }}
          >
            <img
              src="//t1.daumcdn.net/postcode/resource/images/close.png"
              alt="닫기"
              style={{
                cursor: "pointer",
                position: "absolute",
                top: "0px",
                right: "0px",
                zIndex: 1,
              }}
              onClick={() => setIsPopupOpen(false)}
            />
            <div
              ref={popupRef}
              style={{
                width: "100%",
                height: "100%",
              }}
            ></div>
          </div>
        )}
        <div className="input-container">
          <button onClick={handleAddressSearch}>우편번호 찾기</button>
        </div>
        <div className="input-container">
          <p>우편번호</p>
          <input
            type="text"
            name="address_postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            readOnly
            placeholder="우편번호"
          />
        </div>
        <div className="input-container">
          <p>도로명 주소</p>
          <input
            type="text"
            name="address_road"
            value={roadAddress}
            onChange={handleInputChange}
            readOnly
            placeholder="도로명 주소"
          />
        </div>
        <div className="input-container">
          <p>지번 주소</p>
          <input
            type="text"
            name="address_jibun"
            value={jibunAddress}
            onChange={handleInputChange}
            readOnly
            placeholder="지번 주소"
          />
        </div>
        <div className="input-container">
          <p>상세 주소</p>
          <input
            type="text"
            name="address_detail"
            value={formData.address_detail}
            onChange={handleInputChange}
            placeholder="상세 주소"
          />
        </div>

        <div className="input-container-inline">
          <p>가게전화번호</p>

          <input
            type="text"
            className="phone"
            name="business_phone1"
            value={formData.business_phone1}
            onChange={handleInputChange}
          />
          <span className="phone">-</span>
          <input
            type="text"
            className="phone"
            name="business_phone2"
            value={formData.business_phone2}
            onChange={handleInputChange}
          />
          <span className="phone">-</span>
          <input
            type="text"
            className="phone"
            name="business_phone3"
            value={formData.business_phone3}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-container">
          <p>인삿말</p>
          <div className="textarea-wrapper">
            <textarea
              id="greetingTextarea"
              name="business_comment"
              value={formData.business_comment}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="input-container">
          <p>예약 금액</p>
          <input
            type="text"
            name="business_no_show"
            value={formData.business_no_show}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <InformationModal
        isOpen={isModalOpen && actionType === "accept"}
        onClose={() => setModalOpen(false)}
        onConfirm={handleSave}
        registerInformation={formData}
        mainImage={imageFiles.main}
        priceImage={imageFiles.pricing}
        actionType={actionType}
      />
    </div>
  );
}

export default RegisterInformation;
