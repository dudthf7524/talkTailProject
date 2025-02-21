const express = require("express");
const router = express.Router();

router.post("/masterLogin", async (req, res, next) => {
  console.log(req.body)
  // passport.authenticate("local", (error, user, info) => {
  //   if (error)
  //     return res
  //       .status(500)
  //       .json({ message: "서버 오류가 발생했습니다.", error });
  //   if (!user) return res.status(401).json({ message: info.message });

  //   req.login(user, (err) => {
  //     if (err) return next(err);

  //     // 세션 상태 확인

  //     return res.status(200).json({
  //       message: "로그인 성공",
  //       user: {
  //         id: user.login_id,
  //         name: user.business_owner_name,
  //       },
  //     });
  //   });
  // })(req, res, next);
});

router.get("/masterLogout", (req, res) => {
  console.log(req.session);
  console.log("로그아웃 요청 도착");
  console.log("현재 로그인 상태:", req.isAuthenticated());

  if (!req.isAuthenticated()) {
    console.log("로그인 상태가 아닙니다.");
    return res.status(400).json({ message: "로그인 상태가 아닙니다." });
  }

  req.logout((err) => {
    if (err) {
      console.error("로그아웃 오류:", err);
      return res.status(500).json({ message: "로그아웃 실패", error: err });
    }

    req.session.destroy(() => {
      console.log("세션 삭제 완료");
      res.clearCookie("connect.sid");
      console.log("쿠키 삭제 완료");
      return res.status(200).json({ message: "로그아웃 성공" });
    });
  });
});

module.exports = router;
