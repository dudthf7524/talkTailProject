import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Checkbox from "./CheckboxGroup.js";
import "../../CSS/reservation.css";
import "../../CSS/notice.css";
import Payments from "./Payments";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import api from "../../Api";
import { setBusinessInfo } from "../../redux/reservationData.js";
import ReservationModal from "../Components/ReservationModal.js";
import Modal from "../../modal.js";

const ReservationRequestPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const modalTitle = "예약오류";
  const [modalContent, setModalContent] = useState("");
  const { selectedPet } = location.state || {};
  const [style, setStyle] = useState("");
  const [reviewText, setReviewText] = useState(""); // 리뷰 텍스트 상태 관리
  const textareaRef = useRef(null); // textarea 참조를 위한 ref
  const [lists, setLists] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // 예약 성공 모달 상태

  const reservationData = useSelector((state) => state.reservationData); // Redux 상태 가져오기

  useEffect(() => {
    if (
      !reservationData.businessInfo ||
      !reservationData.businessInfo.business_registration_number
    ) {
      // reservationData가 없으면 '/list/beauty' 페이지로 이동
      // navigate('/list/beauty');
    }
  }, [reservationData, navigate]);

  const handleStyle = (e) => {
    setStyle(e.target.value);
    adjustTextareaHeight(); // 텍스트가 변경될 때 높이 조정
  };

  const handleCautionsChange = (e) => {
    const { value } = e.target;
    setReviewText(value);
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData((prevState) => ({
      ...prevState,
      significantIssues: checked
        ? [...prevState.significantIssues, name]
        : prevState.significantIssues.filter((item) => item !== name),
    }));
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // 높이를 자동으로 설정
      textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이만큼 설정
    }
  };

  useEffect(() => {
    adjustTextareaHeight(); // 컴포넌트가 마운트될 때 초기 높이 조정
  }, [reviewText]);

  useEffect(() => {
    const aaa = async () => {
      if (reservationData.businessInfo.business_registration_number) {
        const styleSignificant = async () => {
          try {
            const response = await api.post(
              "/api/business/style/accountNumberGet",
              {
                business_registration_number:
                  reservationData.businessInfo.business_registration_number,
              }
            );
            setLists(response.data);
          } catch (error) {
            console.error("권한 조회 실패:", error.message);
          }
        };
        styleSignificant();
      } else {
        navigate("/list/beauty");
        return false;
      }
    };
    aaa();
  }, []);

  useEffect(() => {
    if (lists.business_owner_phone) {
      setFormData((prev) => ({
        ...prev,
        business_owner_phone: lists.business_owner_phone,
      }));
    }
  }, [lists]);

  const initialCheckboxes = [
    { label: "전체미용", name: "overall beauty" },
    { label: "부분미용", name: "partial beauty" },
    { label: "스포팅", name: "spotting" },
    { label: "가위컷", name: "scissors cut" },
    { label: "썸머컷", name: "summer cut" },
    { label: "주문사항", name: "order1" },
    { label: "주문사항", name: "order2" },
    { label: "주문사항", name: "order3" },
  ];

  const secondCheckboxes = [
    { label: "목욕", name: "bath" },
    { label: "위생", name: "hygiene" },
  ];

  const thirdCheckboxes = [
    {
      label: lists.business_beauty_significant1,
      name: lists.business_beauty_significant1,
    },
    {
      label: lists.business_beauty_significant2,
      name: lists.business_beauty_significant2,
    },
    {
      label: lists.business_beauty_significant3,
      name: lists.business_beauty_significant3,
    },
    {
      label: lists.business_beauty_significant4,
      name: lists.business_beauty_significant4,
    },
    {
      label: lists.business_beauty_significant5,
      name: lists.business_beauty_significant5,
    },
  ];

  const goBack = () => {
    navigate(-1);
  };

  const handleCheckboxChange3 = (name, checked) => {
    setFormData((prevState) => {
      const updatedIssues = checked
        ? [...prevState.significantIssues, name] // 체크되면 배열에 추가
        : prevState.significantIssues.filter((item) => item !== name); // 체크 해제되면 배열에서 제거

      return { ...prevState, significantIssues: updatedIssues };
    });
  };

  // 나이 계산 함수
  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    // 생일이 지나지 않았으면 나이에서 1살 뺌
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const openPaymentModal = () => {
    sendKakaoMessage("010-7751-4068", "메시지 보내기 성공");
    setShowPaymentModal(true);
  };
  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const confirmPayment = () => {
    setShowPaymentModal(false);
    navigate("/reservation-confirm");
  };
  const formatCurrency = (amount) => {
    if (amount === null) {
      return "0";
    }
    return amount.toLocaleString("ko-KR"); // 한국어 스타일로 포맷
  };

  const sendKakaoMessage = async (userPhoneNumber, messageTemplate) => {
    const apiUrl = "https://kakaoapi.example.com/v1/messages"; // 카카오 메시지 API 엔드포인트
    const apiToken = "44c334c2957d5bc80dab7c6deb6d1207"; // 카카오 Admin 키

    try {
      const response = await axios.post(
        apiUrl,
        {
          template_id: "TEMPLATE_ID", // 승인된 템플릿 ID
          recipient_number: userPhoneNumber, // 사용자 전화번호
          variables: {
            "#{username}": "홍길동",
            "#{message}": messageTemplate,
          },
        },
        {
          headers: {
            Authorization: `KakaoAK ${apiToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(
        "카카오톡 메시지 전송 실패:",
        error.response?.data || error.message
      );
    }
  };

  const [formData, setFormData] = useState({
    style: "",
    reviewText: "",
    significantIssues: [], // 체크된 특이사항을 저장
    depositAmount: reservationData.businessInfo.business_no_show || 0,
    business_registration_number:
      reservationData.businessInfo.business_registration_number || "",
    designerName: reservationData.designerName || "",
    petId: reservationData.petId || "",
    date: reservationData.date || "",
    startTime: reservationData.startTime || "",
    business_owner_phone: "",
    acceptTime: reservationData.acceptTime || "",
    acceptOldTime: reservationData.acceptOldTime || "",
  });
  const dispatch = useDispatch();

  const reservationSave = async () => {
    dispatch(
      setBusinessInfo({
        business_owner_phone: lists.business_owner_phone,
      })
    );
    const dataToSend = {
      beauty_style: style,
      beauty_caution: reviewText,
      beauty_significant: formData.significantIssues,
      depositAmount: formData.depositAmount,
      business_registration_number: formData.business_registration_number,
      business_desinger_id: formData.designerName || "",
      pet_id: formData.petId || "",
      date: formData.date || "",
      startTime: formData.startTime || "",
      business_owner_phone: formData.business_owner_phone || "",
      acceptTime: formData.acceptTime || "",
      acceptOldTime: formData.acceptOldTime || "",
    };

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      // 데이터베이스에 저장
      const reservationResponse = await api.post(
        "/api/beauty/reservation",
        JSON.stringify(dataToSend),
        { headers }
      );

      if (
        reservationResponse.data === "success" &&
        reservationResponse.status === 201
      ) {
        // 예약 성공 모달 띄우기
        setShowSuccessModal(true);

        // 3초 후 페이지 이동
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate("/reservation");
        }, 3000);
      }
    } catch (error) {
      console.error("Reservation failed:", error);
      // TODO: 예약 저장 실패 시 사용자 알림 추가
    }
  };
  return (
    <div lang="ko" className="reservationRequest_total">
      <div className="navigation">
        <button onClick={goBack}>
          <img
            src={`${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`}
            alt="뒤로가기"
          />
        </button>
        예약신청서
        <div></div>
      </div>
      <div className="reservation-mid">
        <div className="reservation-head">
          {reservationData?.businessInfo.business_name}
        </div>
        <div className="view-pet">
          {selectedPet.pet_name}
          <p>
            {selectedPet.pet_breed}/{selectedPet.pet_weight}kg/
            {selectedPet.pet_gender ? "남" : "여"}/
            {calculateAge(selectedPet.pet_birth)}살 중성화{" "}
            {selectedPet.pet_neuter}
          </p>
        </div>
        <div className="blank"></div>
        <div className="reservation-contents">
          <div className="h1Box">
            <h1>스타일</h1>
            <p>(필수)</p>
          </div>
          {/* <h1>스타일(필수)</h1> */}
          <div className="reservation-contents-text">
            <textarea
              ref={textareaRef}
              value={style}
              className="cautions-textarea"
              placeholder="스타일을 입력해 주세요..."
              onChange={handleStyle}
            />
          </div>
        </div>
        <div className="reservation-contents check">
          <h1>특이사항</h1>
          <Checkbox
            checkboxes={thirdCheckboxes}
            checkboxState={formData.significantIssues}
            onChange={handleCheckboxChange3}
            className="checkBox"
          />
        </div>
        {/* <Checkbox
          groupName="특이사항"
          checkboxes={thirdCheckboxes}
          checkboxState={formData.significantIssues}
          onChange={handleCheckboxChange3}
          className="checkBox"
        /> */}
        <div className="reservation-contents">
          <h1>기타사항</h1>
          <div className="reservation-contents-text">
            <textarea
              ref={textareaRef}
              value={reviewText}
              className="cautions-textarea"
              placeholder="ex) 물을 무서워 해요. 발톱도 정리 부탁드려요..."
              onChange={handleCautionsChange}
            />
          </div>
        </div>
        <div className="reservation-contents">
          {/* <div className="payment">
            <table style={{ textAlign: "left" }}>
              <tr>
                <td>계좌이체정보</td>
                <td>&nbsp;</td>
                <td width={50}>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <th>{lists.name}KB국민은행</th>
                <th>{lists.account_number}123-456-78954</th>
                <th>&nbsp;</th>
                <th>예금주</th>
                <th>{lists.account_holder}홍길동</th>
              </tr>
            </table>
          </div> */}
          <div className="payment account">
            <p className="title">계좌이체정보</p>
            <div className="content">
              <p>
                {lists.name
                  ? lists.name
                  : "가게에서 계좌를 등록하지 않았습니다."}
              </p>
              <p>{lists.account_number}</p>
              <p>{lists.name ? "예금주" : ""}</p>
              <p>{lists.account_holder}</p>
            </div>
          </div>
        </div>
        <div className="reservation-contents notice">
          <h1 style={{ textAlign: "left" }}>
            예약 확정을 위해 예약금을 이체해 주세요.
            <br /> 미입금 시 자동 취소될 수 있으며,
            <br /> 예약금은 최종 금액에서 차감됩니다.
            <br /> 미용 당일에는 잔액만 결제하시면 됩니다.
          </h1>
        </div>
        <div className="payment-container">
          <div className="payment">
            <h2>예약금</h2>
            <div className="row">
              <h1>
                {formatCurrency(reservationData.businessInfo.business_no_show)}{" "}
                원
              </h1>
            </div>
          </div>
        </div>
      </div>

      {reservationData.businessInfo.business_no_show ? (
        // <div className="Nbutton" onClick={openPaymentModal}>
        //   예약하기
        // </div>
        <div
          className="Nbutton"
          onClick={() => {
            if (!style) {
              setModalContent("스타일을 입력해주세요.");
              setOpenModal(true);
            } else {
              reservationSave();
            }
          }}
          style={{ cursor: "pointer" }}
        >
          예약하기
        </div>
      ) : (
        <div
          className="Nbutton"
          onClick={() => {
            if (!style) {
              setModalContent("스타일을 입력해주세요.");
              setOpenModal(true);
            } else {
              reservationSave();
            }
          }}
          style={{ cursor: "pointer" }}
        >
          예약하기
        </div>
      )}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>예약 접수가 완료되었습니다!</h2>
            <p>잠시 후 예약 페이지로 이동합니다.</p>
          </div>
        </div>
      )}
      {showPaymentModal && (
        <Payments
          closePaymentModal={closePaymentModal}
          confirmPayment={confirmPayment}
        />
      )}
      <ReservationModal isOpen={showSuccessModal} />
      {openModal ? (
        <Modal
          openModal={() => {
            setOpenModal(false);
          }}
          title={modalTitle}
          content={modalContent}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ReservationRequestPage;
