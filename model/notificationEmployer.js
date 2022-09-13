//import connection with database
const connection = require("./connection");

//import methods to create model
const { Model, DataTypes } = require("sequelize");

class NotifEmployer extends Model {}

NotifCandidate.init(
    {
        msg: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        visited: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        modelName: "notifEmployer",
    }
);

module.exports = NotifEmployer;
