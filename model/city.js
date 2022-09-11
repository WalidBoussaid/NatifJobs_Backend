//import connection with database
const connection = require("./connection");

//import methods to create model
const { Model, DataTypes } = require("sequelize");

class City extends Model {}

City.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        modelName: "city",
    }
);

module.exports = City;
