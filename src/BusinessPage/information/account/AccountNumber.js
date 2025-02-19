import React, { useState } from "react";
import api from "../../../Api";
import "../../../BusinessCSS/accountNumber.css";
import { useNavigate } from "react-router-dom";

function AccountNumber() {
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const noteUrl = `${process.env.PUBLIC_URL}/PageImage/list/note_ic.svg`;
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    bankCode: "",
    accountHolder: "",
    accountNumber: "",
  });

  const banks = [
    { name: "KB국민은행", code: "004" },
    { name: "신한은행", code: "088" },
    { name: "하나은행", code: "081" },
    { name: "우리은행", code: "020" },
    { name: "IBK기업은행", code: "003" },
    { name: "농협은행", code: "011" },
    { name: "SC제일은행", code: "023" },
    { name: "카카오뱅크", code: "090" },
    { name: "토스뱅크", code: "092" },
    { name: "케이뱅크", code: "089" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "accountNumber") {
      const numericValue = value.replace(/[^0-9]/g, "");
      if (numericValue.length > 20) {
        setError("계좌번호는 최대 20자리까지 입력 가능합니다.");
        return;
      }
      setError("");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { accountNumber, accountHolder, bankCode } = formData;

    if (!accountNumber || !accountHolder || !bankCode) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    console.log("Submitted account details:", formData);

    try {
      const response = await api.post(
        `/api/business/account/number`,
        formData,
        { withCredentials: true }
      );
      if (response.data === "common") {
        window.location = "/business/login";
      }
      window.location = "/business/menu";
    } catch (error) {
      console.error("Error during account submission:", error);
      setError("서버 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="accountNumber">
      <div className="accountNumberNavigation">
        <button>
          <img
            src={arrowButtonUrl}
            alt=""
            onClick={() => navigate("/business/menu")}
          />
        </button>
        계좌번호
        <button onClick={handleSubmit} style={{ color: "#f0663f" }}>
          등록
        </button>
      </div>

      <div>
        <form>
          <div className="accountBox">
            <div className="accountContent">
              <label htmlFor="bankCode">은행명</label>
              <select
                id="bankCode"
                name="bankCode"
                value={formData.bankCode}
                onChange={handleInputChange}
                style={{ width: "100%", padding: "10px" }}
              >
                <option value="">은행을 선택하세요</option>
                {banks.map((bank) => (
                  <option key={bank.code} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="accountContent">
              <label htmlFor="accountHolder">예금주</label>
              <input
                type="text"
                id="accountHolder"
                name="accountHolder"
                value={formData.accountHolder}
                onChange={handleInputChange}
                placeholder="예금주 이름을 입력하세요"
                style={{ width: "100%", padding: "10px" }}
              />
            </div>
            <div className="accountContent">
              <label htmlFor="accountNumber">계좌번호</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                placeholder="계좌번호를 입력하세요"
                style={{ width: "100%", padding: "10px" }}
              />
            </div>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default AccountNumber;
