const passport = require("passport");
const local = require("./local");


const { Business } = require("../models");

module.exports = async () => {
  try {
    await passport.serializeUser((user, done) => {
      console.log("user1 : ", user.login_id);
      done(null, user.login_id);
  
    });
  
    await passport.deserializeUser(async (id, done) => {
      console.log("deserializeUser : ", id);
      console.log("user123232323 : ", id);
      // try {
          
      //     process.nextTick(() => {
      //         return done(null, user);
      //     });
      // } catch (error) {
      //     return done(error);
      // }
      try {
        const user = await Business.findOne({ where: {login_id : id } });
  
        if (!user) {
          console.log("User not found!");
          return done(null, false); // 사용자를 찾지 못했을 때, false 반환 (세션 종료)
        }
  
        
        console.log("user : 13123123" + user.login_id)
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