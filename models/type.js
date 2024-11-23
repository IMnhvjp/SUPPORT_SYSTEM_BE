module.exports = (sequelize,DataTypes)=>{
  const Types = sequelize.define(
    'Types',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
      tableName: 'Types',
      timestamps: true,
      schema: 'public',
    }
  );
  return Types;
}
