//import connection with database
const connection = require("./connection");

//import methods to create model
const { Model, DataTypes } = require("sequelize");

class Rgpd extends Model {}

Rgpd.init(
    {
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        modelName: "rgpd",
    }
);

module.exports = Rgpd;
