const { UserAuthorityRequest, UserInfo } = require("../models");  // 여기서 모델을 가져옵니다.


const userAuthority = async (userAuthorityData) => {
  console.log("database userAuthorityData")
  console.log(userAuthorityData)
  try {
    console.log("userAuthorityData")
    const userAuthorityRequest = await UserAuthorityRequest.create({
      business_registration_number: userAuthorityData.business_registration_number,
      platform_id: userAuthorityData.platform_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return userAuthorityRequest;
  } catch (error) {
    throw new Error(`Failed to create userAuthority: ${error.message}\nStack Trace: ${error.stack}`);

  }
};
const userGetAuthority = async (business_registration_number) => {
  console.log("database userAuthorityData")

  try {
    const userGetAuthority = await UserAuthorityRequest.findAll({
      where: { business_registration_number: business_registration_number },
      attributes: ['user_authority_request_id', 'business_registration_number', 'authority_is_available'], // UserAuthorityRequest에서 사업자번호만 선택
      include: [
        {
          model: UserInfo,
          required: true, // INNER JOIN을 수행
          attributes: ['user_name', 'user_phone'], // UserInfo에서 필요한 필드만 선택
        },
      ],
    });

    console.log("userGetAuthority");

    userGetAuthority.forEach(item => {
      const userInfo = item.dataValues.USER_INFO.dataValues; // USER_INFO 데이터 추출

      // 필요한 값만 추출하여 출력
      console.log("Name:", userInfo.user_name);
      console.log("Phone:", userInfo.user_phone);
      console.log("Business Registration Number:", item.dataValues.business_registration_number);
    });
    return userGetAuthority;
  } catch (error) {
    throw new Error('Failed to create UserInformation', error.message);
  }
};

const userGetAuthorityAvailable = async (user_id) => {
  console.log("database userAuthorityData")
  console.log(user_id)
  try {
    const userGetAuthority = await UserAuthorityRequest.findAll({
      where: { platform_id: user_id },
      attributes: ['business_registration_number', 'authority_is_available'], // UserAuthorityRequest에서 사업자번호만 선택
    });

    console.log("userGetAuthority");
    return userGetAuthority;
  } catch (error) {
    throw new Error('Failed to create UserInformation', error.message);
  }
};

const authorityAvailableTrue = async (id) => {
  console.log("database authorityAvailableTrue")
  console.log(id)

  try {
    const authorityAvailableTrueUpdate = await UserAuthorityRequest.update(
      { authority_is_available: true },
      {
         where: { user_authority_request_id: id }, 
      }
    );
  } catch (error) {
    console.error('Failed to fetch authority request error: ', error);
    res.status(500).json({ message: 'Failed to fetch authority request.' });
  }
}

module.exports = {
  userAuthority,
  userGetAuthority,
  userGetAuthorityAvailable,
  authorityAvailableTrue,
};