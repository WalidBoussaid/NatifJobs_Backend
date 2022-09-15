//import connection with database
const connection = require("./connection");

//import methods to create model
const { Model, DataTypes } = require("sequelize");

class Match extends Model {}

Match.init(
    {},
    {
        sequelize: connection,
        modelName: "match",
    }
);

module.exports = Match;
