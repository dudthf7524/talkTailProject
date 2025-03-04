import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Api";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import "../../CSS/notice.css";

const NoticeDetail = () => {
  dayjs.locale("ko");
  const location = useLocation();
  const date = location.state?.date;
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 이벤트 ID 가져오기
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const [list, setList] = useState();

  const notice_skin_option = [
    "좋음",
    "건조",
    "민감",
    "붉음",
    "탈모",
    "딱지",
    "종기",
    "각질",
  ];
  const notice_ear_option = ["깨끗함", "노란귀지", "갈색귀지", "귓턻많음"];
  const notice_eye_option = ["깨끗함", "눈꼽", "충혈"];
  const notice_sole_option = ["좋음", "습진", "건조"];
  const notice_claw_option = ["적당함", "짧음", "관리필요"];
  const notice_analSac_option = ["많음", "적당", "안나옴"];

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
        return {
          ...prev,
          [category]: currentValues.filter((v) => v !== value),
        };
      } else {
        // 새로 선택된 경우 -> 추가
        return { ...prev, [category]: [...currentValues, value] };
      }
    });
  };

  useEffect(() => {
    const noticeDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found.");
        }
        const response = await api.get(`/api/customer/notice/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.notice_skin) {
          const notice_skin_Array = response.data.notice_skin.split("/");
          const notice_ear_Array = response.data.notice_ear.split("/");
          const notice_eye_Array = response.data.notice_eye.split("/");
          const notice_sole_Array = response.data.notice_sole.split("/");
          const notice_claw_Array = response.data.notice_claw.split("/");
          setSelectedMultipleOptions((prev) => ({
            ...prev,
            notice_skin: notice_skin_Array,
            notice_ear: notice_ear_Array,
            notice_eye: notice_eye_Array,
            notice_sole: notice_sole_Array,
            notice_claw: notice_claw_Array,
          }));
        }

        setList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    noticeDetail();
  }, []);

  const [selectedOptions, setSelectedOptions] = useState({
    notice_skin: "", // list가 없으면 기본값으로 빈 문자열
    notice_ear: "",
    notice_eye: "",
    notice_sole: "",
    notice_claw: "",
    notice_analSac: "",
    notice_hairTangling: "",
  });
  useEffect(() => {
    if (list) {
      // list가 업데이트되면 selectedOptions을 업데이트
      setSelectedOptions({
        notice_skin: list.notice_skin || "",
        notice_ear: list.notice_ear || "",
        notice_eye: list.notice_eye || "",
        notice_sole: list.notice_sole || "",
        notice_claw: list.notice_claw || "",
        notice_analSac: list.notice_analSac || "",
        notice_hairTangling: list.notice_hairTangling || "",
      });
    }
  }, [list]); // list가 업데이트되면 실행
  const handleCheckboxChange = (category, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return null; // 생년월일이 없을 경우 처리
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    // 생일이 아직 지나지 않았으면 나이를 하나 줄임
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  };

  const goBack = () => {
    navigate(-1); // 뒤로 가기
  };

  if (!list) {
    return <div>로딩 중....</div>;
  }

  return (
    <div lang="ko" className="notice_detail_total">
      <div className="mid">
        <div className="navigation">
          <button>
            <img src={arrowButtonUrl} alt="" onClick={goBack} />
          </button>
          알림장 상세보기
          <div></div>
        </div>
        <div className="review-mid">
          <div className="view-head">
            <div className="view-head-textbox">
              <h1>알림장</h1>
              <p>{dayjs(date).format("YYYY년 M월DD일 (ddd)")}</p>
            </div>
          </div>
          <div className="view-pet">
            {list.pet_name}
            <p>
              {list.pet_breed}/{list.pet_weight}kg/{list.pet_name}/
              {calculateAge(list.pet_birth)}살
            </p>
          </div>
          <div className="view-contents-style">
            <div className="view-contents-title">
              <h1>스타일</h1>
            </div>
            <div className="view-contents-option">
              <p>{list.notice_style}</p>
            </div>
          </div>
          <div className="view-contents-style">
            <div className="view-contents-title">
              <h1>몸무게</h1>
            </div>
            <div className="view-contents-option">
              <p>{list.notice_pet_weight}kg</p>
            </div>
          </div>

          {/* 피부 */}
          <div className="view-contents-style">
            <div className="view-contents-title">
              <h1>피부</h1>
            </div>
            <div className="notice-checkboxes">
              {notice_skin_option.map((option) => (
                <label
                  key={option}
                  style={{
                    color: selectedMultipleOptions.notice_skin.includes(option)
                      ? "black"
                      : "#C4C4C4",
                  }}
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedMultipleOptions.notice_skin.includes(
                      option
                    )}
                    readOnly
                  />
                  &nbsp;
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* 귀 */}
          <div className="view-contents-style">
            <div className="view-contents-title">
              <h1>귀</h1>
            </div>
            <div className="notice-checkboxes">
              {notice_ear_option.map((option) => (
                <label
                  key={option}
                  style={{
                    color: selectedMultipleOptions.notice_ear.includes(option)
                      ? "black"
                      : "#C4C4C4",
                  }}
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedMultipleOptions.notice_ear.includes(
                      option
                    )}
                    readOnly
                  />
                  &nbsp;
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* 눈 */}
          <div className="view-contents-style">
            <div className="view-contents-title">
              <h1>눈</h1>
            </div>
            <div className="notice-checkboxes">
              {notice_eye_option.map((option) => (
                <label
                  key={option}
                  style={{
                    color: selectedMultipleOptions.notice_eye.includes(option)
                      ? "black"
                      : "#C4C4C4",
                  }}
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedMultipleOptions.notice_eye.includes(
                      option
                    )}
                    readOnly
                  />
                  &nbsp;
                  {option}
                </label>
              ))}
            </div>
          </div>
          {/* 발바닥 */}
          <div className="view-contents-style">
            <div className="view-contents-title">
              <h1>발바닥</h1>
            </div>
            <div className="notice-checkboxes">
              {notice_sole_option.map((option) => (
                <label
                  key={option}
                  style={{
                    color: selectedMultipleOptions.notice_sole.includes(option)
                      ? "black"
                      : "#C4C4C4",
                  }}
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedMultipleOptions.notice_sole.includes(
                      option
                    )}
                    readOnly
                  />
                  &nbsp;
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="view-contents-style">
            <div className="view-contents-title">
              <h1>발톱</h1>
            </div>
            <div className="notice-checkboxes">
              {notice_claw_option.map((option) => (
                <label
                  key={option}
                  style={{
                    color: selectedMultipleOptions.notice_claw.includes(option)
                      ? "black"
                      : "#C4C4C4",
                  }}
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedMultipleOptions.notice_claw.includes(
                      option
                    )}
                    readOnly
                  />
                  &nbsp;
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="view-contents-style">
            <div className="view-contents-title">
              <h1>항문낭</h1>
            </div>
            <div className="notice-checkboxes">
              {notice_analSac_option.map((option) => (
                <label
                  key={option}
                  style={{
                    color: selectedOptions.notice_analSac.includes(option)
                      ? "black"
                      : "#C4C4C4",
                  }}
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedOptions.notice_analSac.includes(option)}
                    readOnly
                  />
                  &nbsp;
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="view-contents-style">
            <div className="view-contents-title">
              <h1>털엉킴</h1>
            </div>
            <div className="view-contents-option">
              <p>{list.notice_hairTangling}</p>
            </div>
          </div>

          <div className="view-contents-style">
            <div className="view-contents-title">
              <h1>기타사항</h1>
            </div>
            <div className="notice-row notice_row_textarea">
              <textarea
                className="notice-textbox2"
                type="text"
                id="notice_etc"
                name="notice_etc"
                value={list.notice_etc}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className="Nbutton"
        onClick={() => navigate("/notice")}
        style={{ cursor: "pointer" }}
      >
        알림장 목록
      </div> */}
    </div>
  );
};

export default NoticeDetail;
