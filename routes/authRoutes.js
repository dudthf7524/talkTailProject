const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const { findOrCreateUser } = require("../database/userDatabase"); // 서비스 파일 경로
const authMiddleware = require("../middleware/authMiddleware");
dotenv.config();

const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

// 인가 코드 저장을 위한 변수
let kakaoAuthCodes = new Set(); // 카카오 간편로그인 인가 코드 저장용 Set
let naverAuthCodes = new Set(); // 네이버 간편로그인 인가 코드 저장용 Set
let googleAuthCodes = new Set(); // 구글 간편로그인 인가 코드 저장용 Set

// 클라이언트에게 jwt 토큰을 전달하는 함수
const sendTokenResponse = (user, res) => {
  const payload = {
    user: {
      id: user.platform_id,
      platform: user.platform,
      // 필요한 경우 추가 필드를 payload에 포함할 수 있다.
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "4h" }, // 토큰 만료 시간 설정
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
};

router.get("/auth/kakao", async (req, res) => {
  let code; // 코드 변수를 미리 선언

  try {
    code = req.query.code;
    console.log(code);
    if (!code) {
      return res.status(400).json({ message: "Authorization code not found." });
    }

    // 인가 코드가 이미 사용되었는지 확인
    if (kakaoAuthCodes.has(code)) {
      return res
        .status(400)
        .json({ message: "Authorization code already used." });
    }
    console.log(process.env.KAKAO_CLIENT_ID);
    console.log(process.env.KAKAO_REDIRECT_URI);
    kakaoAuthCodes.add(code); // 인가 코드 저장
    const tokenRequest = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_CLIENT_ID,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
        code: code,
      },
    });
    console.log(tokenRequest);
    console.log("aaaaaaaaaaaaaaaa");
    const accessToken = tokenRequest.data.access_token;

    const userInfoRequest = await axios({
      method: "GET",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userInfo = userInfoRequest.data;

    const user = await findOrCreateUser({
      platform_id: userInfo.id.toString(),
      platform: "kakao",
    });

    sendTokenResponse(user, res);
  } catch (error) {
    console.error(
      "카카오 간편로그인 오류:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ message: "카카오 간편로그인 실패" });
  } finally {
    // 인가 코드 사용 완료 후 메모리에서 삭제
    if (code) {
      kakaoAuthCodes.delete(code);
    }
  }
});

router.get("/auth/naver", async (req, res) => {
  let code; // 코드 변수를 미리 선언
  console.log("aaa : " + req.query.code);
  console.log("dfdsafedsafeefdsaf");
  try {
    code = req.query.code;

    if (!code) {
      return res.status(400).json({ message: "Authorization code not found." });
    }

    // 인가 코드가 이미 사용되었는지 확인
    if (naverAuthCodes.has(code)) {
      return res
        .status(400)
        .json({ message: "Authorization code already used." });
    }

    naverAuthCodes.add(code); // 인가 코드 저장

    console.log(process.env.NAVER_CLIENT_ID);
    console.log(process.env.NAVER_CLIENT_SECRET);
    console.log(process.env.NAVER_REDIRECT_URI);
    const tokenRequest = await axios({
      method: "POST",
      url: "https://nid.naver.com/oauth2.0/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        grant_type: "authorization_code",
        client_id: process.env.NAVER_CLIENT_ID,
        client_secret: process.env.NAVER_CLIENT_SECRET,
        redirect_uri: process.env.NAVER_REDIRECT_URI,
        code: code,
      },
    });

    const accessToken = tokenRequest.data.access_token;
    console.log(accessToken);
    console.log("여기까지");
    const userInfoRequest = await axios({
      method: "GET",
      url: "https://openapi.naver.com/v1/nid/me",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(userInfoRequest);
    console.log("여기까지");
    const userInfo = userInfoRequest.data.response;

    const user = await findOrCreateUser({
      platform_id: userInfo.id.toString(),
      user_email: userInfo.email || "", // 이메일 정보가 없으면 빈 문자열로 설정
      user_phone: userInfo.mobile || "", // 전화번호 정보가 없으면 빈 문자열로 설정
      user_name: userInfo.name,
      user_nickname: userInfo.nickname,
      platform: "naver",
    });

    sendTokenResponse(user, res);
  } catch (error) {
    console.log("Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.error(
      "네이버 간편로그인 오류:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ message: "네이버 간편로그인 실패" });
  } finally {
    // 인가 코드 사용 완료 후 메모리에서 삭제
    if (code) {
      naverAuthCodes.delete(code);
    }
  }
});

router.get("/auth/google", async (req, res) => {
  let code;

  try {
    code = req.query.code;

    if (!code) {
      return res.status(400).json({ message: "Authorization code not found." });
    }

    if (googleAuthCodes.has(code)) {
      return res
        .status(400)
        .json({ message: "Authorization code already used." });
    }

    googleAuthCodes.add(code);

    const tokenRequest = await axios({
      method: "POST",
      url: "https://oauth2.googleapis.com/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
        code: code,
      },
    });

    const accessToken = tokenRequest.data.access_token;

    const userInfoRequest = await axios({
      method: "GET",
      url: "https://www.googleapis.com/oauth2/v1/userinfo",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userInfo = userInfoRequest.data;

    const user = await findOrCreateUser({
      platform_id: userInfo.id.toString(),
      user_email: userInfo.email || "",
      user_phone: userInfo.mobile || "",
      user_name: userInfo.name,
      user_nickname: userInfo.name,
      platform: "google",
    });

    sendTokenResponse(user, res);
  } catch (error) {
    console.error(
      "Google login error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ message: "Google login failed." });
  } finally {
    if (code) {
      googleAuthCodes.delete(code);
    }
  }
});

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "보호된 프로필 라우트", user: req.user });
});

router.get("/verify-token", authMiddleware, (req, res) => {
  res.status(200).json({ valid: true }); // 토큰이 유효하면 200 상태와 함께 응답
});

module.exports = router;
