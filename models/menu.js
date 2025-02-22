const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'schoolmanagement'
});

const Menu = sequelize.define(
  "Menu",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    parent_id: { type: DataTypes.INTEGER, allowNull: true },
    title: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM("group", "collapse", "item"), allowNull: false },
    url: { type: DataTypes.STRING, allowNull: true },
    icon: { type: DataTypes.STRING, allowNull: true },
    classes: { type: DataTypes.STRING, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    businessId: { type: DataTypes.INTEGER, allowNull: true },
    groupId: { type: DataTypes.INTEGER, allowNull: true },
    organizationId: { type: DataTypes.INTEGER, allowNull: true }
  },
  { 
    tableName: "menus",
    timestamps: false 
  }
);

module.exports = Menu;
