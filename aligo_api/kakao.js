const aligoapi = require('aligoapi');
const { userAuthority } = require('../database/userAuthorityRequestDatabase');
const { result } = require('lodash');
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
const alimtalkSend = async (req, res) => {
   
    req.body.testMode = 'Y';

    console.log(req.body)
    console.log(AuthData)
   

    return aligoapi.alimtalkSend(req, AuthData)
        .then((r) => {
            console.log('알림톡 전송 성공:', r); // 성공한 응답을 콘솔에 출력
            // res.send(r)
            return "success";
        })
        .catch((e) => {
            console.error('알림톡 전송 실패:', e); // 에러 메시지를 콘솔에 출력
            // res.send(e)
            return "fail";
        })

   
}
module.exports = {
    alimtalkSend,
}

