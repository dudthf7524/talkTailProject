import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 임포트합니다.
import api from "../../Api";
import PetInfoModal from "./PetInfoModal";
import NButtonContainer from "../Components/NavigatorBar/NButtonContainer";

const PetListSection = ({ isSelectable, onSelectPet, fileName }) => {
  const male = `${process.env.PUBLIC_URL}/gender/male.png`;
  const female = `${process.env.PUBLIC_URL}/gender/female.png`;
  const deletePet = `${process.env.PUBLIC_URL}/delete/delete.png`;
  const petUrl = `${process.env.PUBLIC_URL}/images/pet/pet_img.png`;

  const [myPet, setMyPet] = useState([]);

  console.log(myPet);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 생성

  const [openModal, setOpenModal] = useState(false);
  const [petId, setPetId] = useState("");
  const [petImage, setPetImage] = useState("");

  useEffect(() => {
    const fetchPetSpecies = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found.");
        }
        const response = await api.get("/api/pet/my-pets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("내 펫 데이터:", response.data);
        setMyPet(response.data);
      } catch (error) {
        console.error("데이터 가져오기 에러:", error);
      }
    };
    fetchPetSpecies();
  }, []);

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  // const dogPets = myPet.filter(pet => pet.pet_species === 1);
  // const catPets = myPet.filter(pet => pet.pet_species === 2);

  const dogPets = myPet.filter((pet) => pet.pet_species === "강아지");
  const catPets = myPet.filter((pet) => pet.pet_species === "고양이");

  const [accordionState, setAccordionState] = useState({
    dog: false,
    cat: false,
  });

  const [selectedPetId, setSelectedPetId] = useState(null);

  const toggleAccordion = (type) => {
    setAccordionState((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  const handlePetSelect = (pet) => {
    if (isSelectable) {
      setSelectedPetId(pet.pet_id);
      onSelectPet(pet);
    } else {
      // 펫이 선택된 경우 해당 펫의 상세 페이지로 이동합니다.
      navigate(`/pet/detail/${pet.pet_id}`); // 해당 펫의 ID로 상세 페이지로 이동
    }
  };

  const petDeleteButton = async (id, image) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found.");
      }

      const encodedImage = encodeURIComponent(image);
      const response = await api.delete(
        `/api/pet/delete/${id}/${encodedImage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("petDelete successful", response.data);
      navigate(`/pet/list/`);
    } catch (error) {
      console.error("데이터 가져오기 에러:", error);
    }
  };

  return (
    <div className="pet-list-mid petList_total">
      <div className="event-accordion" onClick={() => toggleAccordion("dog")}>
        강아지
      </div>
      <div className="border"></div>

      <>
        <div className="pet-accordion-content">
          {dogPets.map((pet) => (
            <div
              className={`pet-contents ${selectedPetId === pet.pet_id ? "selected" : ""
                }`}
              onClick={() => {
                handlePetSelect(pet);
              }}
              key={pet.pet_id}
            >
              <div className="pet-contents-img">
                <img src={pet.petimage || petUrl} alt="" />
              </div>
              <div className="infoBox">
                <div
                  className="pet-contents-info"
                >
                  <p>

                    <h1>{pet.pet_name}<span style={{ fontSize: "20px" }}>({pet.pet_breed}){pet.pet_gender ? <img style={{ width: "6%" }} src={male}></img> : <img style={{ width: "8%" }} src={female}></img>}</span></h1>
                    <span></span>
                  </p>
                </div>
                <div className="pet-contents-info">
                </div>
                <div className="pet-contents-info">
                  <p>
                    나이 : {calculateAge(pet.pet_birth)}살<br></br>
                    몸무게 : {pet.pet_weight}kg<br></br>
                    중성화 여부  : {pet.pet_neuter}
                  </p>
                </div>
              </div>

              {fileName === "list" ? (
                <div className="pet-accordion-content deleteBtn"  onClick={(e) => {
                  setOpenModal(true);
                  setPetId(pet.pet_id);
                  setPetImage(pet.petimage);
                  e.stopPropagation();
                }}>
                  <img style={{ width: "30%", height: "30%" }} src={deletePet}></img>
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </>


      <div className="event-accordion" onClick={() => toggleAccordion("cat")}>
        고양이
      </div>
      <div className="border"></div>

      <div className="pet-accordion-content">
        {catPets.map((pet) => (
          <div
            className={`pet-contents ${selectedPetId === pet.pet_id ? "selected" : ""
              }`}
            key={pet.pet_id}
            onClick={() => handlePetSelect(pet)}
          >
            <div className="pet-contents-img">
              <img src={pet.image || petUrl} alt="" />
            </div>
            <div className="pet-contents-info">
              <p>{pet.pet_name}</p>
              <p>{`${pet.breedName}/${pet.pet_weight}kg/${pet.pet_gender ? "남" : "여"
                }/${calculateAge(pet.pet_birth)}살`}</p>
            </div>
          </div>
        ))}
      </div>
      {openModal ? (
        <PetInfoModal
          openModal={() => {
            setOpenModal(false);
          }}
          pet_id={petId}
          pet_image={petImage}
        />
      ) : (
        ""
      )}

    </div>
  );
};

export default PetListSection;
