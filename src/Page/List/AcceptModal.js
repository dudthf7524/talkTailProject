import "../../CSS/acceptModal.css";
import React, { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Modal from "../../modal";
import { useDispatch } from "react-redux";
import { setAcceptTime } from "../../redux/reservationData";

const AcceptModal = ({ openModal, businessName }) => {
  const navigate = useNavigate();
  const [accept, setAccept] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const modalTitle = "예약오류";
  const modalContent = "동의 후 다음 단계로 진행이 가능합니다.";
  const dispatch = useDispatch();
  const handleItemClick = () => {
    navigate(`/designer/list`);
  };
  return (
    <>
      <div className="back" onClick={openModal}></div>
      <div className="acceptModal modal_container">
        {/* <div className="logo_box">
          <img src="/image/talkTail_logo.png" alt="" />
        </div> */}
        <p className="title">미용 동의 및 안내사항</p>
        <div className="content_container">
          <p>미용 동의서 및 유의사항</p>
          <p>동의 하기 전 알려드립니다!</p>
          <p className="sub_title">
            안녕하세요, 소중한 고객님! <br />
            반려견의 안전하고 건강한 미용을 위해
            <br /> 아래 내용을 확인해 주세요. 😊
          </p>
          <p className="content_title">미용 전 안내사항</p>
          <p className="text">
            ✔ 피부 반응: 짧은 기계 미용이 필요한 경우, 엉킴이 있던 부위에 자극이
            발생해 피부가 일시적으로 붉어질 수 있습니다.
            <br /> ✔ 긁거나 핥는 행동: 미용 후 가려움으로 인해 반려견이 긁거나
            핥을 수 있으며, 지속될 경우 상처나 진물이 발생할 수 있으므로 세심한
            관찰과 보호가 필요합니다. <br />✔ 항문 케어 후 반응: 항문 주변 털
            정리 및 항문낭 제거 후 반려견이 엉덩이를 바닥에 끌고 다니는 행동을
            할 수 있습니다. <br />✔ 일시적 스트레스 반응: 미용 후 일시적으로
            평소와 다른 행동(몸 떨림, 식욕 저하, 다리 절뚝거림, 불안감 등)이
            나타날 수 있습니다. 대부분 일주일 이내로 자연스럽게 해소됩니다.{" "}
            <br />✔ 건강 상태 고려: 반려견이 당일 컨디션이 좋지 않거나 구토,
            설사, 감기 증상이 있을 경우, 미용이 부담이 될 수 있습니다. 증상이
            완화된 후 미용을 진행하는 것이 좋습니다. <br />✔ 피부질환 발견
            가능성: 미용 후 그동안 털에 가려 보이지 않았던 피부 질환이 발견될
            수도 있습니다. <br />✔ 이중모(더블코트) 견종 안내: 클리퍼 미용 시
            ‘알로페시아 증후군’으로 인해 털이 다시 자라지 않을 가능성이
            있습니다. 이 점을 충분히 숙지하시고 미용 스타일을 결정해 주세요.
          </p>
          <p className="content_title">미용 동의 사항</p>
          <p className="text">
            ✔ 반려견의 건강 상태 및 특이사항을 미용사에게 충분히 전달하였으며,
            미용 과정에서 발생할 수 있는 사항을 이해하고 동의합니다.
            <br /> ✔ 반려견의 기저 질환이나 건강 상태를 특이사항으로 사전
            고지하지 않은 경우, 이에 따른 문제 발생 시 책임지지 않습니다. <br />
            ✔ 미용 중 예상치 못한 사고 발생 시 이에 대한 이의 제기를 하지 않음에
            동의합니다. <br />✔ 반려견의 미용 전·후 사진 및 영상을 당사의 홍보
            목적으로 사용할 수 있음에 동의합니다. <br />
            {businessName}에서는 보다 안전하고 만족스러운 미용을 위해 최선을
            다하겠습니다. 감사합니다! 💕
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
                  const acceptTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
                  dispatch(setAcceptTime(acceptTime));
                  handleItemClick();
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

export default AcceptModal;
