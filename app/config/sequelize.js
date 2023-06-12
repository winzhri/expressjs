const {Sequelize} = require ('sequelize');

const sequelize = new Sequelize({
    databas: 'eduworks-cruds-v2',
    host: 'localhost',
    username: 'root',
    password: 'root',
    dialect: 'mysql'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log ('Connection has been established succesfully');
    }
    catch (error) {
        console.log ('Enable to connect to the database', error);
    }
})();

module.exports = sequelize;