import { useEffect } from "react";
import api from "../Api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../BusinessCSS/accountNumberList.css";

function AccountNumberList() {
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const noteUrl = `${process.env.PUBLIC_URL}/PageImage/list/note_ic.svg`;
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchAndAuthorizeUser = async () => {
      try {
        const response = await api.get("/api/business/account/number/list", {
          withCredentials: true,
        });
        setLists(response.data);
        console.log(response.data);

        if (response.data == "common") {
          navigate("/business/login");
        } else if (!response.data) {
          navigate("/business/account/number");
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
    <div className="accountNumberList">
      <div className="accountNumberListNavigation">
        <button>
          <img
            src={arrowButtonUrl}
            alt=""
            onClick={() => navigate("/business/menu")}
          />
        </button>
        계좌번호 목록
        <button onClick={() => navigate("/business/account/number")}>
          <img src={noteUrl} alt="" />
        </button>
      </div>

      <div className="title">
        <div className="text">은행명</div>
        <div className="text">예금주</div>
        <div className="text">계좌번호</div>
      </div>
      <div className="horizontal-line"></div>

      {lists.map((list, index) => (
        <div key={index} className="accountNumberList-row">
          <div className="accountNumberList-item">{list?.name}</div>
          <div className="accountNumberList-item">{list?.account_holder}</div>
          <div className="accountNumberList-item">{list?.account_number}</div>
        </div>
      ))}
    </div>
  );
}

export default AccountNumberList;
