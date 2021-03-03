'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('subscriptions', {
      id: {allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
      email: {type: Sequelize.STRING(150), allowNull: false, unique: true},
      birth: {allowNull: false, type: Sequelize.DATE},
      flag: {type: Sequelize.BOOLEAN, defaultValue: true},
      first_name: {type: Sequelize.STRING(200), allowNull: true},
      gender: {type: Sequelize.ENUM('male', 'female'), allowNull: true},
    });
  },
  down: (queryInterface) => queryInterface.dropTable('subscriptions')
};
