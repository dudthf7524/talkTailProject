const passport = require("passport");
const local = require("./local");


const { Business } = require("../models");

module.exports = async () => {
  try {
    await passport.serializeUser((user, done) => {
      done(null, { id: user.login_id, registrationNumber: user.business_registration_number });
  
    });
    await passport.deserializeUser(async (data, done) => {
      try {
        const user = await Business.findOne({ where: { login_id: data.id } });
  
        if (!user) {
          console.log("User not found!");
          return done(null, false); // 사용자를 찾지 못했을 때, false 반환 (세션 종료)
        }
        user.registrationNumber = data.registrationNumber;
        done(null, user);
      } catch (error) {
        console.error(error);
        done(error);
      }
    });
  
    local();
  } catch(e) {

  }
 
};

passport._debug = true;