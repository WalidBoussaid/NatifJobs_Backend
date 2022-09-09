//import connection with database
const connection = require("./connection");

//import method to create model
const { Model, DataTypes } = require("sequelize");

//create a model
class Offer extends Model {}

Offer.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        modelName: "offer",
    }
);

module.exports = Offer;
