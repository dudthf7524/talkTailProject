const { DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const PetImage = sequelize.define('TB_PET_IMAGES', {
  endpoint: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pet_id: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = PetImage;