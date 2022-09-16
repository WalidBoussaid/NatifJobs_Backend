//import connection with database
const connection = require("./connection");

//import methods to create model
const { Model, DataTypes } = require("sequelize");

class Rdv extends Model {}

Rdv.init(
    {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        place: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        modelName: "rdv",
    }
);

module.exports = Rdv;
