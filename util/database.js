const Sequelize = require('sequelize')

const sequelize = new Sequelize('sql-node','root','Nodecomplete',
{dialect:'mysql',
host:'localhost'}
)

module.exports = sequelize