import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../BusinessCSS/customerManagement.css";
import { useEffect } from "react";
import api from "../../../Api";
import dayjs from "dayjs";
import "dayjs/locale/ko";
const CustomerManagement = () => {
  dayjs.locale("ko");
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchReservationManagement = async () => {
      try {
        const response = await api.get("/api/customer/management", {
          withCredentials: true,
        });
        if (response.data == "common") {
          navigate("/business/login"); // 로그인 페이지로 리디렉션
        }
        if (response.data[0] === null || response.data === null) {
          return;
        } else {
          setLists(response.data);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패", error);
        navigate("/business/login"); // 로그인 페이지로 리디렉션
      }
    };
    fetchReservationManagement();
  }, []);

  return (
    <div className="page-container note_page" lang="ko">
      <div className="navigation">
        <button>
          <img
            src={arrowButtonUrl}
            alt=""
            onClick={() => navigate("/business/menu")}
          />
        </button>
        알림장
        <div> </div>
      </div>
      <div className="customerManagement-title">
        <div className="customerManagement-text">예약날짜</div>
        <div className="customerManagement-text">반려동물/보호자</div>
        <div className="customerManagement-text">알림장</div>
      </div>
      <div id="horizontal-line">&nbsp;</div>

      {lists != null ? (
        lists.map((list, index) => (
          <div key={index} className="customer-row">
            <div className="customer-item">
              {list.date} ({dayjs(list.date).format("ddd")}) {list.start_time} ~{" "}
              {list.end_time}
            </div>
            <div className="customer-item">
              {list.pet_name}/{list.user_name}
            </div>
            <div className="customer-item">
              {list.beauty_notice_is_available ? (
                <button
                  className="result-button-write"
                  onClick={() =>
                    navigate("/business/customer/management/detail", {
                      state: { id: list.beauty_reservation_id },
                    })
                  }
                >
                  작성완료
                </button>
              ) : (
                <button
                  className="result-button-complete"
                  onClick={() =>
                    navigate(`/business/write/notice`, {
                      state: { id: list.beauty_reservation_id },
                    })
                  }
                >
                  작성하기
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="empty-message">
          현재 예약된 고객 관리 정보가 없습니다.
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
