const UserAuthorityRequest = require('../models/UserAuthorityRequest');

const userAuthority = async (userAuthorityData) => {
    console.log("database desinger")
    console.log(userAuthorityData)
    
    
    // try {
    //     const userIformation = await UserAuthorityRequest.create({
    //       platform_id: userData.platform_id,
    //       user_name: userData.user_name,
    //       user_phone: userphone,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     });
    
    //     return userIformation;
    //   } catch (error) {
    //     throw new Error('Failed to create userInformation', error.message);
    //   }
};


module.exports = {
    userAuthority,
};