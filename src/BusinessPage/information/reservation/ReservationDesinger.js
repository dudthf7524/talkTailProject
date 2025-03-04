import { useEffect } from "react";
import api from "../../../Api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../BusinessCSS/desingerList.css";

function ReservationDesinger() {
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const noteUrl = `${process.env.PUBLIC_URL}/PageImage/list/note_ic.svg`;
  const navigate = useNavigate();
  const [lists, setLists] = useState();

  useEffect(() => {
    const fetchAndAuthorizeUser = async () => {
      try {
        const response = await api.get("/api/business/desinger/list", {
          withCredentials: true,
        });
        setLists(response.data);

        if (response.data == "common") {
          navigate("/business/login");
        } else if (!response.data) {
          navigate("/business/register/designer");
        }
      } catch (e) {
        console.error("권한 조회 실패:", e);
      }
    };

    fetchAndAuthorizeUser();
  }, []);

  if (!lists) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="desingerlist">
      <div className="desingerlistNavigation">
        <img
          style={{ cursor: "pointer" }}
          src={arrowButtonUrl}
          alt=""
          onClick={() => navigate("/business/menu")}
        />
        수기관리
        <button></button>
      </div>

      <div className="title">
        <div className="text">이름</div>
        <div className="text">예약일</div>
      </div>
      <div className="horizontal-line"></div>

      {lists.map((list, index) => (
        <div key={index} className="desingerlist-row">
          <div className="desingerlist-item">{list.business_desinger_name}</div>
          <div className="desingerlist-item">
            <button
              onClick={() =>
                navigate("/business/reservation", {
                  state: { id: list.business_desinger_id },
                })
              }
            >
              예약하기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReservationDesinger;
