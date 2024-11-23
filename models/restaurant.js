module.exports = (sequelize,DataTypes)=>{
  const Restaurants = sequelize.define(
    'Restaurants',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      place: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      times: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      total_review: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      avg_rating: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(255),
      },
      image: {
        type: DataTypes.STRING(255),
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'Restaurants',
      timestamps: true,
      schema: 'public',
    }
  );
  return Restaurants
}
