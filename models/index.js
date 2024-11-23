const config = require('../config/database')
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        port: config.port,
        dialect: config.dialect,
        logging: false,
    }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.sequelize.sync({ alter: false, force: false });


db.Food = require('./food')(sequelize, DataTypes);
db.Restaurants = require('./restaurant')(sequelize, DataTypes);
db.Types = require('./type')(sequelize, DataTypes);


db.Restaurants.hasMany(db.Food, { foreignKey: 'restaurant_id' });
db.Food.belongsTo(db.Restaurants, { foreignKey: 'restaurant_id' });

db.Types.hasMany(db.Food, { foreignKey: 'type_id' });
db.Food.belongsTo(db.Types, { foreignKey: 'type_id' });

module.exports = db;
