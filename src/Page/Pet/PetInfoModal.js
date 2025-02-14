import "../../CSS/petInfoModal.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api";
const PetInfoModal = ({ openModal, pet_id, pet_image }) => {
  const navigate = useNavigate();
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
      window.location.href = "/pet/list/";
    } catch (error) {
      console.error("데이터 가져오기 에러:", error);
    }
  };
  return (
    <div className="petInfo_modal">
      <img onClick={openModal} src="/PageImage/components/X.svg" alt="" />
      <p className="delete_text">지우겠습니까?</p>
      <div className="btn_box">
        <p onClick={openModal}>아니오</p>
        <p
          onClick={() => {
            petDeleteButton(pet_id, pet_image);
          }}
        >
          예
        </p>
      </div>
    </div>
  );
};

export default PetInfoModal;
