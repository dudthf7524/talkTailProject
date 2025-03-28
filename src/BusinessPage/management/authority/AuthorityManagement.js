import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../BusinessCSS/authorityManagement.css";
import api from "../../../Api";

function AuthorityManagement() {
  const location = useLocation();
  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const [lists, setLists] = useState();

  useEffect(() => {
    const fetchAndAuthorizeUser = async () => {
      try {
        const result = await api.get("/api/user/authority", {
          withCredentials: true,
        });
        if (result.data === "common") {
          navigate("/business/login");
        }
        setLists(result.data);
      } catch (error) {
        console.error("권한 조회 실패:", error);
      }
    };

    fetchAndAuthorizeUser();
  }, [location.pathname]);

  const authorityAvailableTrue = async (
    user_authority_request_id,
    phone,
    state
  ) => {
    const id = user_authority_request_id;
    const authority_state = state;
    const user_phone = phone;
    try {
      const result = await api.put(
        "/api/user/authority/state",
        {
          id,
          authority_state,
          user_phone,
        },
        { withCredentials: true }
      );

      if (result.data === "common") {
        return navigate("/business/login");
      }

      if (result.data === "success") {
        window.location.href = "/business/authority/management";
      }
    } catch (error) {
      console.error("요청 수락 에러", error.message);
    }
  };

  return (
    <div className="page-container authorityManagement_total" lang="ko">
      <div className="navigation">
        <button>
          <img
            src={arrowButtonUrl}
            alt=""
            onClick={() => navigate("/business/menu")}
          />
        </button>
        고객등록
        <div> </div>
      </div>
      <div className="authorityManagement-title">
        <div className="authorityManagement-text">보호자</div>
        <div className="authorityManagement-text">전화번호</div>
        <div className="authorityManagement-text">내역</div>
        {/* <div className="authorityManagement-text">거절</div> */}
      </div>
      <div id="horizontal-line"></div>
      {lists != null || lists != undefined ? (
        lists.map((list, index) => (
          <div key={index} className="authorityManagement-row">
            <div className="authorityManagement-item">{list.user_name}</div>
            <div className="authorityManagement-item">{list.user_phone}</div>

            {list.authority_state === "대기" ? (
              <>
                <div className="authorityManagement-item">
                  <button
                    id="detail-button"
                    onClick={() =>
                      authorityAvailableTrue(
                        list.user_authority_request_id,
                        list.user_phone,
                        "완료"
                      )
                    }
                  >
                    요청승인
                  </button>
                  <button
                    id="refuse-button"
                    onClick={() =>
                      authorityAvailableTrue(
                        list.user_authority_request_id,
                        list.user_phone,
                        "거절"
                      )
                    }
                  >
                    요청거절
                  </button>
                </div>
              </>
            ) : list.authority_state === "완료" ? (
              <>
                {/* 수락완료, 거절완료 */}
                <div
                  style={{ color: "green", fontWeight: "bold" }}
                  className="authorityManagement-item"
                >
                  승인완료
                </div>
              </>
            ) : list.authority_state === "거절" ? (
              <>
                {/* 수락완료, 거절완료 */}
                <div
                  style={{ color: "red", fontWeight: "bold" }}
                  className="authorityManagement-item"
                >
                  승인거절
                </div>
              </>
            ) : (
              <div
                className="authorityManagement-item"
                style={{ fontWeight: "bold", color: "gray" }}
              >
                알 수 없음
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="empty-message">
          현재 승인 요청 관리 정보가 없습니다.
        </div>
      )}
    </div>
  );
}

export default AuthorityManagement;
