
const kakao = require('./kakao');

async function reservationReception(req, res) {
   
    req.body.senderkey ='89df6266d96c0663c9263f3ff08986bcde7e4124';
    req.body.tpl_code = 'TX_6722',
    req.body.sender = '010-4026-5955',
    req.body.message_1 = `새로운 예약이 등록되었습니다.\n\n고객명 : ${req.body.user_name}\n전화번호: ${req.body.user_phone}\n스타일: ${req.body.beauty_style}\n예약시간: ${req.body.start_time}\n\n`,
    req.body.button_1 =  JSON.stringify( {
        "button": [
            {
                name: "talktail 바로가기",
                linkType: "WL",
                linkTypeName: "웹링크",
                linkMo: 'http://www.talktail.store/business/reservation/management',
                linkPc: 'http://www.talktail.store/business/reservation/management',
            }
        ]
    });
    console.log(req.body)
    try {
        const result = await kakao.alimtalkSend(req, res);
        console.log('알림톡 전송 결과:', result);
        return result;
    } catch (error) {
        throw new Error('Failed to reservationReception: ' + error.message);
    }
}

async function authorityRequest(req, res) {
    console.log(req.body)
    req.body.senderkey ='89df6266d96c0663c9263f3ff08986bcde7e4124';
    req.body.tpl_code = 'TX_5955',
    req.body.sender = '010-4026-5955',
    req.body.message_1 = `${req.body.user_name}이 권한을 요청했습니다\n\n고객 전화번호 : ${req.body.user_phone}`,
    req.body.button_1 =  JSON.stringify( {
        "button": [
            {
                name: "talktail바로가기",
                linkType: "WL",
                linkTypeName: "웹링크",
                linkMo: 'http://www.talktail.store/business/authority/management',
                linkPc: 'http://www.talktail.store/business/authority/management',
            }
        ]
    });
    console.log(req.body)

    try {
        const result = await kakao.alimtalkSend(req, res);
        console.log('알림톡 전송 결과:', result);
        return result;
    } catch (error) {
        throw new Error('Failed to reservationReception: ' + error.message);
    }
}

async function authorityYesOrNo(req, res) {
    console.log(req.body)
    req.body.senderkey ='89df6266d96c0663c9263f3ff08986bcde7e4124';
    req.body.tpl_code = 'TX_5969',
    req.body.sender = '010-4026-5955',
    req.body.message_1 = `권한 요청 결과\n\n${req.body.business_name}이(가)${req.body.authority_state}하였습니다.\n\n매장 전화번호: ${req.body.business_phone}`,
    req.body.button_1 =  JSON.stringify( {
        "button": [
            {
                name: "talktail 바로가기",
                linkType: "WL",
                linkTypeName: "웹링크",
                linkMo: 'http://www.talktail.store/authority/management',
                linkPc: 'http://www.talktail.store/authority/management',
            }
        ]
    });
    console.log(req.body)
    try {
        const result = await kakao.alimtalkSend(req, res);
        console.log('알림톡 전송 결과:', result);
        return result;
    } catch (error) {
        throw new Error('Failed to reservationReception: ' + error.message);
    }
}

async function reservationComplete(req, res) {
    console.log(req.body)
    req.body.senderkey ='89df6266d96c0663c9263f3ff08986bcde7e4124';
    req.body.tpl_code = 'TX_8835',
    req.body.sender = '010-4026-5955',
    req.body.message_1 = `예약이 완료되었습니다.\n\n업체명 : ${req.body.business_name}\n매장 전화번호 : ${req.body.business_phone}\n예약일자 : ${req.body.reservationDate}\n미용가격 : ${req.body.beauty_price}`,
    req.body.button_1 =  JSON.stringify( {
        "button": [
            {
                name: "talktail 바로가기",
                linkType: "WL",
                linkTypeName: "웹링크",
                linkMo: 'http://www.talktail.store/reservation/',
                linkPc: 'http://www.talktail.store/reservation/',
            }
        ]
    });

    console.log(req.body)

    try {
        const result = await kakao.alimtalkSend(req, res);
        console.log('알림톡 전송 결과:', result);
        return result;
    } catch (error) {
        throw new Error('Failed to reservationReception: ' + error.message);
    }
}


async function reservationReject(req, res) {

    req.body.senderkey ='89df6266d96c0663c9263f3ff08986bcde7e4124';
    req.body.tpl_code = 'TX_6715',
    req.body.sender = '010-4026-5955',
    req.body.message_1 = `예약이 거절되었습니다\n\n업체명 : ${req.body.business_name}\n매장 전화번호 : ${req.body.business_phone}\n거절사유 : ${req.body.rejectComment}`,
    req.body.button_1 =  JSON.stringify( {
        "button": [
            {
                name: "talktail 바로가기",
                linkType: "WL",
                linkTypeName: "웹링크",
                linkMo: 'http://www.talktail.store/reservation/',
                linkPc: 'http://www.talktail.store/reservation/',
            }
        ]
    });
    
    try {
        const result = await kakao.alimtalkSend(req, res);
        console.log('알림톡 전송 결과:', result);
        return result;
    } catch (error) {
        throw new Error('Failed to reservationReception: ' + error.message);
    }
}

module.exports = {
    reservationReception,
    authorityRequest,
    authorityYesOrNo,
    reservationComplete,
    reservationReject,
};