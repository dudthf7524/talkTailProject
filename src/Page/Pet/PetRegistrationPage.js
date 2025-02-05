import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../CSS/pet.css";
import "../../CSS/autoComplete.css";
import RadioButton from "./RadioButton";
import api from "../../Api";
import speciesData from "./PetList";

const PetRegistration = () => {
  // 새로추가한내용

  const [selectedSpecies, setSelectedSpecies] = useState("dog"); // 기본 선택: 개
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // 드롭다운 표시 여부
  const [searchQuery, setSearchQuery] = useState(""); // 검색 입력값
  const [selectedOption, setSelectedOption] = useState(""); // 선택된 옵션
  console.log("bbb");

  console.log(selectedSpecies);

  // 현재 선택된 종의 데이터 가져오기
  const currentSpeciesData = speciesData[selectedSpecies];
  const { topOptions, otherOptions } = currentSpeciesData;

  // 검색된 옵션 필터링
  // 검색된 옵션 필터링
  const filteredTopOptions = topOptions.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredOtherOptions = otherOptions.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    console.log(option);
    setIsDropdownVisible(false);
    setSearchQuery("");
  };

  const handleSpeciesChange = (e) => {
    setSelectedSpecies(e.target.value);
    setSelectedOption(""); // 종 변경 시 선택 초기화
    setSearchQuery(""); // 검색 초기화
  };

  // 새로추가한내용

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  console.log(errors)
  const nameRef = useRef(null);
  const birthDateRef = useRef(null);

  const validateForm = () => {
    let newErrors = {};
    const koreanRegex = /^[\uAC00-\uD7A3]+$/; // 한글 완성형 검사

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
      nameRef.current.focus();
      
    }
    if (!koreanRegex.test(formData.name)) {
      newErrors.name = "이름은 한글만 입력 가능합니다.";
      nameRef.current.focus();
      
    }
    if (!formData.birthDate.trim()) {
      newErrors.birthDate = "태어난 날을 입력해주세요.";
      birthDateRef.current.focus();
     
    }
    console.log(newErrors)
    // if (!selectedOption) {
    //   newErrors.breed = "품종을 선택해주세요.";
    // }
    // if (!formData.birthDate.trim()) {
    //   newErrors.birthDate = "태어난 날을 입력해주세요.";
    // }
    // if (!formData.weight.trim() || isNaN(formData.weight)) {
    //   newErrors.weight = "몸무게는 숫자로 입력해주세요.";
    // }
    // if (!formData.gender) {
    //   newErrors.gender = "성별을 선택해주세요.";
    // }
    // if (!formData.neuter) {
    //   newErrors.neuter = "중성화 여부를 선택해주세요.";
    // }

    setErrors(newErrors);

    // if (newErrors.name) {
    //   nameRef.current.focus();
    // } 
    // else if (newErrors.breed) {
    //   breedRef.current.focus();
    // } else if (newErrors.birthDate) {
    //   birthDateRef.current.focus();
    // } else if (newErrors.weight) {
    //   weightRef.current.focus();
    // } else if (newErrors.gender) {
    //   genderRef.current.focus();
    // } else if (newErrors.neuter) {
    //   neuterRef.current.focus();
    // }
    return Object.keys(newErrors).length === 0;
  };
  // 이미지 URL 및 상태 변수
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
  const defaultPetImgUrl = `${process.env.PUBLIC_URL}/PageImage/pet/pet_img_L.png`;
  const photoUrl = `${process.env.PUBLIC_URL}/PageImage/pet/photo.svg`;
  const [petImgUrl, setPetImgUrl] = useState(defaultPetImgUrl); // 이미지 URL 상태
  const [selectedImageFile, setSelectedImageFile] = useState(null); // 선택된 이미지 파일

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    speciesId: "",
    breed: "",
    breedId: "",
    birthDate: "",
    weight: "",
    gender: "",
    additionalInfo: "",
    etc: "",
    neuter: "",
  });

  formData.species = selectedSpecies;
  formData.breed = selectedOption;

  const [speciesDetails, setSpeciesDetails] = useState([]);

  const goBack = () => {
    navigate(-1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioSelect = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  // 이미지 업로드 처리
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPetImgUrl(reader.result); // 미리보기 이미지 설정
        setSelectedImageFile(file); // 이미지 파일 저장
      };
      reader.readAsDataURL(file);
    }
  };


  

 

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const petData = new FormData();
    petData.append("name", formData.name);
    petData.append("species", formData.species);
    petData.append("breed", formData.breed);
    petData.append("birthDate", formData.birthDate);
    petData.append("weight", formData.weight);
    petData.append("gender", formData.gender === "남자" ? 1 : 0);
    petData.append(
      "etc",
      formData.additionalInfo === "true" ? formData.etc : ""
    );
    petData.append("neuter", formData.neuter);
    console.log(petData);

    if (selectedImageFile) {
      petData.append("image", selectedImageFile); // 이미지 파일 추가
    }

    speciesDetails.forEach((detail, index) => {
      petData.append(`details[${index}][id]`, detail.optionId);
      petData.append(
        `details[${index}][value]`,
        formData[detail.option] === "true" ? 1 : 0
      );
    });

    // FormData 내용 확인
    for (let pair of petData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found.");
      }
      const response = await api.post("/api/pet/register", petData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // multipart/form-data 형식으로 전송
        },
      });
      console.log("Upload successful", response.data);
      navigate("/pet/list");
    } catch (error) {
      console.error("펫 정보 저장 에러: ", error);
    }
  };

  return (
    <div lang="ko">
      <div className="r-mid registration_total">
        <div className="navigation">
          <button>
            <img src={arrowButtonUrl} alt="" onClick={goBack} />
          </button>
          펫 등록
          <div></div>
        </div>
        <div className="re-mid">
          <div className="PetRegistration-container"></div>
          <div className="PetRegistration-container">
            <input
              type="text"
              className="textbox"
              placeholder="이름이 무엇인가요?"
              name="name"
              value={formData.name}
              ref={nameRef}
              onChange={handleInputChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}

          </div>
          <div className="PetRegistration-img-container">
            <div className="PetRegistration-content">
              <div className="upload-img">
                {/* 업로드된 이미지를 미리보기로 표시 */}
                <img src={petImgUrl} alt="" />
              </div>
              <div className="photo">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  id="imageUpload"
                />
                <label htmlFor="imageUpload">
                  <img src={photoUrl} alt="" style={{ cursor: "pointer" }} />
                </label>
              </div>
            </div>
          </div>
          <div className="PetRegistration-container2">
            <p>종류</p>

            <div
              style={{ position: "relative", zIndex: 1 }}
              className="PetRegistration-container"
            >
              <select
                className="textbox-gray"
                value={selectedSpecies}
                onChange={handleSpeciesChange}
              >
                <option value="dog">개</option>
                <option value="cat">고양이</option>
              </select>
            </div>
          </div>
          <div className="PetRegistration-container2">
            <p>품종</p>

            <div
              style={{ position: "relative", zIndex: 1 }}
              className="PetRegistration-container"
            >
              {/* 선택된 값 표시 */}
              <div
                className="textbox-gray"
                onClick={() => setIsDropdownVisible(!isDropdownVisible)}
              >
                {selectedOption || <div>품종을 선택해주세요</div>}
              </div>

              {/* 드롭다운 */}
              {isDropdownVisible && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 5,
                    width: "100%",
                    border: "1px solid #ccc",
                    backgroundColor: "#fff",
                    zIndex: 1,
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {/* 검색창 */}
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-box"
                  />
                  {/* 옵션 목록 */}
                  <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {/* TOP1 옵션 */}
                    {filteredTopOptions.length > 0 && (
                      <>
                        <li
                          style={{
                            fontWeight: "bold",
                            padding: "10px",
                            backgroundColor: "#f9f9f9",
                          }}
                        >
                          TOP5
                        </li>
                        {filteredTopOptions.map((option, index) => (
                          <li
                            key={`top-${index}`}
                            onClick={() => handleOptionSelect(option)}
                            style={{
                              padding: "10px",
                              cursor: "pointer",
                              borderBottom: "1px solid #f0f0f0",
                              backgroundColor:
                                selectedOption === option ? "#f0f8ff" : "#fff",
                            }}
                          >
                            {option}
                          </li>
                        ))}
                      </>
                    )}
                    {/* TOP1 옵션 */}
                    {filteredTopOptions.length > 0 && (
                      <>
                        <li
                          style={{
                            fontWeight: "bold",
                            padding: "10px",
                            backgroundColor: "#f9f9f9",
                          }}
                        >
                          온리 원 믹스견
                        </li>
                        {filteredTopOptions.map((option, index) => (
                          <li
                            key={`top-${index}`}
                            onClick={() => handleOptionSelect(option)}
                            style={{
                              padding: "10px",
                              cursor: "pointer",
                              borderBottom: "1px solid #f0f0f0",
                              backgroundColor:
                                selectedOption === option ? "#f0f8ff" : "#fff",
                            }}
                          >
                            {option}
                          </li>
                        ))}
                      </>
                    )}
                    {/* 일반 옵션 */}
                    {filteredOtherOptions.length > 0 && (
                      <>
                        <li
                          style={{
                            fontWeight: "bold",
                            padding: "10px",
                            backgroundColor: "#f9f9f9",
                          }}
                        >
                          일반 옵션
                        </li>
                        {filteredOtherOptions.map((option, index) => (
                          <li
                            key={`other-${index}`}
                            onClick={() => handleOptionSelect(option)}
                            style={{
                              padding: "10px",
                              cursor: "pointer",
                              borderBottom: "1px solid #f0f0f0",
                              backgroundColor:
                                selectedOption === option ? "#f0f8ff" : "#fff",
                            }}
                          >
                            {option}
                          </li>
                        ))}
                      </>
                    )}
                    {filteredTopOptions.length === 0 &&
                      filteredOtherOptions.length === 0 && (
                        <li
                          style={{
                            padding: "10px",
                            textAlign: "center",
                            color: "#999",
                          }}
                        >
                          검색 결과가 없습니다.
                        </li>
                      )}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="PetRegistration-container2">
            <p>태어난 날</p>
            <div className="PetRegistration-container">
              <input
                type="text"
                className="textbox-gray"
                placeholder="2025-01-31"
                name="birthDate"
                ref={birthDateRef}
                value={formData.birthDate}
                onChange={handleInputChange}
              />
               {errors.birthDate && <p className="error">{errors.birthDate}</p>}
            </div>
            {errors.birthDate && <p className="error">{errors.birthDate}</p>}
          </div>
          <div className="PetRegistration-container2">
            <p>몸무게</p>
            <div className="PetRegistration-container">
              <input
                type="text"
                className="textbox-gray"
                placeholder="0.0kg"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <div className="PetRegistration-container2">
              <p>성별</p>
              <RadioButton
                options={[
                  { label: "남자", value: "남자" },
                  { label: "여자", value: "여자" },
                ]}
                selectedOption={formData.gender}
                onSelect={(value) => handleRadioSelect("gender", value)}
              />
            </div>
            {speciesDetails.map((detail, index) => (
              <div key={index} className="PetRegistration-container2">
                <p>{detail.option}</p>
                <RadioButton
                  options={[
                    { label: detail.true, value: "true" },
                    { label: detail.false, value: "false" },
                  ]}
                  selectedOption={formData[detail.option]}
                  onSelect={(value) => handleRadioSelect(detail.option, value)}
                />
              </div>
            ))}
            <div className="PetRegistration-container2">
              <p>중성화 여부</p>
              <RadioButton
                options={[
                  { label: "O", value: "O" },
                  { label: "X", value: "X" },
                ]}
                selectedOption={formData.neuter}
                onSelect={(value) => handleRadioSelect("neuter", value)}
              />
            </div>
            {speciesDetails.map((detail, index) => (
              <div key={index} className="PetRegistration-container2">
                <p>{detail.option}</p>
                <RadioButton
                  options={[
                    { label: detail.true, value: "true" },
                    { label: detail.false, value: "false" },
                  ]}
                  selectedOption={formData[detail.option]}
                  onSelect={(value) => handleRadioSelect(detail.option, value)}
                />
              </div>
            ))}
            <div className="PetRegistration-container2 text_area">
              <p>기타 추가 사항</p>
              <textarea
                className="textbox-gray2"
                placeholder="예) 피부병, 심장질환, 마킹, 마운팅 등"
                name="etc"
                value={formData.etc}
                onChange={handleInputChange}
              />
              {/* <RadioButton
                options={[
                  { label: "있어요", value: "true" },
                  { label: "없어요", value: "false" },
                ]}
                selectedOption={formData.additionalInfo}
                onSelect={(value) => handleRadioSelect("additionalInfo", value)}
              /> */}
            </div>
          </div>
          <div
            className="Nbutton3"
            style={{ cursor: "pointer" }}
            onClick={handleSubmit}
          >
            등록하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetRegistration;
