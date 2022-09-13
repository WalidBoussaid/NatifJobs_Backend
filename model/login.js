//import connection with database
const connection = require("./connection");

//import methods to create model
const { Model, DataTypes } = require("sequelize");

class Login extends Model {}

Login.init(
    {
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        modelName: "login",
    }
);

module.exports = Login;
