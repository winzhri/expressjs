const sequalize = require ('../config/sequelize');
const { Sequalize, DataTypes } = require ('sequelize');

const Product = sequalize.define ('Product', {
    users_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    image_url: {
        type: DataTypes.TEXT,
        allowNull: false
    }

});

module.exports = Product;