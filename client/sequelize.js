const { Sequelize, Model, DataTypes } = require('sequelize')
const mysql = require('mysql')
const sqlConfig = require('./mySqlConfig')
//启动 sequelize 对象
const sequelize = new Sequelize(
  sqlConfig.database,
  sqlConfig.username,
  sqlConfig.password,
  {
    host: sqlConfig.host,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 30000,
    },
  }
)

//检测是否连接成功
sequelize.authenticate().then(
  () => {
    console.log('连接成功')
  },
  (err) => {
    console.log('连接失败', err)
  }
)

//定义数据库 表 模型
const userModal = sequelize.define(
  'menu',
  {
    userId: {
      type: Sequelize.BIGINT(11),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    token: Sequelize.TEXT(),
    password: Sequelize.INTEGER(11),
    imgUrl: Sequelize.TEXT('tiny'),
    menu: Sequelize.TEXT('tiny'),
    level: Sequelize.TEXT('tiny'),
  },
  {
    timestamps: false,
  }
)

// 初始化 是否可以创建
sequelize.sync().then(
  () => {
    console.log('init create ok')
    // 创建表
    const data = sequelize.model('menu')
    data.sync({ force: true, loging: true }).then((res) => {
      console.log(res)
    })
  },
  (error) => {
    console.log('create error' + error)
  }
)

module.exports = { sequelize, userModal }
