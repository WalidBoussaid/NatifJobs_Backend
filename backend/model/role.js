//import connection with database
const connection = require('./connection');

//import methods to create model
const {Model,DataTypes} =require('sequelize');

class Role extends Model{}

Role.init({
    roleName : {
        type : DataTypes.STRING,
        allowNull : false
    }
},{
    sequelize : connection,
    modelName : "role",
}
)

module.exports = Role