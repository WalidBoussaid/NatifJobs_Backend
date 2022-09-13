//import connection with database
const connection = require("./connection");

//import methods to create model
const { Model, DataTypes } = require("sequelize");

class HistoryCandidate extends Model {}

HistoryCandidate.init(
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
        modelName: "historyCandidate",
    }
);

module.exports = HistoryCandidate;
