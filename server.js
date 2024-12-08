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
// 프론트엔드에서 데이터 가져올때 
app.use(express.json());
// 데이터베이스 연결
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error('데이터베이스 연결 실패:', err);
  });

passportConfig();
app.listen(8383, () => {
    console.log('http://localhost:8383 에서 서버 실행중')
})
app.use(cors({
    origin: 'http://localhost:3000',  // 리액트 앱의 URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
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

app.get('/user/auth', (req, res) => {
  console.log('로그인된 정보')
  console.log(req.user)
  console.log('로그인된 정보')
  res.json(req.user)
});



app.use('/api', businessRoutes)
app.use('/api', authRoutes)
app.use('/api', designerRoutes)
app.use('/api', petRoutes)