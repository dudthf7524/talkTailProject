import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import api from "../../Api";
import UserEditModal from "../Components/UserEditModal";
import UserEditOpenModal from "./UserEditOpenModal";
import Modal from "../../modal";

function UserEdit() {
  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const keyButtonUrl = `${process.env.PUBLIC_URL}/images/icon/keyboard_return.svg`;
  const [userInformation, setUserInformation] = useState();
  const [userInforMationData, setUserInforMationData] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertContent, setAlertContent] = useState("");
  useEffect(() => {
    fetchUserInformation();
  }, []);

  const fetchUserInformation = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found.");
      }

      const response = await api.get("/api/user/information", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data.user);
      setUserInformation(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // 오류 처리 로직 추가
    }
  };
  if (userInformation) {
    console.log(userInformation.user_name);
  }

  const [formData, setFormData] = useState({
    user_name: "",
    user_phone1: "",
    user_phone2: "",
    user_phone3: "",
  });

  useEffect(() => {
    if (userInformation) {
      const [phone1, phone2, phone3] = userInformation.user_phone.split("-");
      setFormData({
        user_name: userInformation.user_name,
        user_phone1: phone1,
        user_phone2: phone2,
        user_phone3: phone3,
      });
    }
  }, [userInformation]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // console.log(formData);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    }
  };

  const handleEdit = async () => {
    // console.log("UserEidt 속 : ", userInformation.user_information_id);
    // console.log("UserEidt 속 : ", formData);

    // user.id를 formData에 추가
    const userInforMationData = {
      ...formData,
      user_information_id: userInformation.user_information_id, // user.id를 formData에 추가
    };
    // console.log("userInforMationData : ", userInforMationData);
    setUserInforMationData(userInforMationData);
    try {
      // 서버로 FormData를 전송
      // const response = await api.put("/api/user/edit", userInforMationData, {});
      // console.log("Upload successful:", response.data);
      // 성공적으로 업로드된 후 페이지를 이동하거나 추가 작업 수행
      // navigate("/user/edit"); // 성공 페이지로 이동
    } catch (error) {
      console.error("Error during upload:", error);
      // 오류 처리
    }
  };
  const [showPopup, setShowPopup] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");

  const handleConfirmEdit = () => {
    handleEdit();
    setPopupMessage("내 정보 수정완료");
    // setShowPopup(true);
    // setTimeout(() => {
    //   setShowPopup(false);

    //   window.location.href = "/user/edit";
    // }, 3000);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
    if (popupMessage === "You have been logged out.") {
      navigate("/"); // 로그아웃 후 홈 페이지로 이동
    }
  };
  const checkForm = () => {
    const userInforMationData = {
      ...formData,
      user_information_id: userInformation.user_information_id, // user.id를 formData에 추가
    };
    // console.log("userInforMationData : ", userInforMationData);
    setUserInforMationData(userInforMationData);
    setAlertTitle("입력을 확인하세요.");
    if (!formData.user_name) {
      setAlertContent("이름을 입력해주세요.");
      setOpenAlert(true);
    } else if (
      !formData.user_phone1 ||
      !formData.user_phone2 ||
      !formData.user_phone3
    ) {
      setAlertContent("전화번호를 입력해주세요.");
      setOpenAlert(true);
    } else {
      setOpenModal(true);
    }
  };
  return (
    <div className="user_edit_total" lang="ko">
      <div className="navigation">
        <button>
          <img src={arrowButtonUrl} alt="" onClick={() => navigate(-1)} />
        </button>
        내 정보 수정
        <div
          // onClick={handleConfirmEdit}
          onClick={checkForm}
          style={{ cursor: "pointer" }}
        >
          수정
        </div>
      </div>
      <div className="main-mid">
        <div className="input-container">
          <p>이름</p>
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="톡테일"
          />
        </div>
        <div className="input-container">
          <p>전화번호</p>
          <div className="input_box">
            <input
              type="text"
              name="user_phone1"
              value={formData.user_phone1}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="010"
            />
            -
            <input
              type="text"
              name="user_phone2"
              value={formData.user_phone2}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="1234"
            />
            -
            <input
              type="text"
              name="user_phone3"
              value={formData.user_phone3}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="5678"
            />
          </div>
        </div>
      </div>

      {showPopup && (
        <UserEditModal
          closeModal={handleClosePopup}
          isWarning={popupMessage.includes("Failed")}
          children={popupMessage}
        ></UserEditModal>
      )}
      {openModal ? (
        <UserEditOpenModal
          openModal={() => {
            setOpenModal(false);
          }}
          userInforMationData={userInforMationData}
          popupMessage={popupMessage}
        />
      ) : (
        ""
      )}
      {openAlert ? (
        <Modal
          openModal={() => {
            setOpenAlert(false);
          }}
          title={alertTitle}
          content={alertContent}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default UserEdit;
