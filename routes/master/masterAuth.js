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
});

module.exports = router;
