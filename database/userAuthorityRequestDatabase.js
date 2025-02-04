const { UserAuthorityRequest, UserInformation, sequelize } = require("../models");  // 여기서 모델을 가져옵니다.


const userAuthority = async (userAuthorityData, platform_id) => {
  console.log("database userAuthorityData")
  console.log(userAuthorityData)
  try {
    console.log("userAuthorityData")
    const userAuthorityRequest = await UserAuthorityRequest.create({
      business_registration_number: userAuthorityData.business_registration_number,
      platform_id: platform_id,
      authority_state: '대기',
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
  console.log(business_registration_number)
  try {
    let sql ="";
    sql += "select user_authority_request_id, business_registration_number, authority_is_available, authority_state ,user_name, user_phone  ";
    sql += "from user_authority_request uar ";
    sql += "join user_information ui ";
    sql += "on uar.platform_id = ui.platform_id ";
    sql += "where uar.business_registration_number = :business_registration_number ";

    const [result, metadata] = await sequelize.query(
      sql,

      {
        replacements: { business_registration_number: business_registration_number }, // 바인딩 파라미터
        type: sequelize.QueryTypes.SELECTALL, // 쿼리 유형
        logging: console.log, // 이 쿼리에 대한 SQL 로그만 출력
      }

    );
    console.log(metadata);
    console.log('나오는 데이터')
    console.log(result)
    console.log('나오는 데이터')
   

    return result;

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
      attributes: ['business_registration_number', 'authority_state'], // UserAuthorityRequest에서 사업자번호만 선택
    });

    console.log("userGetAuthority");
    return userGetAuthority;
  } catch (error) {
    throw new Error('Failed to create UserInformation', error.message);
  }
};

const authorityAvailableTrue = async (id, authority_state) => {
  console.log("database authorityAvailableTrue")
  console.log(id)

  try {
    const authorityAvailableTrueUpdate = await UserAuthorityRequest.update(
      { authority_state: authority_state },
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

const userAuthorityList = async (platform_id) => {
  console.log("database authorityAvailableTrue")
  console.log(platform_id)

  try {
    let sql ="";
    sql += "select authority_state, business_name ";
    sql += "from user_authority_request uar ";
    sql += "join business_information bi ";
    sql += "on uar.business_registration_number = bi.business_registration_number ";
    sql += "where uar.platform_id = :platform_id ";

    const [result, metadata] = await sequelize.query(
      sql,

      {
        replacements: { platform_id: platform_id }, // 바인딩 파라미터
        type: sequelize.QueryTypes.SELECTALL, // 쿼리 유형
        logging: console.log, // 이 쿼리에 대한 SQL 로그만 출력
      }

    );
    console.log(result)

    return result;

  } catch (error) {
    throw new Error(`Failed to userGetAuthority : ${error.message}`);
  }
}

module.exports = {
  userAuthority,
  userGetAuthority,
  userGetAuthorityAvailable,
  authorityAvailableTrue,
  authorityDefense,
  userAuthorityList
};