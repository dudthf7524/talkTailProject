import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../CSS/pet.css";
import "../../CSS/autoComplete.css";
import RadioButton from "./RadioButton";
import api from "../../Api";
import speciesData from "./PetList";
import { useDispatch, useSelector } from "react-redux";
import { fetchPetData } from "../../redux/petSlice";

const PetEditPage = () => {
  const dispatch = useDispatch();

  const { petData, loading, error } = useSelector((state) => state.pets);

  // 새로추가한내용
  const { id } = useParams(); // URL에서 펫 ID 가져오기
  const [selectedSpecies, setSelectedSpecies] = useState("dog"); // 기본 선택: 개
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // 드롭다운 표시 여부
  const [searchQuery, setSearchQuery] = useState(""); // 검색 입력값
  const [selectedOption, setSelectedOption] = useState(""); // 선택된 옵션

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    birthDate: "",
    weight: "",
    gender: "", // or you can use '남자' as default
    etc: "",
    neuter: "",
  });
  useEffect(() => {
    dispatch(fetchPetData(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (petData) {
      console.log(petData);
      setFormData({
        name: petData.pet_name || "",
        species: petData.pet_species || "",
        breed: petData.pet_breed || "",
        birthDate: petData.pet_birth || "",
        weight: petData.pet_weight || "",
        gender: petData.pet_gender ? "남자" : "여자",
        etc: petData.pet_etc || "",
        neuter: petData.pet_neuter || "",
        image: petData.petimage || "",
      });
      console.log(petData);
      console.log(petData.pet_breed);
      console.log(petData.petimage);
      setPetImgUrl(petData.petimage || defaultPetImgUrl); // 기존 이미지 URL 설정
      setSelectedSpecies(petData.pet_species);
      setSelectedOption(petData.pet_breed); // breed 값 반영
    }
  }, [petData]);

  console.log(formData.breed);
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

  const handleSpeciesChange = (e) => {
    setSelectedSpecies(e.target.value);
    setSelectedOption(""); // 종 변경 시 선택 초기화
    setSearchQuery(""); // 검색 초기화
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option); // selectedOption 업데이트

    setIsDropdownVisible(false);
    setSearchQuery(""); // 검색어 초기화
  };

  // 새로추가한내용

  const navigate = useNavigate();

  // 이미지 URL 및 상태 변수
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
  const defaultPetImgUrl = `${process.env.PUBLIC_URL}/PageImage/pet/pet_img_L.png`;
  const photoUrl = `${process.env.PUBLIC_URL}/PageImage/pet/photo.svg`;
  const [petImgUrl, setPetImgUrl] = useState(defaultPetImgUrl); // 이미지 URL 상태
  const [selectedImageFile, setSelectedImageFile] = useState(null); // 선택된 이미지 파일
  console.log("searchQuery");
  console.log(searchQuery);
  formData.species = selectedSpecies;
  formData.breed = selectedOption;

  // searchQuery = formData.breed;
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

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [neuter, setNeuter] = useState('');
  const [etc, setEtc] = useState('');


  const nameRef = useRef(null);
  const imageRef = useRef(null);
  const breedRef = useRef(null);
  const birthDateRef = useRef(null);
  const weightRef = useRef(null);
  const genderRef = useRef(null);
  const neuterRef = useRef(null);
  const etcRef = useRef(null);

  const validateForm = () => {
    const koreanRegex = /^[\uAC00-\uD7A3]+$/; // 한글 완성형 검사
    const koreanEnglishNumberMaxFiveCharRegex = /^[\uAC00-\uD7A3a-zA-Z0-9]{1,5}$/;
    const dateRegex = /^(19[0-9]{2}|20[0-9]{2})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    const weightRegex = /^\d+(\.\d{1})?$/;
    const etcRegex = /^[\uAC00-\uD7A3]{1,20}$/

    console.log(formData.name)
    console.log(formData.breed)
    console.log(formData.species)
    console.log(formData.image)
    console.log('선택된 이미지')
    console.log(selectedImageFile)
    console.log('선택된 이미지')


    setName('');
    setImage('');
    setBirthDate('');
    setBreed('');
    setWeight('');
    setGender('');
    setNeuter('');
    setEtc('');
    console.log('aaaaaa')
    if (!formData.name.trim()) {
      console.log('a')
      setName('이름을 입력해주세요.');
      nameRef.current.focus();
     
      return;
    }
    if (!koreanEnglishNumberMaxFiveCharRegex.test(formData.name)) {
      console.log('a')
      setName('이름은 한글, 영문, 숫자 조합 5글자 이하만 입력 가능합니다.');
      nameRef.current.focus();
      return;
    }
    if (!formData.breed.trim()) {
      console.log('a')
      setBreed('품종을 선택해주세요');
      breedRef.current.focus();
      return;
    }
    if (!formData.birthDate.trim()) {
      console.log('a')
      setBirthDate('태어난 날을 입력해주세요');
      birthDateRef.current.focus();
      return;
    }
    if (!dateRegex.test(formData.birthDate)) {
      console.log('a')
      setBirthDate('태어난 날을 2000-01-01 형식으로 입력해주세요');
      birthDateRef.current.focus();
      return;
    }
    if (typeof formData.weight === 'number') {
      console.log('a')
      formData.weight = formData.weight.toString(); // 숫자를 문자열로 변환
    }
    if (!formData.weight.trim()) {
      console.log('a')
      setWeight('몸무게를 입력해주세요');
      weightRef.current.focus();
      return;
    }
    if (!weightRegex.test(formData.weight)) {
      console.log('a')
      setWeight('몸무게를 정확히 입력해주세요(소수점 첫 번째 자리)');
      weightRef.current.focus();
      return;
    }
    if (!formData.gender.trim()) {
      console.log('a')
      setGender('성별을 선택해주세요');
      genderRef.current.focus();
      return;
    }
    if (!formData.neuter.trim()) {
      console.log('a')
      setNeuter('중성화 여부를 선택해주세요');
      neuterRef.current.focus();
      return;
    }
    if (!formData.etc.trim()) {
      console.log('a')
      setEtc('기타 추가 사항을 입력해주세요');
      etcRef.current.focus();
      return;
    }
    if (!etcRegex.test(formData.etc)) {
      console.log('a')
      setEtc('한글만 20자 이내 입력해주세요');
      etcRef.current.focus();
      return;
    }
    return true;
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

  const handleUpdate = async () => {
    if (!validateForm()) return;

    console.log("==================================");
    console.log(formData.breed);
    console.log("==================================");
    const petUpdateData = new FormData();
    petUpdateData.append("name", formData.name);
    petUpdateData.append("species", selectedSpecies);
    petUpdateData.append("breed", formData.breed);
    petUpdateData.append("birthDate", formData.birthDate);
    petUpdateData.append("weight", formData.weight);
    petUpdateData.append("gender", formData.gender === "남자" ? 1 : 0);
    petUpdateData.append("etc", formData.etc);
    petUpdateData.append("neuter", formData.neuter);
    petUpdateData.append("image", formData.image);

    console.log("petUpdateData");
    console.log(petUpdateData);

    if (selectedImageFile) {
      petUpdateData.append("image", selectedImageFile); // 이미지 파일 추가
    }

    speciesDetails.forEach((detail, index) => {
      petUpdateData.append(`details[${index}][id]`, detail.optionId);
      petUpdateData.append(
        `details[${index}][value]`,
        formData[detail.option] === "true" ? 1 : 0
      );
    });

    // FormData 내용 확인
    for (let pair of petUpdateData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found.");
      }
      const response = await api.post(`/api/pet/edit/${id}`, petUpdateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // multipart/form-data 형식으로 전송
        },
      });
      console.log("Upload successful", response.data);
      navigate(`/pet/detail/${id}`);
    } catch (error) {
      console.error("펫 정보 저장 에러: ", error);
    }
  };

  return (
    <div lang="ko">
      <div className="r-mid">
        <div className="navigation">
          <button>
            <img src={arrowButtonUrl} alt="" onClick={goBack} />
          </button>
          펫 수정
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
            {name && <div className="pet-registration-page-error-box">{name}</div>}
          </div>
          <div className="PetRegistration-img-container" ref={imageRef} tabIndex={0}>
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
            {image && <div className="pet-registration-page-error-box">{image}</div>}
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
                {selectedOption || searchQuery}
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
                          TOP
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
                placeholder="YY/MM/DD"
                name="birthDate"
                ref={birthDateRef}
                value={formData.birthDate}
                onChange={handleInputChange}
              />
              {birthDate && <div className="pet-registration-page-error-box">{birthDate}</div>}
            </div>
          </div>
          <div className="PetRegistration-container2">
            <p>몸무게</p>
            <div className="PetRegistration-container">
              <input
                type="text"
                className="textbox-gray"
                placeholder="0.0kg"
                name="weight"
                ref={weightRef}
                value={formData.weight}
                onChange={handleInputChange}
              />
              {weight && <div className="pet-registration-page-error-box">{weight}</div>}
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
            {/* <div className='PetRegistration-container2'>
                            <p>기타 추가 사항이</p>
                            <RadioButton
                                options={[
                                    { label: '있어요', value: 'true' },
                                    { label: '없어요', value: 'false' }
                                ]}
                                selectedOption={formData.additionalInfo}
                                onSelect={(value) => handleRadioSelect('additionalInfo', value)}
                            />
                        </div> */}
            <div className="PetRegistration-container2">
              <p>기타 추가 사항</p>
              <input
                type="text"
                className="textbox-gray2"
                placeholder="예) 피부병,심장질환,마킹,마운팅 등"
                name="etc"
                ref={etcRef}
                value={formData.etc}
                onChange={handleInputChange}
              />
              {etc && <div className="pet-registration-page-error-box">{etc}</div>}

            </div>
          </div>
          <div
            className="Nbutton3"
            style={{ cursor: "pointer" }}
            onClick={handleUpdate}
          >
            수정하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetEditPage;
