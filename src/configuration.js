require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,

    DBNAME: process.env.DBNAME,
    DBPASS: process.env.DBPASS,
    DBUSER: process.env.DBUSER,
    DBHOST: process.env.DBHOST,
    DIALECT: process.env.DIALECT,
}