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


const Food = require('./food.js')(sequelize, DataTypes);
const Restaurants = require('./restaurant.js')(sequelize, DataTypes);
const Types = require('./type.js')(sequelize, DataTypes);


Restaurants.hasMany(Food, { foreignKey: 'restaurant_id' });
Food.belongsTo(Restaurants, { foreignKey: 'restaurant_id' , as: "restaurant"});

Types.hasMany(Food, { foreignKey: 'type_id' });
Food.belongsTo(Types, { foreignKey: 'type_id', as: "type" });

module.exports = db;
