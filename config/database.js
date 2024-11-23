module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.USER_NAME,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DATABASE_NAME,
    dialect: 'postgres',
    port: 5432,
}