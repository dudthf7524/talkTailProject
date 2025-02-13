import "../../CSS/footer.css";
import React from "react";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const landline_phone = "070-4571-7580";
  const logoUrl = `${process.env.PUBLIC_URL}/image/talkTail_logo.png`;

  return (
    <div className="tail-container">
      <div className="tail-item">
        <img src={logoUrl} alt="" style={{ width: "50%" }} />

        <div className="tail-text">입점문의｜광고문의｜제휴문의｜상담문의</div>
        <div className="tail-number">
          <a
            style={{ textDecoration: "none", color: "black" }}
            href={`tel:${landline_phone}`}
          >
            070-4571-7580
          </a>
        </div>
        <div className="tail-a">
          <span
            onClick={() => {
              navigate("/tos");
            }}
          >
            이용약관
          </span>
          ｜
          <span
            onClick={() => {
              navigate("/privacy");
            }}
          >
            개인정보 처리방침
          </span>
        </div>
        <div className={`tail-accordion open noCursor`}>사업자 정보</div>
        <div className={`hidden-content open`}>
          <div className="hidden-item">
            <div>대표</div>
            <div>사업자등록번호</div>
            <div>통신판매업</div>
            <div>주소</div>
            <div>이메일</div>
          </div>
          <div className="hidden-item2">
            <div>권도혁</div>
            <div>514-87-03021</div>
            <div>2025-경북경산-0073</div>
            <div>경상북도 경산시 삼풍로 27, 309호</div>
            <div>creamoff2021@creamoff.co.kr</div>
          </div>
        </div>
        <div className="tail-co">@TalkTail co Ltd. All rigths reserved</div>
      </div>
    </div>
  );
};

export default Footer;
