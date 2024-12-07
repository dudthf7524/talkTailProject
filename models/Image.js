const { DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const Image = sequelize.define('TB_IMAGES', {
  
  endpoint: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image_type: {
    type: DataTypes.ENUM('main', 'sub', 'album', 'review', 'pricing'),
    allowNull: false
  },
  business_id: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Image;