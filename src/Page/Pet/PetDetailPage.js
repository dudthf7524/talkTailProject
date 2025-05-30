import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RadioButton from "./RadioButton";
import api from "../../Api";
import PetEditPage from "./PetEditPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchPetData } from "../../redux/petSlice";

const PetDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 펫 ID 가져오기
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
  const defaultPetImgUrl = `${process.env.PUBLIC_URL}/PageImage/pet/pet_img_L.png`;
  const noteUrl = `${process.env.PUBLIC_URL}/PageImage/list/note_ic.svg`;
  const photoUrl = `${process.env.PUBLIC_URL}/PageImage/pet/photo.svg`;
  const male = `${process.env.PUBLIC_URL}/gender/male.png`;
  const female = `${process.env.PUBLIC_URL}/gender/female.png`;

  const dispatch = useDispatch();

  const { petData, loading, error } = useSelector((state) => state.pets);

  useEffect(() => {
    dispatch(fetchPetData(id));
  }, [dispatch, id]);

  const [formData, setFormData] = useState({
    // 초기값 설정
  });
  useEffect(() => {
    if (petData) {
      setFormData({
        gender: petData.pet_gender ? "남자" : "여자",
      });
    }
  }, [petData]);

  const goBack = () => {
    navigate("/pet/list");
  };

  const handleEdit = () => {
    navigate(`/pet-edit/${id}`);
  };

  if (!petData) {
    return <div>Loading...</div>;
  }

  return (
    <div lang="ko">
      <div className="r-mid">
        <div className="navigation">
          <button onClick={goBack}>
            <img src={arrowButtonUrl} alt="뒤로가기" />
          </button>
          마이펫 정보
          <div>
            <button style={{ color: "#f0663f" }} onClick={handleEdit}>
              수정
            </button>
          </div>
        </div>
        <div className="re-mid">
          <div className="PetRegistration-img-container">
            <div className="PetRegistration-content">
              <div className="upload-img">
                <img
                  src={petData.petimage || defaultPetImgUrl}
                  alt="펫 이미지"
                />
              </div>
              <div className="photo">
                <label htmlFor="imageUpload">
                  <img src={photoUrl} alt="" style={{ cursor: "pointer" }} />
                </label>
              </div>
            </div>
          </div>
          <div className="PetRegistration-container">
            <input
              type="text"
              className="textbox"
              value={petData.pet_name || ""}
              readOnly
            />
          </div>
          <div className="PetRegistration-container2">
            <p>종</p>
            <div className="PetRegistration-container">
              <input
                type="text"
                className="textbox-gray"
                value={petData.pet_species || ""}
                readOnly
              />
            </div>
          </div>
          <div className="PetRegistration-container2">
            <p>품종</p>
            <div className="PetRegistration-container">
              <input
                type="text"
                className="textbox-gray"
                value={petData.pet_breed || ""}
                readOnly
              />
            </div>
          </div>
          <div className="PetRegistration-container2">
            <p>태어난 날</p>
            <div className="PetRegistration-container">
              <input
                type="text"
                className="textbox-gray"
                value={petData.pet_birth || ""}
                readOnly
              />
            </div>
          </div>
          <div className="PetRegistration-container2">
            <p>몸무게</p>
            <div className="PetRegistration-container">
              <input
                type="text"
                className="textbox-gray"
                value={petData.pet_weight || ""}
                readOnly
              />
            </div>
          </div>
          <div className="PetRegistration-container2">
            <p>성별은</p>
            <RadioButton
              options={[
                {
                  label: <img style={{ width: "17%" }} src={male}></img>,
                  value: "남자",
                },
                {
                  label: <img style={{ width: "17%" }} src={female}></img>,
                  value: "여자",
                },
              ]}
              selectedOption={formData.gender}
              onSelect={() => {}} // 선택 불가능하도록 콜백 제거
              disabled // 비활성화하여 선택된 값 고정\
              netur={""}
            />
          </div>
          <div className="PetRegistration-container2">
            <p>중성화 여부</p>
            <RadioButton
              options={[
                { label: "O", value: "O" },
                { label: "X", value: "X" },
                { label: "모름", value: "모름" },
              ]}
              selectedOption={petData.pet_neuter}
              onSelect={() => {}} // 선택 불가능하도록 콜백 제거
              disabled // 비활성화하여 선택된 값 고정
              netur={"netur-"}
            />
          </div>

          <div className="PetRegistration-container2">
            <p>기타 추가 사항</p>
            <input
              type="text"
              className="textbox-gray2"
              value={petData.pet_etc || "없음"}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PetDetail;
