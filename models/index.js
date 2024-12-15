const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,  // 'mysql', 'postgres', 'sqlite', 'mssql' 중 하나
});


// 모델 정의
db.User = require('./User')(sequelize, Sequelize);
db.UserInfo = require('./UserInfo')(sequelize, Sequelize);
db.Business = require('./Business')(sequelize, Sequelize);
db.UserAuthorityRequest = require('./UserAuthorityRequest')(sequelize, Sequelize);
db.BusinessDesinger = require('./BusinessDesinger')(sequelize, Sequelize);
db.BusinessInformation = require('./BusinessInformation')(sequelize, Sequelize);
db.Pet = require('./Pet')(sequelize, Sequelize);
// 관계 설정
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;