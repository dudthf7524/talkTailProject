const authMiddlewareSession = (req, res, next) => {
  if (!req.session.passport) {
    // return res.status(401).json({ message: '세션이 만료되었습니다. 다시 로그인하세요.' });
    return res.json("common");
  }
  next();
};

module.exports = authMiddlewareSession;
