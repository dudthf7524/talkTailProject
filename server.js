const express = require("express");
const app = express();
var cors = require("cors");
const path = require("path");
const { sequelize } = require("./models");
const businessRoutes = require("./routes/businessRoutes");
const authRoutes = require("./routes/authRoutes");
const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./passport");
const designerRoutes = require("./routes/designerRoutes");
const petRoutes = require("./routes/petRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const userAuthorityRequestRoutes = require("./routes/userAuthorityRequestRoutes");
const userRoutes = require("./routes/userRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const aligoapi = require("aligoapi");
const router = express.Router();
const customerManagementRoutes = require("./routes/customerManagementRoutes");
const kakaoApiRoutes = require("./routes/kakaoApiRoutes");

const BankDatabase = require("./models/BankDatabase"); // BankDatabase 함수 가져오기

const port = 3060;
app.listen(port, () => {
  console.log(`http://localhost:${port} 에서 서버 실행중`);
});
// 프론트엔드에서 데이터 가져올때
app.use(express.json());
// 데이터베이스 연결
sequelize
  .sync({ force: false })
  .then(async () => {
    await BankDatabase(); // 데이터베이스 초기화 실행
    console.log(`http://localhost:${port} 에서 서버 실행중`);
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error("데이터베이스 연결 실패:", err);
  });

passportConfig();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://www.talktail.store"], // 리액트 앱의 URL 배열로 설정
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Business-Registration-Number",
      "user-id",
    ], // 허용할 헤더
    credentials: true,
  })
);

app.use(passport.initialize());

app.use(
  session({
    secret: "암호화에 쓸 비번", // 세션 암호화 키
    resave: false,
    saveUninitialized: false,
    credentials: true,
    cookie: {
      httpOnly: true, // 클라이언트에서 쿠키를 접근하지 못하도록
      secure: false, // HTTPS에서만 작동하도록 설정
      // secure: true, // HTTPS에서만 작동하도록 설정
      // sameSite: "None", // 크로스 도메인에서 세션 유지
      maxAge: 24 * 60 * 60 * 1000, // 쿠키 만료 시간 설정 (1일)
    },
  })
);

app.use(passport.session());

app.use(express.static(path.join(__dirname, "./build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.get("/business/auth", (req, res) => {
  res.json(req.user);
});

app.get("/user/auth", authMiddleware, (req, res) => {
  res.json(req.user);
});

app.use(router);

app.use("/api", businessRoutes);
app.use("/api", authRoutes);
app.use("/api", designerRoutes);
app.use("/api", petRoutes);
app.use("/api", userAuthorityRequestRoutes);
app.use("/api", userRoutes);
app.use("/api", reservationRoutes);
app.use("/api", customerManagementRoutes);
app.use("/api", kakaoApiRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});


