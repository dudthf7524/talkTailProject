import "../../CSS/home.css";
import React from "react";
import { useNavigate } from "react-router-dom";
const Privacy = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="back"
        onClick={() => {
          navigate(-1);
        }}
      ></div>
      <div className="privacy homeModal">
        <img
          onClick={() => {
            navigate(-1);
          }}
          src="/PageImage/components/X.svg"
          alt=""
        />
        <p className="title">개인정보 처리방침</p>
        <p className="sub_title">제1조 [총칙]</p>
        <p className="content">
          ㈜크림오프(이하 “회사”)는 통신비밀보호법, 전기통신사업법, 정보통신망
          이용촉진 및 정보보호 등에 관한 법률 등 관련 법령을 준수하며, 이용자의
          개인정보 보호를 위해 최선을 다하고 있습니다. 본 개인정보 처리방침은
          회사가 제공하는 서비스 이용과 관련하여 이용자의 개인정보 보호 및 처리
          방침을 규정함을 목적으로 합니다.
        </p>
        <p className="sub_title">
          제2조 [수집하는 개인정보의 항목 및 수집 방법]
        </p>
        <p className="content">
          1. 회사는 이용자의 서비스 이용 과정에서 다음과 같은 개인정보를 수집할
          수 있습니다.
          <br /> &nbsp;○ 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보, 결제
          기록, 이용 정지 기록 등<br />
          2. 개인정보 수집 항목, 목적 및 보유 기간은 아래와 같습니다.
          <br /> &nbsp;○ 고객(반려동물 보호자) 회원 가입
          <br /> &nbsp;&nbsp;● 수집 항목 : 소셜 계정(구글, 카카오, 네이버),
          이름, 전화번호
          <br />
          &nbsp;&nbsp;● 보유 기간: 회원 탈퇴 또는 5년간 이용 없을 시 <br />
          &nbsp;&nbsp;● 수집 방법: 회원가입 시 입력 <br />
          &nbsp;&nbsp;● 이용 목적: 회원 식별, 본인인증, 서비스 제공, 고객응대{" "}
          <br />
          &nbsp;○ 매장 예약 <br />
          &nbsp;&nbsp;● 수집 항목 : 이름, 연락처, 소셜 계정, 서비스 이용 기록,
          반려동물명, 품종, 성별, 등록번호, 생년월일 등 <br />
          &nbsp;&nbsp;● 보유 기간 : 회원 탈퇴 또는 5년간 이용 없을 시 <br />
          &nbsp;&nbsp;● 수집 방법 : 매장 수신 전화, 회원 가입, 동의서 작성{" "}
          <br />
          &nbsp;&nbsp;● 이용 목적 : 예약 확인, 고객 응대, 부정 이용 방지, 마케팅
          활용 <br />
          &nbsp;○ 관리자(사업자) 입점 및 제휴 <br />
          &nbsp;&nbsp;● 수집 항목 : 이름, 전화번호, 매장명 등 <br />
          &nbsp;&nbsp;● 보유 기간 : 동의 철회 또는 회원 탈퇴 시까지 <br />
          &nbsp;&nbsp;● 수집 방법 : 가입 신청, 전화문의, 제휴 신청서 수집 <br />
          &nbsp;&nbsp;● 이용 목적 : 신규 입점 및 제휴 문의 처리, 서비스 이용,
          민원처리, 마케팅 활용
        </p>
        <p className="sub_title">
          제3조 [개인정보의 보유 및 이용 기간, 파기 방법]
        </p>
        <p className="content">
          1. 회사는 이용자의 개인정보를 법령에서 정하는 기간 동안 보유하며,
          목적이 달성된 후에는 안전한 방법으로 파기합니다.
          <br /> 2. 개인정보 보유 기간은 다음과 같습니다.
          <br /> &nbsp;○ 서비스 이용 기록, 접속 로그, IP 정보: 3개월
          (통신비밀보호법) <br />
          &nbsp;○ 표시·광고 기록: 6개월 (전자상거래법) <br />
          &nbsp;○ 계약·청약철회 기록: 5년 (전자상거래법) <br />
          &nbsp;○ 대금 결제·서비스 제공 기록: 5년 (전자상거래법) <br />
          &nbsp;○ 소비자 불만·분쟁처리 기록: 3년 (전자상거래법) <br />
          3. 개인정보 파기 방법 :<br />
          &nbsp;○ 종이에 출력된 개인정보는 분쇄기로 파기
          <br /> &nbsp;○ 전자 파일 형태의 개인정보는 복구 불가능한 기술적 방법을
          사용하여 삭제
        </p>
        <p className="sub_title">제4조 [개인정보의 제3자 제공]</p>
        <p className="content">
          1. 회사는 이용자의 개인정보를 법령에 따라 적법하게 처리하며, 사전 동의
          없이 제3자에게 제공하지 않습니다.
          <br />
          2. 예외적으로 이용자가 동의했거나 법령에서 허용한 경우, 수사기관의
          요청이 있을 경우 제공할 수 있습니다.
        </p>
        <p className="sub_title">제5조 [개인정보의 위탁]</p>
        <p className="content">
          회사는 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를 위탁하고
          있으며, 관련 법령에 따라 안전하게 관리합니다.
          <br />
          &nbsp;○ 수탁업체 : 카카오
          <br />
          &nbsp;○ 위탁업무 : 알림톡 발송
        </p>
        <p className="sub_title">제6조 [이용자의 권리 및 행사 방법]</p>
        <p className="content">
          1. 이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며,
          회원 탈퇴를 요청할 수 있습니다.
          <br />
          2. 이용자의 요청이 있는 경우, 회사는 지체 없이 필요한 조치를 취합니다.
          <br />
          3. 개인정보 문의 및 요청은 다음 연락처로 가능합니다.
          <br />
          &nbsp;○ 이메일: talktail@creamoff.co.kr
          <br />
          &nbsp;○ 전화번호: 070-4571-7580
        </p>
        <p className="sub_title">제7조 [쿠키의 운영 및 활용]</p>
        <p className="content">
          1. 회사는 웹사이트 운영을 위해 쿠키를 사용하며, 이용자는 쿠키 허용
          여부를 설정할 수 있습니다.
          <br />
          2. 쿠키 설정 변경 방법:
          <br />
          &nbsp;○ 웹 브라우저에서 [인터넷 옵션] → [개인정보 탭]을 조정하여 설정
          가능
        </p>
        <p className="sub_title">
          제8조 [개인정보 보호를 위한 기술적·제도적 관리]
        </p>
        <p className="content">
          1. 회사는 이용자의 개인정보 보호를 위해 암호화, 방화벽, 접근 통제 등
          보안 조치를 시행하고 있습니다. <br />
          2. 개인정보 접근 권한을 최소화하고 담당자 교육을 통해 개인정보 보호를
          철저히 관리합니다.
        </p>
        <p className="sub_title">제9조 [14세 미만 아동의 개인정보 보호]</p>
        <p className="content">
          회사는 원칙적으로 14세 미만 아동의 개인정보를 수집하지 않으며, 필요 시
          법적 절차를 준수하여 수집합니다.
        </p>
        <p className="sub_title">제10조 [고지의 의무]</p>
        <p className="content">
          1. 회사는 개인정보 처리 방침 변경 시 개정 7일 전에 홈페이지를 통해
          고지합니다. <br />
          2. 본 방침은 2024년 12월 1일부터 시행됩니다.
        </p>
      </div>
    </>
  );
};

export default Privacy;
