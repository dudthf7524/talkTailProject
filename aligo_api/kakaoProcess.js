const kakao = require("./kakao");

async function reservationReception(req, res) {
  console.log(req.body);

  req.body.senderkey = "8afab32670c1a79eaf3172351b11ed28002405d0";
  (req.body.tpl_code = "TY_2163"),
    (req.body.sender = "010-4026-5955"),
    (req.body.message_1 = `새로운 예약이 등록되었습니다.\n\n고객명 : ${req.body.user_name}\n전화번호: ${req.body.user_phone}\n예약일시 : ${req.body.start_time}\n\n`),
    (req.body.button_1 = JSON.stringify({
      button: [
        {
          name: "talktail 바로가기",
          linkType: "WL",
          linkTypeName: "웹링크",
          linkMo: "https://www.talktail.store/business/reservation/management",
          linkPc: "https://www.talktail.store/business/reservation/management",
        },
      ],
    }));
  console.log(req.body);
  try {
    const result = await kakao.alimtalkSend(req, res);
    console.log("알림톡 전송 결과:", result);
    return result;
  } catch (error) {
    throw new Error("Failed to reservationReception: " + error.message);
  }
}

async function authorityRequest(req, res) {
  console.log(req.body);
  req.body.senderkey = "8afab32670c1a79eaf3172351b11ed28002405d0";
  (req.body.tpl_code = "TY_2171"),
    (req.body.sender = "010-4026-5955"),
    (req.body.message_1 = `새로운 승인 요청이 왔습니다.\n\n고객명 : ${req.body.user_name}\n전화번호 : ${req.body.user_phone}`),
    (req.body.button_1 = JSON.stringify({
      button: [
        {
          name: "talktail 바로가기",
          linkType: "WL",
          linkTypeName: "웹링크",
          linkMo: "https://www.talktail.store/business/authority/management",
          linkPc: "https://www.talktail.store/business/authority/management",
        },
      ],
    }));
  console.log(req.body);

  try {
    const result = await kakao.alimtalkSend(req, res);
    console.log("알림톡 전송 결과:", result);
    return result;
  } catch (error) {
    throw new Error("Failed to reservationReception: " + error.message);
  }
}

async function authorityYesOrNo(req, res) {
  console.log(req.body);
  req.body.senderkey = "8afab32670c1a79eaf3172351b11ed28002405d0";
  (req.body.tpl_code = "TY_2183"),
    (req.body.sender = "010-4026-5955"),
    (req.body.message_1 = `승인 여부 안내\n\n${req.body.business_name}이(가) ${req.body.authority_state}하였습니다.\n전화번호: ${req.body.business_phone}`),
    (req.body.button_1 = JSON.stringify({
      button: [
        {
          name: "talktail 바로가기",
          linkType: "WL",
          linkTypeName: "웹링크",
          linkMo: "https://www.talktail.store/authority/management",
          linkPc: "https://www.talktail.store/authority/management",
        },
      ],
    }));
  console.log(req.body);
  try {
    const result = await kakao.alimtalkSend(req, res);
    console.log("알림톡 전송 결과:", result);
    return result;
  } catch (error) {
    throw new Error("Failed to reservationReception: " + error.message);
  }
}

async function reservationComplete(req, res) {
  console.log(req.body);
  req.body.senderkey = "8afab32670c1a79eaf3172351b11ed28002405d0";
  (req.body.tpl_code = "TY_2186"),
    (req.body.sender = "010-4026-5955"),
    (req.body.message_1 = `예약이 완료되었습니다.\n\n가게명 : ${req.body.business_name}\n전화번호 : ${req.body.business_phone}\n예약일시 : ${req.body.reservationDate}\n이용가격 : ${req.body.beauty_price}`),
    (req.body.button_1 = JSON.stringify({
      button: [
        {
          name: "talktail 바로가기",
          linkType: "WL",
          linkTypeName: "웹링크",
          linkMo: "https://www.talktail.store/reservation/",
          linkPc: "https://www.talktail.store/reservation/",
        },
      ],
    }));

  try {
    const result = await kakao.alimtalkSend(req, res);
    console.log("알림톡 전송 결과:", result);
    return result;
  } catch (error) {
    throw new Error("Failed to reservationReception: " + error.message);
  }
}

async function reservationReject(req, res) {
  req.body.senderkey = "8afab32670c1a79eaf3172351b11ed28002405d0";
  (req.body.tpl_code = "TY_2188"),
    (req.body.sender = "010-4026-5955"),
    (req.body.message_1 = `예약이 거절되었습니다\n\n가게명 : ${req.body.business_name}\n전화번호 : ${req.body.business_phone}\n거절사유 : ${req.body.rejectComment}`),
    (req.body.button_1 = JSON.stringify({
      button: [
        {
          name: "talktail 바로가기",
          linkType: "WL",
          linkTypeName: "웹링크",
          linkMo: "https://www.talktail.store/reservation/",
          linkPc: "https://www.talktail.store/reservation/",
        },
      ],
    }));

  try {
    const result = await kakao.alimtalkSend(req, res);
    console.log("알림톡 전송 결과:", result);
    return result;
  } catch (error) {
    throw new Error("Failed to reservationReception: " + error.message);
  }
}

async function pickup(req, res) {
  console.log(req.body);

  req.body.senderkey = "8afab32670c1a79eaf3172351b11ed28002405d0";
  (req.body.tpl_code = "TY_2192"),
    (req.body.sender = "010-4026-5955"),
    (req.body.message_1 = `:안녕하세요!\n${req.body.petName}보호자님~ ${req.body.petName}의 미용이 ${req.body.selectMinute}분 후에 마무리될 예정입니다.\n\n우리 아이가 너무 오래 기다리지 않도록, ${req.body.completeTime}까지 픽업 부탁드립니다!\n\n혹시 시간 내 픽업이 어려우신 경우 연락 부탁드리며, 예정된 픽업 시간 이후 추가 요금이 발생할 수 있는 점 양해 부탁드립니다.\n\n감사합니다.`);

  try {
    const result = await kakao.alimtalkSend(req, res);
    console.log("알림톡 전송 결과:", result);
    return result;
  } catch (error) {
    throw new Error("Failed to reservationReception: " + error.message);
  }
}
module.exports = {
  reservationReception,
  authorityRequest,
  authorityYesOrNo,
  reservationComplete,
  reservationReject,
  pickup,
};
