import "../../CSS/acceptModal.css";
import React, { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Modal from "../../modal.js";
import { setAcceptOldTime } from "../../redux/reservationData";
import { useDispatch } from "react-redux";

const AcceptOldModal = ({ openModal, id, selectedPet }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accept, setAccept] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const modalTitle = "예약오류";
  const modalContent = "동의 후 다음 단계로 진행이 가능합니다.";
  return (
    <>
      <div className="back" onClick={openModal}></div>
      <div className="acceptModal modal_container acceptOldModal">
        <div className="logo_box">
          <img src="/image/talkTail_logo.png" alt="" />
        </div>
        <p className="title">노령 이용 동의서</p>
        <div className="content_container">
          <p></p>
          <p></p>
          <p>
            노령견의 경우 노환이나 각종 질병으로 미용 후 지병의 약화나
            스트레스로 원치 않는 상황이 발생할 수 있음을 미리 알려드립니다.
            <br />
            <br /> 미용 중에 갑작스런 컨디션의 변화나 증상에 따라 미용이
            곤란하다고 판단 될 때에는 미용을 중단하고 데리러 오셔야 할 수도
            있습니다.
            <br />
            <br /> 미용 중에 치료 및 응급처지 및 치료를 우선적으로 실시하고
            추후에 연락 드립니다.
            <br />
            <br />
            또한 그때의 치료비는 보호자 분꼐서 부담하는 것을 동의합니다.
            <br />
            <br /> 저희 말꼬리에서는 최대한 배려하는 마음으로 미용 할 것을 약속
            드리 지만 이로 인해 발생하는 모든 상황에 대해서 보호자분은 말꼬리
            미용실에 책임을 묻지 않을 것임을 약속 받고 미용하는 것에 동의합니다.
          </p>
          <p>
            미용사에게 반려견의 모든 특이사항을 전달하였으며 모든 안내사항을
            확인하고 동의합니다.
          </p>
          <div className="accept_box">
            {accept ? (
              <div
                className="circle_btn_full"
                onClick={() => {
                  setAccept(!accept);
                }}
              ></div>
            ) : (
              <div
                className="circle_btn"
                onClick={() => {
                  setAccept(!accept);
                }}
              ></div>
            )}
            <p>동의합니다.</p>
          </div>
          <div className="btn_box">
            <div className="btn" onClick={openModal}>
              취소
            </div>
            <div
              className="btn"
              onClick={() => {
                if (accept) {
                  const acceptOldTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
                  console.log("accpetOldTime : ", acceptOldTime);
                  dispatch(
                    setAcceptOldTime(acceptOldTime)
                  )
                  navigate(`/reservation-request/${id}`, {
                    state: { selectedPet },
                  });
                  // handleItemClick();
                } else {
                  setOpenAlertModal(true);
                }
              }}
            >
              확인
            </div>
          </div>
        </div>
        {openAlertModal ? (
          <Modal
            openModal={() => {
              setOpenAlertModal(false);
            }}
            title={modalTitle}
            content={modalContent}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default AcceptOldModal;
