const configuration = require("../configuration");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  configuration.DBNAME,
  configuration.DBUSER,
  configuration.DBPASS,
  {
    host: configuration.DBHOST,
    dialect: configuration.DIALECT,
  }
);


// RouteTable
const RouteTable = sequelize.define('RouteTable', {
  long_url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  short_url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
});


const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    RouteTable.sync({force: false});
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {initDatabase, sequelize, RouteTable}
