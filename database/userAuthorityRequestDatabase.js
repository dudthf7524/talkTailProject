const { UserAuthorityRequest, UserInformation, sequelize } = require("../models");  // 여기서 모델을 가져옵니다.


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
    let sql ="";
    sql += "select user_authority_request_id, business_registration_number, authority_is_available ,user_name, user_phone  ";
    sql += "from user_authority_request uar ";
    sql += "join user_information ui ";
    sql += "on uar.platform_id = ui.platform_id ";
    sql += "where uar.business_registration_number = :business_registration_number ";

    const [results, metadata] = await sequelize.query(
      sql,

      {
        replacements: { business_registration_number: business_registration_number }, // 바인딩 파라미터
        type: sequelize.QueryTypes.SELECT, // 쿼리 유형
        logging: console.log, // 이 쿼리에 대한 SQL 로그만 출력
      }

    );
    console.log(metadata);
    console.log(results)
    return [results]

  } catch (error) {
    throw new Error(`Failed to userGetAuthority : ${error.message}`);
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

const authorityDefense = async (platform_id, business_registration_number) => {
  console.log("database authorityAvailableTrue")
  console.log(platform_id)
  console.log(business_registration_number)

  try {
    const authorityDefenseData = await UserAuthorityRequest.findOne(
      { authority_is_available: true },
      {
        where:
        {
          business_registration_number: business_registration_number,
          platform_id: platform_id

        },
      }
    );
    console.log("authorityDefenseData")
    console.log(authorityDefenseData)
    console.log("authorityDefenseData")


    return authorityDefenseData
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
  authorityDefense,
};