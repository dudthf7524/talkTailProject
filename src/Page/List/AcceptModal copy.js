import "../../CSS/acceptModal.css";
import React, { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Modal from "../../modal";
import { useDispatch } from "react-redux";
import { setAcceptTime } from "../../redux/reservationData";

const AcceptModal = ({ openModal }) => {
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
            안녕하세요, 소중한 고객님! 00이(반려견)의 안전하고 건강한 미용을
            위해 아래 내용을 확인해 주세요. 😊
          </p>
          <p className="content_title"></p>
          <p>
            짧은 기계 미용과 같은
            <span>
              &nbsp;엉킴이 있을 시 미용 후 자극에 의해 피부가 붉어질 수
              있습니다.
            </span>
            <br />
            <br /> 미용 후 상태변화로 인해 <span>긁거나 햝을 수 있으며,</span>
            &nbsp;지속될 시 상처나 진물이 생길 수 있으므로 관찰, 지도해 주시기
            바랍니다.
            <br />
            <br /> 항문 주위의 털 정리와 항문낭 제거로
            <span>&nbsp;엉덩이를 끌고 다닐 수 있습니다.</span>
            <br />
            <br /> 일시적인 미용 스트레스로 인해 미용 전 없었던 행동
            <span>
              (몸을 떨 수도 있고, 식사를 하지 않는 경우, 다리를 절인다, 불안감
              등)
            </span>
            을 보일 수 있으나 <span>대부분 일시적인 경우</span>이며 일주일안으로
            점차 사라지게 됩니다.)
            <br />
            <br /> 당일 반려견의 상태가 좋지 않거나 구토, 설사, 감기 증상이 있을
            경우 미용 후에 증상이 더 심해질 수 있으므로 미용을 미루시는 것이
            좋습니다. 평소에 털이 가려져 보이지 않았던
            <span>&nbsp;피부병이 발견 될 수 있습니다.</span>
            <br />
            <br />
            <span>
              이중모 견종은 클리퍼로 몸을 미용했을 시 알로페시아 증후근이 올 수
              있으며&nbsp;
            </span>
            그로 인해 털이 나지 않을 수 있습니다. 이를 숙지하시고 아이들의
            미용스타일을 결정해 주시기 바랍니다.
            <br />
            <br /> 반려견의 질병에 대해 사전을 고지하지 않는 경우 그 질병에 대해
            책임 지지 않습니다.
            <br />
            <br />
            반려견 미용시 발생할 수 있는 사고를 미용요청 견주님은 모두
            인지하였으며, 이와 관련하여 발생하는 사고에 대해 추후 이의 제기를
            하지 않음에 동의합니다.
            <br />
            <br /> 반려견의 미용 전 후 사진이나 영상을 당사의 홍보 목적으로 사용
            할 수 있습니다.
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
