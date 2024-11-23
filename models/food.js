module.exports = (sequelize,DataTypes)=>{
    const Food = sequelize.define(
    'Food',
    {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        },
        description: {
        type: DataTypes.TEXT,
        },
        price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        },
        image: {
        type: DataTypes.STRING(255),
        },
        calo: {
        type: DataTypes.DOUBLE,
        },
        total_like: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        },
        restaurant_id: {
        type: DataTypes.INTEGER,
        },
        type_id: {
        type: DataTypes.INTEGER,
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
        tableName: 'Food',
        timestamps: true,
        schema: 'public',
    }
    );
    return Food;
}
