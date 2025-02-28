import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PetInfo from "./PetInfo";
import { useDispatch, useSelector } from "react-redux";
import { setPetId } from "../../redux/reservationData";
import AcceptOldModal from "./AcceptOldModal";

const PetSelectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPet, setSelectedPet] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
  const dispatch = useDispatch();
  const designerName = useSelector((state) => state.reservationData); // Redux 상태 가져오기

  useEffect(() => {
    if (designerName.startTime == null) {
      navigate("/list/beauty");
      return;
    }
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    const petId = pet.pet_id;
    dispatch(setPetId(petId));
    setShowWarning(false); // 펫을 선택할 때 경고 메시지 숨김
  };

  const handleNext = (id) => {
    if (selectedPet) {
      navigate(`/reservation-request/${id}`, { state: { selectedPet } });
    } else {
      setShowWarning(true); // 선택된 펫이 없으면 경고 메시지 표시
      setTimeout(() => {
        setShowWarning(false);
      }, 1000); // 1초 후에 경고 메시지 숨김
    }
  };

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

  return (
    <div lang="ko" className="petSelectPage_total">
      <div className="navigation">
        <button onClick={goBack}>
          <img src={arrowButtonUrl} alt="뒤로가기" />
        </button>
        마이펫 리스트
        <div></div>
      </div>
      <PetInfo
        isSelectable={true}
        onSelectPet={handleSelectPet}
        fileName={"select"}
      />
      {showWarning && <p className="warning">펫을 선택해주세요.</p>}
      <div
        className="Nbutton"
        onClick={() => {
          if (!selectedPet) {
            setShowWarning(true);
            setTimeout(() => {
              setShowWarning(false);
            }, 1000);
            return;
          }

          const petAge = calculateAge(selectedPet.pet_birth);
          if (!selectedPet) {
            setShowWarning(true);
            setTimeout(() => {
              setShowWarning(false);
            }, 1000);
          } else if (petAge < 7) {
            handleNext(id);
          } else {
            setOpenModal(true);
          }
        }}
        style={{ cursor: "pointer" }}
      >
        다음 단계
      </div>
      {openModal ? (
        <AcceptOldModal
          openModal={() => {
            setOpenModal(false);
          }}
          id={id}
          selectedPet={selectedPet}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default PetSelectPage;
