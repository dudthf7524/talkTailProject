import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../Api";
import "../../CSS/authority.css";
import NButtonContainer from "../Components/NavigatorBar/NButtonContainer";

function AuthorityManagement() {
  const location = useLocation();
  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchAndAuthorizeUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found.");
        }

        // 서버에 요청을 보낼 때 에러가 발생해도 앱이 멈추지 않도록 처리
        const result = await api.get(`/api/user/authority/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(result.data);
        setLists(result.data);
      } catch (error) {
        console.error("권한 조회 실패:", error);
      }
    };

    fetchAndAuthorizeUser();
  }, [location.pathname]);

  return (
    <div className="page-container authority_total" lang="ko">
      <div className="navigation">
        <button>
          <img
            src={arrowButtonUrl}
            alt=""
            onClick={() => navigate("/my-Page")}
          />
        </button>
        승인내역
        <div> </div>
      </div>
      <div className="authority-title">
        <div className="authority-text">미용실</div>
        <div className="authority-text">승인여부</div>
      </div>
      <div id="horizontal-line"></div>

      {lists.map((list, index) => (
        <div className="authority-row" key={index}>
          <div>{list.business_name}</div>

          {list.authority_state === "완료" ? (
            <div style={{ fontWeight: "bold", color: "green" }}>
              권한요청 완료
            </div>
          ) : list.authority_state === "대기" ? (
            <div style={{ fontWeight: "bold", color: "orange" }}>
              권한요청 대기 중
            </div>
          ) : list.authority_state === "거절" ? (
            <div style={{ fontWeight: "bold", color: "red" }}>
              권한요청 거절
            </div>
          ) : (
            <div style={{ fontWeight: "bold", color: "gray" }}>알 수 없음</div>
          )}
        </div>
      ))}
      <div className="text_box">
        <p>*승인 내역 과정*</p>
        <p>단골신청→대기중→단골승인/단골실패</p>
      </div>
      <NButtonContainer />
    </div>
  );
}

export default AuthorityManagement;
