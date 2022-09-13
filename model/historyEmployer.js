//import connection with database
const connection = require("./connection");

//import methods to create model
const { Model, DataTypes } = require("sequelize");

class HistoryEmployer extends Model {}

HistoryEmployer.init(
    {
        like: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        dislike: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize: connection,
        modelName: "historyEmployer",
    }
);

module.exports = HistoryEmployer;
