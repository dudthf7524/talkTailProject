import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../../CSS/noticeBusiness.css";
import "../../../CSS/noticeModal.css";
import NoticeSendModal from "../../Modal/NoticeSend";
import api from "../../../Api";
import { flatMap } from "lodash";

const WriteNotice = () => {
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const location = useLocation();
  const { id } = location.state || {}; // state가 없는 경우 대비
  const [formData, setFormData] = useState({
    notice_style: "",
    notice_etc: "",
    notice_pet_weight: "",
    notice_hairTangling: ""
  });
  const [selectedOptions, setSelectedOptions] = useState({
    notice_analSac: "",
    notice_hairTangling_tf: null,
  });

  console.log(selectedOptions)

  const notice_skin_option = ["좋음", "건조", "민감", "붉음", "탈모", "딱지", "종기", "각질"]
  const notice_ear_option = ["깨끗함", "노란귀지", "갈색귀지", "귓턻많음"]
  const notice_eye_option = ["깨끗함", "눈꼽", "충혈"]
  const notice_sole_option = ["좋음", "습진", "건조"]
  const notice_claw_option = ["적당함", "짧음", "관리필요"]
  const notice_analSac_option = ["많음", "적당", "안나옴"]
  const notice_hairTangling_option = ["유", "무"]

  const [selectedMultipleOptions, setSelectedMultipleOptions] = useState({
    notice_skin: [], // 여러 개 선택 가능하도록 배열 사용
    notice_ear: [],
    notice_eye: [],
    notice_sole: [],
    notice_claw: [],
  });

  const handleCheckboxMultipleChange = (category, value) => {
    setSelectedMultipleOptions((prev) => {
      const currentValues = prev[category] || [];

      if (currentValues.includes(value)) {
        // 이미 선택된 경우 -> 제거
        return { ...prev, [category]: currentValues.filter((v) => v !== value) };
      } else {
        // 새로 선택된 경우 -> 추가
        return { ...prev, [category]: [...currentValues, value] };
      }
    });
  };

  const handleCheckboxChange = (category, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleTrueFalseChange = () => {
    setSelectedOptions((prev) => ({
      ...prev,
      notice_hairTangling_tf: prev.notice_hairTangling_tf === true ? false : true, 
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = async () => {
    
    try {
      const response = await api.post(
        `/api/customer/notice/write/${id}`,
        {
          formData,
          selectedOptions,
          selectedMultipleOptions,
        },
        { withCredentials: true }
      );

      console.log("보내기 작업 수행");
      closeModal();

      setTimeout(() => {
        navigate("/business/customer/management");
      }, 2000); // 2초 후 리다이렉트
    } catch (error) {
      console.log("알림장 작성 실패", error);
    }
  };

  return (
    <div className="page-container write_notice_total" lang="ko">
      <div className="page-container2">
        <div className="navigation">
          <button>
            <img
              src={arrowButtonUrl}
              alt=""
              onClick={() => navigate("/business/customer/management")}
            />
          </button>
          알림장
          <div> </div>
        </div>
        <div className="pet-title">
          <div className="pet-name">누렁이</div>
          <div className="pet-information">리트리버/남/2살</div>
        </div>
        <div className="notice-row">
          <div className="notice-title">스타일</div>
          <input
            className="notice-textbox"
            type="text"
            name="notice_style"
            value={formData.style}
            onChange={handleInputChange}
            placeholder="스타일을 입력해 주세요."
          />
        </div>
        <div className="notice-row">
          <div className="notice-title">몸무게(kg)</div>
          <input
            className="notice-textbox"
            type="text"
            name="notice_pet_weight"
            value={formData.notice_pet_weight}
            onChange={handleInputChange}
            placeholder="체중을 입력해 주세요."
          />
        </div>
        {/* 피부 */}
        <div className="notice-row">
          <div className="notice-title">피부</div>
          <div className="notice-checkboxes">
            {notice_skin_option.map((option) => (
              <label
                key={option}
                style={{
                  color: selectedMultipleOptions.notice_skin.includes(option) ? "black" : "#C4C4C4",
                }}
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedMultipleOptions.notice_skin.includes(option)}
                  onChange={() => handleCheckboxMultipleChange("notice_skin", option)}
                />
                &nbsp;
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* 귀 */}
        <div className="notice-row">
          <div className="notice-title">귀</div>
          <div className="notice-checkboxes">
            {notice_ear_option.map((option) => (
              <label
                key={option}
                style={{
                  color: selectedMultipleOptions.notice_ear.includes(option) ? "black" : "#C4C4C4",
                }}
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedMultipleOptions.notice_ear.includes(option)}
                  onChange={() => handleCheckboxMultipleChange("notice_ear", option)}
                />
                &nbsp;
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* 눈 */}
        <div className="notice-row">
          <div className="notice-title">눈</div>
          <div className="notice-checkboxes">
            {notice_eye_option.map((option) => (
              <label
                key={option}
                style={{
                  color: selectedMultipleOptions.notice_eye.includes(option) ? "black" : "#C4C4C4",
                }}
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedMultipleOptions.notice_eye.includes(option)}
                  onChange={() => handleCheckboxMultipleChange("notice_eye", option)}
                />
                &nbsp;
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* 발바닥 */}
        <div className="notice-row">
          <div className="notice-title">발바닥</div>
          <div className="notice-checkboxes">
            {notice_sole_option.map((option) => (
              <label
                key={option}
                style={{
                  color: selectedMultipleOptions.notice_sole.includes(option) ? "black" : "#C4C4C4",
                }}
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedMultipleOptions.notice_sole.includes(option)}
                  onChange={() => handleCheckboxMultipleChange("notice_sole", option)}
                />
                &nbsp;
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* 발톱 */}
        <div className="notice-row">
          <div className="notice-title">발톱</div>
          <div className="notice-checkboxes">
            {notice_claw_option.map((option) => (
              <label
                key={option}
                style={{
                  color: selectedMultipleOptions.notice_claw.includes(option) ? "black" : "#C4C4C4",
                }}
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedMultipleOptions.notice_claw.includes(option)}
                  onChange={() => handleCheckboxMultipleChange("notice_claw", option)}
                />
                &nbsp;
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* 항문낭 */}
        <div className="notice-row">
          <div className="notice-title">항문낭</div>
          <div className="notice-checkboxes">
            {notice_analSac_option.map((option) => (
              <label
                key={option}
                style={{
                  color: selectedOptions.notice_analSac.includes(option) ? "black" : "#C4C4C4",
                }}
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.notice_analSac.includes(option)}
                  onChange={() => handleCheckboxChange("notice_analSac", option)}
                />
                &nbsp;
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* 털엉킴 */}
        <div className="notice-row">
          <div className="notice-title">털엉킴</div>
          <div className="notice-checkboxes">
            {notice_hairTangling_option.map((option) => (
              <label
                key={option}
                style={{
                  color: (selectedOptions.notice_hairTangling_tf === true && option === "유") ||
                    (selectedOptions.notice_hairTangling_tf === false && option === "무")
                    ? "black" : "#C4C4C4",
                }}
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={(selectedOptions.notice_hairTangling_tf === true && option === "유") ||
                    (selectedOptions.notice_hairTangling_tf === false && option === "무")}
                  onChange={handleTrueFalseChange}
                />
                &nbsp;
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* 털엉킴 부위 */}
        {
          selectedOptions.notice_hairTangling_tf ? (
            <div className="notice-row">
              <div className="notice-title">털엉킴 부위</div>
              <input
                className="notice-textbox"
                type="text"
                name="notice_hairTangling"
                value={formData.notice_hairTangling}
                onChange={handleInputChange}
                placeholder="털엉킴 부위를 입력해 주세요."
              />
            </div>
          ) : (
            <></>
          )
        }

        <div className="notice-row">
          <div className="notice-title2">기타사항</div>
        </div>
        <div className="notice-row notice_row_textarea">
          <textarea
            className="notice-textbox2"
            type="text"
            id="notice_etc"
            name="notice_etc"
            value={formData.etc_meno}
            onChange={handleInputChange}
            placeholder="전달사항을 입력해주세요."
          />
        </div>
        <div className="notice-footer">
          <button className="send-btn" onClick={openModal}>
            보내기
          </button>
        </div>
      </div>
      <NoticeSendModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default WriteNotice;
