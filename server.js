const express = require('express')
const app = express()
var cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');
const businessRoutes = require('./routes/businessRoutes');
const authRoutes = require('./routes/authRoutes');
const passport = require('passport');
const session = require('express-session');
const passportConfig = require('./passport');
const designerRoutes = require('./routes/designerRoutes');
const petRoutes = require('./routes/petRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const userAuthorityRequestRoutes = require('./routes/userAuthorityRequestRoutes');
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const aligoapi = require('aligoapi');
const router = express.Router();
const customerManagementRoutes = require('./routes/customerManagementRoutes');


const kakaoApiRoutes = require('./routes/kakaoApiRoutes');
app.listen(8383, () => {
  console.log('http://localhost:8383 에서 서버 실행중')
})
// 프론트엔드에서 데이터 가져올때 
app.use(express.json());
// 데이터베이스 연결
// sequelize.sync({ force: false })
//   .then(() => {
//     console.log('데이터베이스 연결 성공');
//   })
//   .catch((err) => {
//     console.error('데이터베이스 연결 실패:', err);
//   });

passportConfig();

app.use(cors({
  origin: 'http://localhost:3000',  // 리액트 앱의 URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Business-Registration-Number', 'user-id'], // 허용할 헤더
  credentials: true,
}));

app.use(passport.initialize());
app.use(session({
  secret: '암호화에 쓸 비번', // 세션 암호화 키

  resave: false,
  saveUninitialized: false,
  credentials: true,
  cookie: {
    httpOnly: true, // 클라이언트에서 쿠키를 접근하지 못하도록
    secure: false, // HTTPS 환경에서만 true
    // 크로스 도메인에서 쿠키를 전송하기 위한 설정
    maxAge: 24 * 60 * 60 * 1000,  // 쿠키 만료 시간 설정 (1일)
  }
}));

app.use(passport.session());

app.use(express.static(path.join(__dirname, './build')));

app.get('/', (req, res) => {

  res.sendFile(path.join(__dirname, './build/index.html'));
})

app.get('/business/auth', (req, res) => {
  console.log('로그인된 정보')
  console.log(req.user)
  console.log('로그인된 정보')
  res.json(req.user)
});

app.get('/user/auth', authMiddleware, (req, res) => {
  console.log('로그인된 정보')
  console.log(req.user)
  console.log('로그인된 정보')
  res.json(req.user)
});




const alimtalkSend = async (req, res) => {
  // console.log('알림톡 전송 요청받음');
  // console.log(req.user)
  console.log(req.body)
  const AuthData = {
    apikey: 'rlo7j8ysfthvm4o6v2nikggue0rxboji',
    userid: 'creamoff2021',
  
    senderkey: '89df6266d96c0663c9263f3ff08986bcde7e4124',
    tpl_code: 'TW_9032',
    sender: '010-4026-5955',
    receiver_1: '010-7751-4068',
    subject_1: '예약접수',
    recvname_1: '최영솔',
    // message_1: `새로운 예약이 등록되었습니다.\n\n고객명: ${req.body.designerName}\n전화번호: ${req.body.phone}\n스타일: ${req.body.style}\n예약시간: ${req.body.reservationDesiredTime}\n\n`,

  };
  // 클라이언트에서 받은 요청 데이터를 body로 설정
  const requestData = {
    senderkey: '89df6266d96c0663c9263f3ff08986bcde7e4124',
    tpl_code: 'TW_9032',
    sender: '010-4026-5955',
    receiver_1: '010-7751-4068',
    recvname_1: '최영솔',
    message_1: {
      고객명: '홍길동',
      고객전화번호: '010-1234-5678',
      스타일: '커트',
      예약시간: '2024-12-25 14:00',
    },

    reserved_1: '', // 예약 전송 시간 (필요 시 설정)
    receiver_name_1: '홍길동',
    headers: {
      'Content-Type': 'application/json',

    },

    buttons: JSON.stringify([{
      ordering: '1',
      name: '예약 상세 보기',
      linkType: 'WL',
      linkMo: 'https://naver.com',
      linkPc: 'https://naver.com',
      linkIos: '',
      linkAnd: ''
    }])
  
  };


  // console.log(req.body)
  // console.log('알림톡 전송 요청받음');
  // console.log(requestData);
  // console.log(AuthData);
  aligoapi.templateList(requestData, AuthData)
    .then((r) => {
      console.log('알림톡 전송 성공:', r.list[0]); // 성공한 응답을 콘솔에 출력
      res.send(r)
    })
    .catch((e) => {
      console.error('알림톡 전송 실패:', e); // 에러 메시지를 콘솔에 출력
      res.send(e)
    })
  // 알리고 API로 알림톡 발송
  // aligoapi.alimtalkSend(requestData, AuthData, )
  // .then((r) => {
  //   console.log('알림톡 전송 성공:', r); // 성공한 응답을 콘솔에 출력
  //   res.send(r)
  // })
  // .catch((e) => {
  //   // 실패 응답 처리
  //   console.error('알림톡 전송 실패:', e); // 에러 메시지를 콘솔에 출력
  //   if (e.response) {
  //     console.error('응답 내용:', e.response); // 알리고 API에서 반환된 에러 응답도 출력
  //   }
  //   res.send(e); // 에러 응답을 클라이언트로 전송
  // });
};

// /api/beauty/reservation 경로로 POST 요청이 오면 alimtalkSend 함수 실행
// router.post('/api/beauty/reservation', alimtalkSend);

// Express 서버 설정
app.use(router);

app.use('/api', businessRoutes)
app.use('/api', authRoutes)
app.use('/api', designerRoutes)
app.use('/api', petRoutes)
app.use('/api', userAuthorityRequestRoutes)
app.use('/api', userRoutes)
app.use('/api', reservationRoutes)
app.use('/api', customerManagementRoutes)
app.use('/api', kakaoApiRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});