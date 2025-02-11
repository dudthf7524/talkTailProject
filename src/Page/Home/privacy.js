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
        <p className="content">
          개정 일 : 2024년 12월 1일
          <br />
          ㈜크림오프(이하 “회사”라 함)는 통신비밀보호법, 전기통신사업법,
          정보통신망 이용촉진 및 정보보호 등에 관한 법률 등
          정보통신서비스제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을
          준수하며, 관련 법령에 의거한 개인정보취급방침을 정하여 이용자 권익
          보호에 최선을 다하고 있습니다.
          <br />
          <br />
          <span>제1조 수집하는 개인정보의 항목 및 수집방법</span>
          <br />
          1.1. 수집하는 개인정보의 항목아래의 표를 참조하여 주시기
          바랍니다.서비스 이용 과정이나 사업 처리 과정에서 아래와 같은 정보들이
          생성되어 수집될 수 있습니다. (서비스 기록, 접속 로그, 쿠키, 접속 IP
          정보, 결제 기록, 이용 정지 기록) <br />
          <br />
          <span>제2조 개인정보 수집방법</span> <br />
          *회사가 수집하는 개인정보의 구체적인 항목, 목적, 보유기간, 수집 방법은
          아래 내용과 같습니다.
          <br />
          - 구분 : 가맹 문의 및 가입 <br />
          - 수집 항목 : 필수: 성명, 매장명, 이메일, 전화번호 선택: 가족 정보,
          결제 정보
          <br />
          - 보유 기간 : 개인정보 수집·이용 동의: 회원 탈퇴 또는 5년간 이용 없을
          시 금융정보: 결제 후 5년
          <br />
          - 수집 방법 : 홈페이지 문의 및 가입 신청, 회사 고객센터 및 영업사원을
          통해 수신된 전화 통화를 통해 구두로 수집, 매장용 시스템 내 결제
          <br />- 이용 목적 : 가입 상담, 서비스 이용, 계약의 이행, 민원 처리,
          부정 이용 및 거래 방지, 약관 변경 등 고지, 통계자료 작성 및 고객 맞춤
          서비스를 개발/제공하기 위한 자료, 신규 서비스 개발 및 마케팅·광고에의
          활용
          <br />
          - 구분 : 매장 예약 <br />
          - 수집 항목 : 필수: 이름, 연락처, 이메일, 서비스 이용 기록 선택:
          반려동물명, 품종, 성별, 동물 등록번호, 중성화 수술 여부, 생년월일,
          주소
          <br />
          - 보유 기간 : 개인정보 수집·이용 동의: 회원 탈퇴 또는 5년간 이용 없을
          시
          <br />
          - 수집 방법 : 예약 시 매장 수신 전화 통화를 통해 구두로 수집, 회원
          가입 및 동의서 작성시 고객이 직접 입력
          <br />- 이용 목적 : 본인 여부 확인, 서비스 이행을 위한 연락 및 안내,
          고지 사항 전달, 분쟁 및 불만처리 등의 의사소통 경로, 부정
          이용자(고의적 노쇼) 제재 및 거래 방지, 약관 변경 등 고지, 통계자료
          작성 및 고객 맞춤 서비스를 개발/제공하기 위한 자료, 동의서 작성,
          동의서 작성 및 관리, 신규 서비스 개발 및 마케팅·광고에의 활용 <br />
          - 구분 : 회원가입 시 <br />
          - 수집 항목 : 필수: 아이디, 이름, 이메일 주소, 휴대폰번호, 프로필 사진
          <br />
          - 보유 기간 : 개인정보 수집·이용 동의: 회원 탈퇴 또는 5년간 이용 없을
          시
          <br />
          - 수집 방법 :
          <br />- 이용 목적 : 회원 가입의사 확인 회원제 서비스 제공에 따른 본인
          식별·인증 회원자격 유지·관리 서비스 부정이용 방지 각종 고지·통지,
          고충처리 목적
          <br />
          - 구분 : 입점 및 제휴 <br />
          - 수집 항목 : 필수: 이름, 휴대폰 번호
          <br />
          - 보유 기간 : 동의 철회 혹은 회원 탈퇴 시까지 ※ 단, 법정 의무
          보유기간에 따라 보관
          <br />
          - 수집 방법 :
          <br />- 이용 목적 : 신규 판매사 입점 및 제휴 문의 처리
          <br />
          - 구분 : 초대 메시지 발송 <br />
          - 수집 항목 : 필수: 초대받고자 하는 제 3자 정보(휴대폰번호)
          <br />
          - 보유 기간 : 발송 후 7일까지
          <br />
          - 수집 방법 :
          <br />- 이용 목적 : 펫케어숍 관리자, 보호자로 초대하고자 하는 대상에게
          초대 메시지 발송
          <br />
          *고객님의 기본적 인권 침해의 우려가 있는 민감한 개인정보(인종 및 민족,
          사항 및 신조, 출신지 및 본적지, 정치적 성향, 건강 상태 및 성생활 등)은
          수집하지 않습니다.
          <br />
          <br />
          <span>제3조 개인정보의 보유 및 이용 기간, 파기방법</span>
          <br />
          회사는 법령에 따른 개인정보 보유, 이용기간 또는 정보주체로부터
          개인정보 수집 시에 동의 받은 개인정보 보유, 이용기간 내에서 개인정보를
          처리, 보유합니다. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
          • 회원 가입 및 관리 : 회원 탈퇴 시까지 • 다음의 사유에 해당하는
          경우에는 해당 사유 종료 시 까지 1. 관계 법령 위반에 따른 수사, 조사
          등이 진행 중인 경우에는 해당 수사, 조사 종료 시까지 2. 재화 또는
          서비스 제공 : 재화, 서비스 공급 완료 및 요금 결제, 정산 완료 시까지 3.
          원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체
          없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간
          동안 보존합니다. 1. 회사 내부 방침에 의한 보존가. 보관 개인정보:
          아이핀, CI 정보 등 본인확인을 위한 정보나. 보관 목적: 재방문 고객의
          본인확인, 불량 이용자의 서비스 이용, 재가입을 통한 기념일 쿠폰 악용 및
          형평성 침해 방지, 명예훼손, 권리침해 분쟁 및 수사협조, 타인 명의
          이용한 적립 사용 고객, , 사용 고객의 부정이용 방지 및 회원가입 등
          제한조치 목적 등다. 보관 기간: 3년 2. 관련법령에 의한 보존상법,
          전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여
          보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안
          회원정보를 보관합니다. 이 경우 회사는 보관하는 정보를 그 보관의
          목적으로만 이용하며 보존기간은 아래와 같습니다. 1. 서비스 이용 기록,
          접속 로그, 접속IP정보: 3개월(통신비밀보호법) 2. 표시, 광고에 관한
          기록: 6개월(전자상거래 등에서의 소비자보호에 관한 법률) 3. 계약 또는
          청약철회 등에 관한 기록: 5년 (전자상거래 등에서의 소비자보호에 관한
          법률) 4. 대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래
          등에서의 소비자보호에 관한 법률) 5. 소비자의 불만 또는 분쟁 처리에
          관한 기록: 3년 (전자상거래 등에서의 소비자보호에 관한 법률) 6.
          상사채권소멸시효 : 5년 (상법) 개인정보 유효기간
          제도정보통신망법령(동법 제29조 2항 및 동법 시행령 개정안 제16조)에
          따라 온라인 회원 중 1년이상 당사 서비스를 이용하지 않는 회원의
          개인정보를 다른 정보와 별도로 분리하여 보관합니다. 파기방법 1. 종이에
          출력된 개인정보 : 분쇄기로 분쇄하거나 소각 2. 전자적 파일형태로 저장된
          개인정보 : 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제
          <br />
          <br />
          <span>제4조 개인정보의 제3자 제공</span>
          <br />
          1. 회사는 고객의 개인정보를 사전 동의 없이 제3자에게 제공하지
          않습니다. 단, 고객이 사전에 동의를 하거나 관련 법령에서 정한 절차와
          방법에 따라 수사기관이 개인정보 제공을 요구하는 경우에는 예외적으로
          제공하게 됩니다. 2. 고객의 개인정보를 제공하거나 공유하는 경우에는
          고객에게 제공 받거나 공유하는 자가 누구이며, 제공 또는 공유되는
          개인정보 항목이 무엇인지, 개인정보를 제공하거나 공유하는 목적이
          무엇인지, 보유 및 이용기간 등에 대해 개별적으로 사이트, 전자우편 등을
          통해 고지한 후 이에 대하여 별도 동의를 구합니다. 3. 다만 관련 법령에서
          달리 정하는 경우에는 고객의 동의 없이 개인정보를 제공하는 것이
          가능합니다.
          <br />
          <br />
          <span>제5조 서비스 제공을 위한 개인정보처리의 위탁</span>
          <br />
          회사는 고객에게 필수적인 서비스를 제공하고 고객의 편의를 도모하기
          위하여 아래와 같이 개인정보의 처리를 위탁하고 있습니다. 개인정보의
          처리 위탁 시 위탁업무 계약서 등을 통하여 개인정보보호 관련 법규의
          준수, 개인정보에 관한 비밀유지, 제3자 제공에 대한 금지, 사고시의
          책임부담, 위탁기간, 처리 종료 후의 개인정보의 반환 또는 파기 의무 등을
          규정하고 이를 준수하도록 관리하고 있습니다.
          <br />
          카카오 - 알림톡 발송, 토스 페이먼츠 - 결제 처리
          <br />
          <br />
          <span>제6조 개인정보 주체의 권리 및 행사 방법</span>
          <br />
          1. 고객은 언제든지 등록되어 있는 회원의 개인정보를 열람하거나 정정,
          회원탈퇴를 하실 수 있습니다. 1. 고객센터 또는 유선으로 요청 시 본인
          확인 후 신속하게 처리하여 드립니다. 2. 고객센터 :
          creamoff2021@creamoff.co.kr 3. 전화번호 : 010-4026-5955 회원이
          개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지
          해당 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인 정보를
          제3자에게 이미 제공한 경우에는 정정 처리 결과를 제3자에게 지체 없이
          통지하여 정정이 이루어지도록 조치하겠습니다. 회원의 요청에 의해 해지
          또는 삭제된 개인정보는 회사가 수집하는 개인정보의 보유 및 이용 기간에
          명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록
          처리하고 있습니다. 다만, 관련 법률에 특별한 규정이 있거나 법령상의
          의무를 준수하기 위하여 불가피한 경우와 다른 사람의 생명, 신체를 해할
          우려가 있거나 다른 사람의 재산과 그 밖의 이익을 부당하게 침해할 우려가
          있는 경우에는 해당 요구를 거절할 수 있으며, 관련 사유가 발생할 시,
          지체 없이 알리도록 하겠습니다.
          <br />
          <br />
          <span>제7조 쿠키(Cookie)의 운영 및 활용</span>
          <br />
          회사는 회원의 정보를 수시로 저장하고 찾아내는 '쿠키(cookie)'를
          운영합니다. 쿠키란 홈페이지를 운영하는데 이용되는 서버가 회원의
          브라우저에 보내는 아주 작은 텍스트 파일로서 회원의 컴퓨터 하드디스크에
          저장됩니다. 회사는 다음과 같은 목적으로 쿠키를 사용합니다. 1. 회원과
          비회원의 접속 빈도나 방문 시간 등을 분석하고 이용자의 취향과
          관심분야를 파악하여 타겟(Target) 마케팅 및 서비스 개편 등의 척도로
          활용합니다. 2. 회사가 제공하는 정보와 관심 있게 둘러본 서비스들에 대한
          자취를 추적하여 다음 번 이용 시 개인 맞춤 서비스를 제공하는데
          이용합니다. 3. 회원은 쿠키 설치에 대한 선택권을 가지고 있습니다.
          따라서 회원은 웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를
          허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의
          저장을 거부 할 수 도 있습니다. 1. [도구] 메뉴에서 [인터넷 옵션]을
          선택합니다. 2. [개인정보 탭]을 클릭합니다. 3. 인터넷 영역에 대한
          설정을 상, 하로 조절하여
          "모든쿠키허용-낮음-보통-약간높음-높음-모든쿠키차단" 중 원하는 수준을
          설정하시면 됩니다.회원께서 쿠키 설치를 거부하셨을 경우 회사가 제공하는
          서비스 이용에 어려움이 있을 수 있습니다.
          <br />
          <br />
          <span>제8조 개인정보 관련 의견수렴 및 불만 처리에 관한 사항</span>
          <br />
          1. 회사는 회원의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기
          위하여 아래와 같이 관련 부서 및 개인정보 관리 책임자와 담당자를
          지정하고 있습니다.개인정보 관리 책임자 : 권도혁 2. 개인정보 관리
          담당자 : 권도혁 3. 전화번호 : 010-4026-5955 4. 이메일 :
          creamoff2021@creamoff.co.kr 5. 기타 개인정보에 관한 상담이 필요한
          경우에는 아래 기관에 문의하실 수 있습니다.개인정보침해신고센터
          (www.118.or.kr / 118)정보보호마크인증위원회 (www.eprivacy.or.kr /
          02)550-9531~2)대검찰청 사이버범죄수사단 (cybercid@spo.go.kr /
          02)3480-3571)경찰청 사이버테러대응센터 (www.ctrc.go.kr / 02)393-9112)
          <br />
          <br />
          <span>제9조 개인정보 보호를 위한 기술적/제도적 관리</span>
          <br />
          1. 회사는 회원의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 누출,
          변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적
          대책을 강구하고 있습니다.가. 이용자의 개인정보는 비밀번호에 의해
          보호되며, 파일 및 전송 데이터를 암호화하거나 파일 잠금 기능 (Lock)을
          사용하여 중요한 데이터는 별도의 보안기능을 통해 보호되고 있습니다.나.
          회사는 암호알고리즘을 이용하여 네트워크 상의 개인정보를 안전하게
          전송할 수 있는 보안장치(Secure Socket Layer)를 채택하고 있습니다.다.
          해킹 등에 의해 이용자의 개인정보가 유출되는 것을 방지하기 위해,
          외부로부터의 허가 받지 않은 접근을 차단하기 위한 2중 방화벽을 사용하고
          있으며, 각 서버마다 침입탐지 시스템을 설치하여 24시간 침입을 감시하고
          있습니다. 2. 회사는 개인정보처리 직원을 최소한으로 제한하고 담당직원에
          대한 수시 교육을 통하여 본 방침의 준수를 강조하고 있으며, 이와 관련된
          문제가 발견될 경우 바로 시정조치하고 있습니다. 1. 회사는 회원의 실수나
          기본적인 인터넷의 위험성 때문에 일어나는 일들에 대해 책임을 지지
          않습니다. 회원 개개인이 본인의 개인정보를 보호하기 위해서 자신의
          비밀번호를 적절하게 관리하고 여기에 대한 책임을 져야 합니다. 2. 그 외
          내부관리자의 실수나 기술관리 상의 사고로 인해 개인정보의 상실, 유출,
          변조, 훼손이 유발될 경우 회사는 즉각 이용자에게 사실을 알리고 적절한
          대책과 보상을 강구할 것입니다.
          <br />
          <br />
          <span>제10조 14세 미만 아동의 개인정보 보호</span>
          <br />
          회사는 원칙상 만 14세 미만 아동의 개인정보를 수집하고 있지 않습니다.
          그러나 필요에 의하여 만 14세 이하 아동의 개인정보를 수집해야 할
          경우에는 법률 및 고시를 준수 하도록 하겠습니다.
          <br />
          <br />
          <span>제13조 고지의 의무</span>
          <br />
          1. 정부의 정책 또는 회사의 정책에 따라 본 개인정보 처리방침 내용의
          추가, 삭제 및 수정이 있을 시에는 개정 7일 전에 회사 홈페이지를 통해
          고지할 것입니다. 2. 본 개인정보 처리 방침은 2021년 2월 1일부터
          적용하고, 종전의 개인정보 보호정책은 본 개인정보 처리방침으로
          대체합니다.
          <br />
        </p>
      </div>
    </>
  );
};

export default Privacy;
