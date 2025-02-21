const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { Master } = require("../../models");

router.post("/masterLogin", async (req, res, next) => {
  console.log(req.body)
  const login_id = req.body.username;
  const password = await bcrypt.hash(req.body.password, 10);
  console.log(password)
  const master = await Master.findOne({
    where: { login_id: login_id },
    raw: true,
  });
  if(!master){

    return res.json("아이디")
  }
  console.log(master)


  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    master.login_password
  );

  console.log(isPasswordValid)

  if(!isPasswordValid){
    return res.json("비밀번호");
  }

  if (isPasswordValid) {
    req.session.user = { login_id };
    return res.json("sucess");
  }
});

router.get("/masterLogout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.json({ message: "Logged out successfully" });
  });

  // console.log(req.session);
  // console.log("로그아웃 요청 도착");
  // console.log("현재 로그인 상태:", req.isAuthenticated());

  // if (!req.isAuthenticated()) {
  //   console.log("로그인 상태가 아닙니다.");
  //   return res.status(400).json({ message: "로그인 상태가 아닙니다." });
  // }

  // req.logout((err) => {
  //   if (err) {
  //     console.error("로그아웃 오류:", err);
  //     return res.status(500).json({ message: "로그아웃 실패", error: err });
  //   }

  //   req.session.destroy(() => {
  //     console.log("세션 삭제 완료");
  //     res.clearCookie("connect.sid");
  //     console.log("쿠키 삭제 완료");
  //     return res.status(200).json({ message: "로그아웃 성공" });
  //   });
  // });
});

module.exports = router;
