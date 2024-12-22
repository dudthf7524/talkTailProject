const aligoapi = require('aligoapi');
const { userAuthority } = require('../database/userAuthorityRequestDatabase');
// 해당 예제는 npm에서도 확인하실 수 있습니다
// npm i aligoapi
// https://www.npmjs.com/package/aligoapi

var AuthData = {
    apikey: 'rlo7j8ysfthvm4o6v2nikggue0rxboji',
    // 이곳에 발급받으신 api key를 입력하세요
    userid: 'creamoff2021',
    // 이곳에 userid를 입력하세요
    
}
// 인증용 데이터는 모든 API 호출시 필수값입니다.

const profileAuth = (req, res) => {
    // 플러스친구 - 인증요청

    // req.body = {
    /*** 필수값입니다 ***/
    // plusid: 플러스친구 아이디(@포함)
    // phonenumber: 관리자 핸드폰 번호
    /*** 필수값입니다 ***/
    // }
    // req.body 요청값 예시입니다.
    // phonenumber로 인증번호가 발송됩니다

    aligoapi.profileAuth(req, AuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const profileCategory = (req, res) => {
    // 플러스친구 - 카테고리 조회

    aligoapi.profileCategory(req, AuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const profileAdd = (req, res) => {
    // 플러스친구 - 친구등록 심사요청

    // req.body = {
    /*** 필수값입니다 ***/
    // plusid: 플러스친구 아이디(@포함)
    // authnum: 인증번호
    // phonenumber: 관리자 핸드폰 번호
    // categorycode: 카테고리 코드
    /*** 필수값입니다 ***/
    // }
    // req.body 요청값 예시입니다.
    // 플러스친구 - 인증요청의 phonenumber로 발송된 인증번호를 authnum값으로 보내세요
    // 플러스친구 - 카테고리 조회의 thirdBusinessType 값을 categorycode값으로 보내세요

    aligoapi.profileAdd(req, AuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const friendList = (req, res) => {
    // 플러스친구 - 등록된 플러스친구 리스트

    // req.body = {
    // plusid: 플러스친구 아이디(@ 포함)
    // senderkey: 발신프로필 키
    // }
    // req.body 요청값 예시입니다.

    aligoapi.friendList(req, AuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const templateList = (req, res) => {
    // 템플릿관리 - 템플릿 리스트

    // req.body = {
    /*** 필수값입니다 ***/
    // senderkey: 발신프로필 키
    /*** 필수값입니다 ***/
    // tpl_code: 템플릿 코드
    // }
    // req.body 요청값 예시입니다.

    aligoapi.templateList(req, AuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const templateAdd = (req, res) => {
    // 템플릿관리 - 템플릿 등록

    // req.body = {
    /*** 필수값입니다 ***/
    // senderkey: 발신프로필 키
    // tpl_name: 템플릿 이름
    // tpl_content: 템플릿 내용 // (최대 1,000자)
    /*** 필수값입니다 ***/
    // tpl_button: 템플릿 버튼
    // }
    // req.body 요청값 예시입니다.

    aligoapi.templateAdd(req, AuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const templateModify = (req, res) => {
    // 템플릿관리 - 템플릿 수정

    // req.body = {
    /*** 필수값입니다 ***/
    // senderkey: 발신프로필 키
    // tpl_code: 템플릿 코드
    // tpl_name: 템플릿 이름
    // tpl_content: 템플릿 내용 // (최대 1,000자)
    /*** 필수값입니다 ***/
    // tpl_button: 템플릿 버튼
    // }
    // req.body 요청값 예시입니다.

    aligoapi.templateModify(req, AuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const templateDel = (req, res) => {
    // 템플릿관리 - 템플릿 삭제

    // req.body = {
    /*** 필수값입니다 ***/
    // senderkey: 발신프로필 키
    // tpl_code: 템플릿 코드
    /*** 필수값입니다 ***/
    // }
    // req.body 요청값 예시입니다.

    aligoapi.templateDel(req, AuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const templateRequest = (req, res) => {
    // 템플릿관리 - 템플릿 검수요청

    // req.body = {
    /*** 필수값입니다 ***/
    // senderkey: 발신프로필 키
    // tpl_code: 템플릿 코드
    /*** 필수값입니다 ***/
    // }
    // req.body 요청값 예시입니다.

    aligoapi.templateRequest(req, AuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const alimtalkSend = (req, res) => {
    console.log('카카오 api 처리코드')
    console.log(req.body)
    const reservationDesiredTime = req.body.reservationDesiredTime;
    console.log('카카오 api 처리코드')
    req.body = {}
    req.body.username = "최영솔"
    req.body.userphone = "010-7751-4068"
    req.body.style = "전체미용"
    req.body.reservationDesiredTime = reservationDesiredTime;



    req.body.senderkey = '89df6266d96c0663c9263f3ff08986bcde7e4124';
    req.body.tpl_code = 'TW_9032',
    req.body.sender = '010-4026-5955',
    req.body.receiver_1 = '010-7751-4068',
    req.body.recvname_1 = '최영솔',
    req.body.message_1 = `새로운 예약이 등록되었습니다.\n\n고객명: ${req.body.username}\n전화번호: ${req.body.userphone}\n스타일: ${req.body.style}\n예약시간: ${req.body.reservationDesiredTime}\n\n`,


    // req.body.button_1 =  JSON.stringify( {
    //     "button": [
    //         {
    //             name: "예약 상세 보기",
    //             linkType: "WL",
    //             linkTypeName: "웹링크",
    //             linkMo: 'https://naver.com',
    //             linkPc: 'https://naver.com',
    //         }
    //     ]
    // });
    
    // button_1: {
    //     "button": [{
    //     "name": “알리고 홈페이지”,
    //     "linkType": "WL",
    //     "linkTypeName": "웹링크",
    //     "linkPc": "https://smartsms.aligo.in/",
    //     "linkMo" : “https://smartsms.aligo.in/”
    //     }]
    //     }

    // req.body.testMode = 'Y';
 

    console.log(req.body)
    console.log(AuthData)
    // 알림톡 전송

    // req.body = {
    /*** 필수값입니다 ***/
    // senderkey: 발신프로필 키
    // tpl_code: 템플릿 코드
    // sender: 발신자 연락처
    // receiver_1: 수신자 연락처
    // subject_1: 알림톡 제목
    // message_1: 알림톡 내용
    /*** 필수값입니다 ***/
    // senddate: 예약일 // YYYYMMDDHHMMSS
    // recvname: 수신자 이름
    // button: 버튼 정보 // JSON string
    // failover: 실패시 대체문자 전송기능 // Y or N
    // fsubject: 실패시 대체문자 제목
    // fmessage: 실패시 대체문자 내용
    // }
    // req.body 요청값 예시입니다.
    // _로 넘버링된 최대 500개의 receiver, subject, message, button, fsubject, fmessage 값을 보내실 수 있습니다
    // failover값이 Y일때 fsubject와 fmessage값은 필수입니다.

    // aligoapi.templateList(req, AuthData)
    //     .then((r) => {
    //         console.log('알림톡 전송 성공:', r.list[0].buttons); // 성공한 응답을 콘솔에 출력
    //         res.send(r)
    //     })
    //     .catch((e) => {
    //         console.error('알림톡 전송 실패:', e); // 에러 메시지를 콘솔에 출력
    //         res.send(e)
    //     })

    aligoapi.alimtalkSend(req, AuthData)
        .then((r) => {
            console.log('알림톡 전송 성공:', r); // 성공한 응답을 콘솔에 출력
            res.send(r)
        })
        .catch((e) => {
            console.error('알림톡 전송 실패:', e); // 에러 메시지를 콘솔에 출력
            res.send(e)
        })
}

const historyList = (req, res) => {
    // 전송결과보기

    // req.body = {
    // page: 페이지번호 // 기본1
    // limit: 페이지당 출력 갯수 // (기본 50) 최대 500
    // start_date: 조회시작일자 // 기본 최근일자 // YYYYMMDD
    // enddate: 조회마감일자 // YYYYMMDD
    // }
    // req.body 요청값 예시입니다.

    aligoapi.historyList(req, AuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const historyDetail = (req, res) => {
    // 전송결과보기 상세

    // req.body = {
    /*** 필수값입니다 ***/
    // mid: 메세지 고유ID
    /*** 필수값입니다 ***/
    // page: 페이지번호 // 기본1
    // limit: 페이지당 출력 갯수 // (기본 50) 최대 500
    // start_date: 조회시작일자 // 기본 최근일자 // YYYYMMDD
    // enddate: 조회마감일자 // YYYYMMDD
    // }
    // req.body 요청값 예시입니다.

    aligoapi.historyDetail(req, AuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const kakaoRemain = (req, res) => {
    // 발송가능건수

    aligoapi.kakaoRemain(req, AuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const kakaoCancel = (req, res) => {
    // 예약취소

    // req.body = {
    /*** 필수값입니다 ***/
    // mid: 메세지 고유ID
    /*** 필수값입니다 ***/
    // }
    // req.body 요청값 예시입니다.

    aligoapi.kakaoCancel(req, AuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

module.exports = {
    friendList,
    profileAuth,
    profileCategory,
    profileAdd,
    templateList,
    templateAdd,
    templateModify,
    templateDel,
    templateRequest,
    alimtalkSend,
    historyList,
    historyDetail,
    kakaoRemain,
    kakaoCancel

}

